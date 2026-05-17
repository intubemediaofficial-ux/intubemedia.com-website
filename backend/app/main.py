from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json

from app.database import get_db, init_db
from app.auth import verify_password, hash_password, create_access_token, get_current_admin

app = FastAPI(title="Intube Media Admin API")

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.on_event("startup")
async def startup():
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

@app.post("/api/auth/login")
async def login(req: LoginRequest, db=Depends(get_db)):
    cursor = await db.execute("SELECT * FROM admin_users WHERE username = ?", (req.username,))
    user = await cursor.fetchone()
    if not user or not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token({"sub": user["username"], "id": user["id"]})
    return {"token": token, "username": user["username"]}

@app.post("/api/auth/change-password")
async def change_password(req: ChangePasswordRequest, admin=Depends(get_current_admin), db=Depends(get_db)):
    cursor = await db.execute("SELECT * FROM admin_users WHERE id = ?", (admin["id"],))
    user = await cursor.fetchone()
    if not verify_password(req.old_password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    new_hash = hash_password(req.new_password)
    await db.execute("UPDATE admin_users SET password_hash = ? WHERE id = ?", (new_hash, admin["id"]))
    await db.commit()
    return {"message": "Password updated"}

@app.get("/api/auth/me")
async def get_me(admin=Depends(get_current_admin)):
    return {"username": admin["sub"], "id": admin["id"]}

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
    return {
        "services": services_count,
        "service_items": items_count,
        "packages": packages_count,
        "contact_submissions": submissions_count,
        "unread_submissions": unread_count,
    }
