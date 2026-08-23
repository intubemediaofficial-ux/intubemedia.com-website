from datetime import datetime, timedelta, timezone
import hashlib
import json
import logging
import os
import secrets

from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from app.database import get_db, init_db
from app.auth import (
    create_access_token,
    get_current_admin,
    hash_password,
    password_needs_rehash,
    validate_password,
    verify_password,
)
from app.mailer import send_password_reset_email

app = FastAPI(title="Intube Media Admin API")
logger = logging.getLogger(__name__)

allowed_origins = [
    origin.strip()
    for origin in os.environ.get(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://localhost:4173,https://intubemedia.com,https://www.intubemedia.com",
    ).split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

@app.middleware("http")
async def disable_api_caching(request: Request, call_next):
    response = await call_next(request)
    if request.url.path.startswith("/api/"):
        response.headers["Cache-Control"] = "no-store"
    return response

@app.on_event("startup")
async def startup():
    if os.environ.get("ENVIRONMENT") == "production":
        required_settings = [
            "JWT_SECRET",
            "ADMIN_EMAIL",
            "ADMIN_INITIAL_PASSWORD",
            "BREVO_API_KEY",
            "PUBLIC_SITE_URL",
        ]
        missing_settings = [name for name in required_settings if not os.environ.get(name)]
        if missing_settings:
            raise RuntimeError(f"Missing production settings: {', '.join(missing_settings)}")
    await init_db()

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

# ─── Auth ───────────────────────────────────────────────

class LoginRequest(BaseModel):
    username: str
    password: str

class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str

class ForgotPasswordRequest(BaseModel):
    identifier: str

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

@app.post("/api/auth/login")
async def login(req: LoginRequest, db=Depends(get_db)):
    cursor = await db.execute("SELECT * FROM admin_users WHERE username = ?", (req.username,))
    user = await cursor.fetchone()
    if not user or not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if password_needs_rehash(user["password_hash"]):
        await db.execute(
            "UPDATE admin_users SET password_hash = ? WHERE id = ?",
            (hash_password(req.password), user["id"]),
        )
        await db.commit()
    token = create_access_token({"sub": user["username"], "id": user["id"]})
    return {"token": token, "username": user["username"]}

@app.post("/api/auth/change-password")
async def change_password(req: ChangePasswordRequest, admin=Depends(get_current_admin), db=Depends(get_db)):
    cursor = await db.execute("SELECT * FROM admin_users WHERE id = ?", (admin["id"],))
    user = await cursor.fetchone()
    if not user:
        raise HTTPException(status_code=401, detail="Admin account not found")
    if not verify_password(req.old_password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    validate_password(req.new_password)
    new_hash = hash_password(req.new_password)
    await db.execute("UPDATE admin_users SET password_hash = ? WHERE id = ?", (new_hash, admin["id"]))
    await db.execute(
        "UPDATE password_reset_tokens SET used_at = CURRENT_TIMESTAMP WHERE admin_user_id = ? AND used_at IS NULL",
        (admin["id"],),
    )
    await db.commit()
    return {"message": "Password updated"}

@app.post("/api/auth/forgot-password", status_code=status.HTTP_202_ACCEPTED)
async def forgot_password(req: ForgotPasswordRequest, db=Depends(get_db)):
    generic_response = {
        "message": "If the account exists, a password reset link has been sent."
    }
    identifier = req.identifier.strip()
    if not identifier:
        return generic_response

    cursor = await db.execute(
        "SELECT * FROM admin_users WHERE username = ? OR lower(email) = lower(?)",
        (identifier, identifier),
    )
    user = await cursor.fetchone()
    if not user or not user["email"]:
        return generic_response

    recent_cursor = await db.execute(
        """
        SELECT id FROM password_reset_tokens
        WHERE admin_user_id = ? AND created_at > datetime('now', '-60 seconds')
        LIMIT 1
        """,
        (user["id"],),
    )
    if await recent_cursor.fetchone():
        return generic_response

    raw_token = secrets.token_urlsafe(32)
    token_hash = hashlib.sha256(raw_token.encode()).hexdigest()
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=30)
    await db.execute(
        "UPDATE password_reset_tokens SET used_at = CURRENT_TIMESTAMP WHERE admin_user_id = ? AND used_at IS NULL",
        (user["id"],),
    )
    await db.execute(
        "INSERT INTO password_reset_tokens (admin_user_id, token_hash, expires_at) VALUES (?, ?, ?)",
        (user["id"], token_hash, expires_at.isoformat()),
    )
    await db.commit()

    public_site_url = os.environ.get("PUBLIC_SITE_URL", "http://localhost:5173").rstrip("/")
    reset_url = f"{public_site_url}/admin/reset-password?token={raw_token}"
    try:
        await send_password_reset_email(user["email"], reset_url)
    except RuntimeError:
        logger.exception("Unable to send admin password reset email")
    return generic_response

@app.post("/api/auth/reset-password")
async def reset_password(req: ResetPasswordRequest, db=Depends(get_db)):
    validate_password(req.new_password)
    token_hash = hashlib.sha256(req.token.encode()).hexdigest()
    now = datetime.now(timezone.utc).isoformat()
    cursor = await db.execute(
        """
        SELECT id, admin_user_id
        FROM password_reset_tokens
        WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?
        """,
        (token_hash, now),
    )
    token = await cursor.fetchone()
    if not token:
        raise HTTPException(status_code=400, detail="Reset link is invalid or expired")

    await db.execute(
        "UPDATE admin_users SET password_hash = ? WHERE id = ?",
        (hash_password(req.new_password), token["admin_user_id"]),
    )
    await db.execute(
        "UPDATE password_reset_tokens SET used_at = CURRENT_TIMESTAMP WHERE id = ?",
        (token["id"],),
    )
    await db.commit()
    return {"message": "Password reset successfully"}

@app.get("/api/auth/me")
async def get_me(admin=Depends(get_current_admin), db=Depends(get_db)):
    cursor = await db.execute(
        "SELECT id, username, email FROM admin_users WHERE id = ?",
        (admin["id"],),
    )
    user = await cursor.fetchone()
    if not user:
        raise HTTPException(status_code=401, detail="Admin account not found")
    return dict(user)

# ─── Services CRUD ──────────────────────────────────────

class ServiceCreate(BaseModel):
    slug: str
    title: str
    icon: str = "Globe"
    color: str = "from-blue-500 to-cyan-400"
    section: str = "business"
    tagline: str = ""
    description: str = ""
    meta_title: str = ""
    meta_description: str = ""
    sort_order: int = 0
    is_active: bool = True

class ServiceUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    section: Optional[str] = None
    tagline: Optional[str] = None
    description: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    sort_order: Optional[int] = None
    is_active: Optional[bool] = None

@app.get("/api/services")
async def list_services(db=Depends(get_db)):
    cursor = await db.execute("SELECT * FROM services ORDER BY sort_order, id")
    rows = await cursor.fetchall()
    services = []
    for row in rows:
        s = dict(row)
        items_cursor = await db.execute(
            "SELECT * FROM service_items WHERE service_id = ? ORDER BY sort_order, id",
            (s["id"],)
        )
        s["items"] = [dict(item) for item in await items_cursor.fetchall()]
        services.append(s)
    return services

@app.get("/api/public/services")
async def list_public_services(db=Depends(get_db)):
    cursor = await db.execute(
        "SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order, id"
    )
    rows = await cursor.fetchall()
    services = []
    for row in rows:
        service = dict(row)
        items_cursor = await db.execute(
            """
            SELECT * FROM service_items
            WHERE service_id = ? AND is_active = 1
            ORDER BY sort_order, id
            """,
            (service["id"],),
        )
        service["items"] = [dict(item) for item in await items_cursor.fetchall()]
        services.append(service)
    return services

@app.get("/api/services/{service_id}")
async def get_service(service_id: int, db=Depends(get_db)):
    cursor = await db.execute("SELECT * FROM services WHERE id = ?", (service_id,))
    row = await cursor.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Service not found")
    s = dict(row)
    items_cursor = await db.execute(
        "SELECT * FROM service_items WHERE service_id = ? ORDER BY sort_order, id",
        (s["id"],)
    )
    s["items"] = [dict(item) for item in await items_cursor.fetchall()]
    return s

@app.post("/api/services")
async def create_service(req: ServiceCreate, admin=Depends(get_current_admin), db=Depends(get_db)):
    await db.execute(
        """INSERT INTO services (slug, title, icon, color, section, tagline, description, meta_title, meta_description, sort_order, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (req.slug, req.title, req.icon, req.color, req.section, req.tagline, req.description, req.meta_title, req.meta_description, req.sort_order, int(req.is_active))
    )
    await db.commit()
    cursor = await db.execute("SELECT last_insert_rowid()")
    row = await cursor.fetchone()
    return {"id": row[0], "message": "Service created"}

@app.put("/api/services/{service_id}")
async def update_service(service_id: int, req: ServiceUpdate, admin=Depends(get_current_admin), db=Depends(get_db)):
    updates = {k: v for k, v in req.model_dump().items() if v is not None}
    if "is_active" in updates:
        updates["is_active"] = int(updates["is_active"])
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    set_clause = ", ".join(f"{k} = ?" for k in updates)
    values = list(updates.values()) + [service_id]
    await db.execute(f"UPDATE services SET {set_clause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?", values)
    await db.commit()
    return {"message": "Service updated"}

@app.delete("/api/services/{service_id}")
async def delete_service(service_id: int, admin=Depends(get_current_admin), db=Depends(get_db)):
    await db.execute("DELETE FROM service_items WHERE service_id = ?", (service_id,))
    await db.execute("DELETE FROM services WHERE id = ?", (service_id,))
    await db.commit()
    return {"message": "Service deleted"}

# ─── Service Items CRUD ─────────────────────────────────

class ServiceItemCreate(BaseModel):
    service_id: int
    icon: str = "Globe"
    name: str
    description: str = ""
    sort_order: int = 0
    is_active: bool = True

class ServiceItemUpdate(BaseModel):
    icon: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    sort_order: Optional[int] = None
    is_active: Optional[bool] = None

@app.post("/api/service-items")
async def create_service_item(req: ServiceItemCreate, admin=Depends(get_current_admin), db=Depends(get_db)):
    await db.execute(
        "INSERT INTO service_items (service_id, icon, name, description, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?)",
        (req.service_id, req.icon, req.name, req.description, req.sort_order, int(req.is_active))
    )
    await db.commit()
    cursor = await db.execute("SELECT last_insert_rowid()")
    row = await cursor.fetchone()
    return {"id": row[0], "message": "Service item created"}

@app.put("/api/service-items/{item_id}")
async def update_service_item(item_id: int, req: ServiceItemUpdate, admin=Depends(get_current_admin), db=Depends(get_db)):
    updates = {k: v for k, v in req.model_dump().items() if v is not None}
    if "is_active" in updates:
        updates["is_active"] = int(updates["is_active"])
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    set_clause = ", ".join(f"{k} = ?" for k in updates)
    values = list(updates.values()) + [item_id]
    await db.execute(f"UPDATE service_items SET {set_clause} WHERE id = ?", values)
    await db.commit()
    return {"message": "Service item updated"}

@app.delete("/api/service-items/{item_id}")
async def delete_service_item(item_id: int, admin=Depends(get_current_admin), db=Depends(get_db)):
    await db.execute("DELETE FROM service_items WHERE id = ?", (item_id,))
    await db.commit()
    return {"message": "Service item deleted"}

# ─── Packages CRUD ──────────────────────────────────────

class PackageCreate(BaseModel):
    name: str
    tagline: str = ""
    color: str = "from-blue-500 to-cyan-400"
    is_popular: bool = False
    features: list[str] = []
    sort_order: int = 0
    is_active: bool = True

class PackageUpdate(BaseModel):
    name: Optional[str] = None
    tagline: Optional[str] = None
    color: Optional[str] = None
    is_popular: Optional[bool] = None
    features: Optional[list[str]] = None
    sort_order: Optional[int] = None
    is_active: Optional[bool] = None

@app.get("/api/packages")
async def list_packages(db=Depends(get_db)):
    cursor = await db.execute("SELECT * FROM packages ORDER BY sort_order, id")
    rows = await cursor.fetchall()
    result = []
    for row in rows:
        p = dict(row)
        p["features"] = json.loads(p["features"])
        p["is_popular"] = bool(p["is_popular"])
        p["is_active"] = bool(p["is_active"])
        result.append(p)
    return result

@app.get("/api/public/packages")
async def list_public_packages(db=Depends(get_db)):
    cursor = await db.execute(
        "SELECT * FROM packages WHERE is_active = 1 ORDER BY sort_order, id"
    )
    rows = await cursor.fetchall()
    result = []
    for row in rows:
        package = dict(row)
        package["features"] = json.loads(package["features"])
        package["is_popular"] = bool(package["is_popular"])
        package["is_active"] = bool(package["is_active"])
        result.append(package)
    return result

@app.post("/api/packages")
async def create_package(req: PackageCreate, admin=Depends(get_current_admin), db=Depends(get_db)):
    await db.execute(
        "INSERT INTO packages (name, tagline, color, is_popular, features, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (req.name, req.tagline, req.color, int(req.is_popular), json.dumps(req.features), req.sort_order, int(req.is_active))
    )
    await db.commit()
    cursor = await db.execute("SELECT last_insert_rowid()")
    row = await cursor.fetchone()
    return {"id": row[0], "message": "Package created"}

@app.put("/api/packages/{package_id}")
async def update_package(package_id: int, req: PackageUpdate, admin=Depends(get_current_admin), db=Depends(get_db)):
    updates = {k: v for k, v in req.model_dump().items() if v is not None}
    if "is_popular" in updates:
        updates["is_popular"] = int(updates["is_popular"])
    if "is_active" in updates:
        updates["is_active"] = int(updates["is_active"])
    if "features" in updates:
        updates["features"] = json.dumps(updates["features"])
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    set_clause = ", ".join(f"{k} = ?" for k in updates)
    values = list(updates.values()) + [package_id]
    await db.execute(f"UPDATE packages SET {set_clause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?", values)
    await db.commit()
    return {"message": "Package updated"}

@app.delete("/api/packages/{package_id}")
async def delete_package(package_id: int, admin=Depends(get_current_admin), db=Depends(get_db)):
    await db.execute("DELETE FROM packages WHERE id = ?", (package_id,))
    await db.commit()
    return {"message": "Package deleted"}

# ─── Contact Submissions ────────────────────────────────

class ContactSubmission(BaseModel):
    name: str
    phone: str = ""
    email: str = ""
    service: str = ""
    message: str = ""

@app.post("/api/contact")
async def submit_contact(req: ContactSubmission, db=Depends(get_db)):
    await db.execute(
        "INSERT INTO contact_submissions (name, phone, email, service, message) VALUES (?, ?, ?, ?, ?)",
        (req.name, req.phone, req.email, req.service, req.message)
    )
    await db.commit()
    return {"message": "Thank you! We will contact you soon."}

@app.get("/api/contact-submissions")
async def list_submissions(admin=Depends(get_current_admin), db=Depends(get_db)):
    cursor = await db.execute("SELECT * FROM contact_submissions ORDER BY created_at DESC")
    rows = await cursor.fetchall()
    return [dict(r) for r in rows]

@app.put("/api/contact-submissions/{sub_id}/read")
async def mark_read(sub_id: int, admin=Depends(get_current_admin), db=Depends(get_db)):
    await db.execute("UPDATE contact_submissions SET is_read = 1 WHERE id = ?", (sub_id,))
    await db.commit()
    return {"message": "Marked as read"}

@app.delete("/api/contact-submissions/{sub_id}")
async def delete_submission(sub_id: int, admin=Depends(get_current_admin), db=Depends(get_db)):
    await db.execute("DELETE FROM contact_submissions WHERE id = ?", (sub_id,))
    await db.commit()
    return {"message": "Submission deleted"}

# ─── Theme Settings ─────────────────────────────────────

class ThemeUpdate(BaseModel):
    settings: dict[str, str]

@app.get("/api/theme")
async def get_theme(db=Depends(get_db)):
    cursor = await db.execute("SELECT key, value FROM theme_settings")
    rows = await cursor.fetchall()
    return {row["key"]: row["value"] for row in rows}

@app.get("/api/public/theme")
async def get_public_theme(db=Depends(get_db)):
    return await get_theme(db)

@app.put("/api/theme")
async def update_theme(req: ThemeUpdate, admin=Depends(get_current_admin), db=Depends(get_db)):
    for key, value in req.settings.items():
        await db.execute(
            "INSERT INTO theme_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = CURRENT_TIMESTAMP",
            (key, value, value)
        )
    await db.commit()
    return {"message": "Theme updated"}

# ─── Pages CRUD ─────────────────────────────────────────

class PageCreate(BaseModel):
    slug: str
    title: str
    content: str = ""
    meta_title: str = ""
    meta_description: str = ""
    is_active: bool = True

class PageUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    content: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    is_active: Optional[bool] = None

@app.get("/api/pages")
async def list_pages(db=Depends(get_db)):
    cursor = await db.execute("SELECT * FROM pages ORDER BY id")
    return [dict(r) for r in await cursor.fetchall()]

@app.get("/api/pages/{slug}")
async def get_page(slug: str, db=Depends(get_db)):
    cursor = await db.execute("SELECT * FROM pages WHERE slug = ?", (slug,))
    row = await cursor.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Page not found")
    return dict(row)

@app.get("/api/public/pages/{slug}")
async def get_public_page(slug: str, db=Depends(get_db)):
    cursor = await db.execute(
        "SELECT * FROM pages WHERE slug = ? AND is_active = 1",
        (slug,),
    )
    row = await cursor.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Page not found")
    return dict(row)

@app.post("/api/pages")
async def create_page(req: PageCreate, admin=Depends(get_current_admin), db=Depends(get_db)):
    await db.execute(
        "INSERT INTO pages (slug, title, content, meta_title, meta_description, is_active) VALUES (?, ?, ?, ?, ?, ?)",
        (req.slug, req.title, req.content, req.meta_title, req.meta_description, int(req.is_active))
    )
    await db.commit()
    cursor = await db.execute("SELECT last_insert_rowid()")
    row = await cursor.fetchone()
    return {"id": row[0], "message": "Page created"}

@app.put("/api/pages/{page_id}")
async def update_page(page_id: int, req: PageUpdate, admin=Depends(get_current_admin), db=Depends(get_db)):
    updates = {k: v for k, v in req.model_dump().items() if v is not None}
    if "is_active" in updates:
        updates["is_active"] = int(updates["is_active"])
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    set_clause = ", ".join(f"{k} = ?" for k in updates)
    values = list(updates.values()) + [page_id]
    await db.execute(f"UPDATE pages SET {set_clause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?", values)
    await db.commit()
    return {"message": "Page updated"}

@app.delete("/api/pages/{page_id}")
async def delete_page(page_id: int, admin=Depends(get_current_admin), db=Depends(get_db)):
    await db.execute("DELETE FROM pages WHERE id = ?", (page_id,))
    await db.commit()
    return {"message": "Page deleted"}

# ─── Dashboard Stats ────────────────────────────────────

@app.get("/api/dashboard")
async def dashboard_stats(admin=Depends(get_current_admin), db=Depends(get_db)):
    services_count = (await (await db.execute("SELECT COUNT(*) FROM services")).fetchone())[0]
    items_count = (await (await db.execute("SELECT COUNT(*) FROM service_items")).fetchone())[0]
    packages_count = (await (await db.execute("SELECT COUNT(*) FROM packages")).fetchone())[0]
    submissions_count = (await (await db.execute("SELECT COUNT(*) FROM contact_submissions")).fetchone())[0]
    unread_count = (await (await db.execute("SELECT COUNT(*) FROM contact_submissions WHERE is_read = 0")).fetchone())[0]
    pages_count = (await (await db.execute("SELECT COUNT(*) FROM pages")).fetchone())[0]
    return {
        "services": services_count,
        "service_items": items_count,
        "packages": packages_count,
        "submissions": submissions_count,
        "unread_submissions": unread_count,
        "pages": pages_count,
    }
