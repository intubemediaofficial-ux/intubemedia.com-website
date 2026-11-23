from datetime import datetime, timedelta, timezone
from html import escape
import hashlib
import json
import logging
import os
import re
import secrets
import urllib.parse
import urllib.request
import asyncio

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, Field

from app.auth import (
    create_access_token,
    get_current_admin,
    get_current_partner,
    hash_password,
    verify_password,
)
from app.database import get_db
from app.mailer import send_email
from app.otp import OTP_MAX_ATTEMPTS, OTP_MINUTES, generate_otp, hash_otp, otp_expiry, otp_matches

router = APIRouter()
logger = logging.getLogger(__name__)

EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
DEFAULT_NOTIFY_EMAILS = "intubemediaofficial@gmail.com,business@intubemedia.com"
SETUP_TOKEN_HOURS = 72


def _notify_recipients() -> list[str]:
    raw = os.environ.get("PARTNER_NOTIFY_EMAILS", DEFAULT_NOTIFY_EMAILS)
    return [email.strip() for email in raw.split(",") if email.strip()]


def _site_url() -> str:
    return os.environ.get("PUBLIC_SITE_URL", "http://localhost:5173").rstrip("/")


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else ""


def _verify_turnstile_sync(token: str, ip: str) -> bool:
    secret = os.environ.get("TURNSTILE_SECRET_KEY", "")
    if not secret:
        return True
    if not token:
        return False
    data = urllib.parse.urlencode({"secret": secret, "response": token, "remoteip": ip}).encode()
    try:
        with urllib.request.urlopen(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify", data=data, timeout=10
        ) as response:
            return bool(json.loads(response.read()).get("success"))
    except Exception:
        logger.exception("Turnstile verification failed")
        return False


async def verify_turnstile(token: str, ip: str) -> None:
    if not await asyncio.to_thread(_verify_turnstile_sync, token, ip):
        raise HTTPException(status_code=400, detail="Security check failed. Please try again.")


async def _safe_send(recipients: list[str], subject: str, html: str, reply_to: str | None = None) -> bool:
    try:
        await send_email(recipients, subject, html, reply_to)
        return True
    except Exception:
        logger.exception("Unable to send email: %s", subject)
        return False


def _validate_partner_password(password: str) -> None:
    if len(password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")
    if not any(c.isalpha() for c in password) or not any(c.isdigit() for c in password):
        raise HTTPException(status_code=400, detail="Password must include a letter and a number")


def _email_shell(title: str, body: str) -> str:
    return (
        '<div style="font-family:Arial,sans-serif;background:#05060d;padding:32px">'
        '<div style="max-width:560px;margin:auto;background:#0d1020;border-radius:16px;padding:32px;color:#e8ecff">'
        '<div style="font-size:20px;font-weight:700;color:#fff;margin-bottom:4px">Intube Media</div>'
        '<div style="font-size:12px;letter-spacing:2px;color:#7c8cff;margin-bottom:24px">PARTNER NETWORK</div>'
        f'<h2 style="color:#fff;margin:0 0 16px">{title}</h2>{body}'
        '<p style="color:#8a93b8;font-size:12px;margin-top:28px">Intube Media • business@intubemedia.com</p>'
        "</div></div>"
    )


async def _issue_token(db, partner_user_id: int, purpose: str, lifetime: timedelta) -> str:
    raw_token = secrets.token_urlsafe(32)
    await db.execute(
        "UPDATE partner_password_tokens SET used_at = CURRENT_TIMESTAMP WHERE partner_user_id = ? AND used_at IS NULL",
        (partner_user_id,),
    )
    await db.execute(
        "INSERT INTO partner_password_tokens (partner_user_id, token_hash, purpose, expires_at) VALUES (?, ?, ?, ?)",
        (
            partner_user_id,
            hashlib.sha256(raw_token.encode()).hexdigest(),
            purpose,
            (datetime.now(timezone.utc) + lifetime).isoformat(),
        ),
    )
    return raw_token


# ─── Public: application ───────────────────────────────

class PartnerApplication(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    business_name: str = Field(default="", max_length=160)
    email: str = Field(max_length=200)
    phone: str = Field(min_length=6, max_length=40)
    whatsapp: str = Field(default="", max_length=40)
    country: str = Field(default="", max_length=80)
    category: str = Field(default="", max_length=80)
    catalog_size: str = Field(default="", max_length=80)
    music_links: str = Field(default="", max_length=2000)
    about: str = Field(default="", max_length=4000)
    distribution_needs: str = Field(default="", max_length=4000)
    consent: bool = False
    website: str = ""
    turnstile_token: str = ""


@router.post("/api/partner/apply", status_code=status.HTTP_201_CREATED)
async def apply_for_partnership(req: PartnerApplication, request: Request, db=Depends(get_db)):
    ok = {"message": "Application received. Our team will review it and reply by email."}
    if req.website:
        return ok
    email = req.email.strip().lower()
    if not EMAIL_PATTERN.match(email):
        raise HTTPException(status_code=400, detail="Please enter a valid email address")
    if not req.consent:
        raise HTTPException(status_code=400, detail="Please agree to be contacted about this application")
    ip = _client_ip(request)
    await verify_turnstile(req.turnstile_token, ip)

    recent = await (await db.execute(
        "SELECT id FROM partner_applications WHERE lower(email) = ? AND created_at > datetime('now', '-10 minutes')",
        (email,),
    )).fetchone()
    if recent:
        return ok

    fields = {
        "full_name": req.full_name.strip(),
        "business_name": req.business_name.strip(),
        "email": email,
        "phone": req.phone.strip(),
        "whatsapp": req.whatsapp.strip(),
        "country": req.country.strip(),
        "category": req.category.strip(),
        "catalog_size": req.catalog_size.strip(),
        "music_links": req.music_links.strip(),
        "about": req.about.strip(),
        "distribution_needs": req.distribution_needs.strip(),
    }
    await db.execute(
        f"INSERT INTO partner_applications ({', '.join(fields)}, ip_address) VALUES ({', '.join('?' * len(fields))}, ?)",
        (*fields.values(), ip),
    )
    await db.commit()

    labels = {
        "full_name": "Name", "business_name": "Artist / Label / Business", "email": "Email",
        "phone": "Phone", "whatsapp": "WhatsApp", "country": "Country", "category": "Category",
        "catalog_size": "Catalog size", "music_links": "Music links", "about": "About",
        "distribution_needs": "Distribution needs",
    }
    rows = "".join(
        f'<tr><td style="padding:6px 12px 6px 0;color:#8a93b8;vertical-align:top">{labels[k]}</td>'
        f'<td style="padding:6px 0;color:#fff;white-space:pre-wrap">{escape(v) or "—"}</td></tr>'
        for k, v in fields.items()
    )
    await _safe_send(
        _notify_recipients(),
        f"New partner application: {fields['full_name']}",
        _email_shell(
            "New partner application",
            f'<table style="font-size:14px;border-collapse:collapse">{rows}</table>'
            f'<p><a style="color:#7c8cff" href="{_site_url()}/admin/partners">Review in admin panel</a></p>',
        ),
        reply_to=email,
    )
    await _safe_send(
        [email],
        "We received your Intube Media partner application",
        _email_shell(
            f"Thanks, {escape(fields['full_name'])}.",
            "<p>Your partner application is with our team. We review every application personally "
            "and will reply to this email address once it has been reviewed.</p>",
        ),
    )
    return ok


# ─── Public: partner auth ──────────────────────────────

class PartnerLogin(BaseModel):
    email: str
    password: str
    turnstile_token: str = ""


class PartnerForgot(BaseModel):
    email: str
    turnstile_token: str = ""


class PartnerReset(BaseModel):
    new_password: str
    token: str = ""
    email: str = ""
    otp: str = ""


@router.post("/api/partner/login")
async def partner_login(req: PartnerLogin, request: Request, db=Depends(get_db)):
    await verify_turnstile(req.turnstile_token, _client_ip(request))
    user = await (await db.execute(
        "SELECT * FROM partner_users WHERE lower(email) = lower(?)", (req.email.strip(),)
    )).fetchone()
    if not user or not user["password_hash"] or not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    if not user["is_active"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Your partner access is not active")
    await db.execute("UPDATE partner_users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?", (user["id"],))
    await db.commit()
    token = create_access_token({"sub": user["email"], "pid": user["id"], "role": "partner"})
    return {"token": token, "name": user["name"], "email": user["email"]}


@router.post("/api/partner/forgot-password", status_code=status.HTTP_202_ACCEPTED)
async def partner_forgot_password(req: PartnerForgot, request: Request, db=Depends(get_db)):
    generic = {"message": "If this email belongs to an approved partner, a 6-digit code has been sent to it."}
    await verify_turnstile(req.turnstile_token, _client_ip(request))
    user = await (await db.execute(
        "SELECT * FROM partner_users WHERE lower(email) = lower(?) AND is_active = 1", (req.email.strip(),)
    )).fetchone()
    if not user:
        return generic
    recent = await (await db.execute(
        "SELECT id FROM partner_password_tokens WHERE partner_user_id = ? AND created_at > datetime('now', '-60 seconds')",
        (user["id"],),
    )).fetchone()
    if recent:
        return generic
    code = generate_otp()
    await db.execute(
        "UPDATE partner_password_tokens SET used_at = CURRENT_TIMESTAMP WHERE partner_user_id = ? AND used_at IS NULL",
        (user["id"],),
    )
    await db.execute(
        "INSERT INTO partner_password_tokens (partner_user_id, token_hash, purpose, expires_at) VALUES (?, ?, 'reset_otp', ?)",
        (user["id"], hash_otp(code), otp_expiry()),
    )
    await db.commit()
    await _safe_send(
        [user["email"]],
        "Your Intube Media partner password reset code",
        _email_shell(
            "Your password reset code",
            '<p>Enter this code on the reset page to choose a new password.</p>'
            f'<p style="font-size:34px;font-weight:700;letter-spacing:10px;color:#fff;margin:24px 0">{code}</p>'
            f'<p>The code expires in {OTP_MINUTES} minutes and can be used once.</p>',
        ),
    )
    return generic


@router.post("/api/partner/reset-password")
async def partner_reset_password(req: PartnerReset, db=Depends(get_db)):
    _validate_partner_password(req.new_password)
    now = datetime.now(timezone.utc).isoformat()
    if req.otp:
        invalid = HTTPException(status_code=400, detail="The code is invalid or has expired")
        token = await (await db.execute(
            """
            SELECT t.id, t.partner_user_id, t.token_hash, t.attempts FROM partner_password_tokens t
            JOIN partner_users u ON u.id = t.partner_user_id
            WHERE lower(u.email) = lower(?) AND u.is_active = 1 AND t.purpose = 'reset_otp'
              AND t.used_at IS NULL AND t.expires_at > ?
            ORDER BY t.id DESC LIMIT 1
            """,
            (req.email.strip(), now),
        )).fetchone()
        if not token:
            raise invalid
        if not otp_matches(token["token_hash"], req.otp):
            await db.execute(
                """
                UPDATE partner_password_tokens
                SET attempts = attempts + 1,
                    used_at = CASE WHEN attempts + 1 >= ? THEN CURRENT_TIMESTAMP ELSE used_at END
                WHERE id = ?
                """,
                (OTP_MAX_ATTEMPTS, token["id"]),
            )
            await db.commit()
            raise invalid
    else:
        token = await (await db.execute(
            """
            SELECT t.id, t.partner_user_id FROM partner_password_tokens t
            JOIN partner_users u ON u.id = t.partner_user_id
            WHERE t.token_hash = ? AND t.used_at IS NULL AND t.expires_at > ? AND u.is_active = 1
            """,
            (hashlib.sha256(req.token.encode()).hexdigest(), now),
        )).fetchone()
        if not token:
            raise HTTPException(status_code=400, detail="This link is invalid or has expired")
    claimed = await db.execute(
        "UPDATE partner_password_tokens SET used_at = CURRENT_TIMESTAMP WHERE id = ? AND used_at IS NULL",
        (token["id"],),
    )
    if claimed.rowcount != 1:
        await db.commit()
        raise HTTPException(status_code=400, detail="This code or link has already been used")
    await db.execute(
        "UPDATE partner_users SET password_hash = ? WHERE id = ?",
        (hash_password(req.new_password), token["partner_user_id"]),
    )
    await db.execute(
        "UPDATE partner_password_tokens SET used_at = CURRENT_TIMESTAMP WHERE partner_user_id = ? AND used_at IS NULL",
        (token["partner_user_id"],),
    )
    await db.commit()
    return {"message": "Password saved. You can now sign in."}


@router.get("/api/partner/me")
async def partner_me(partner=Depends(get_current_partner), db=Depends(get_db)):
    user = await (await db.execute(
        "SELECT id, application_id, name, business_name, email, is_active, created_at, last_login_at FROM partner_users WHERE id = ?",
        (partner["pid"],),
    )).fetchone()
    if not user or not user["is_active"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Partner account not found")
    result = dict(user)
    application = None
    if user["application_id"]:
        row = await (await db.execute(
            "SELECT category, catalog_size, country, created_at FROM partner_applications WHERE id = ?",
            (user["application_id"],),
        )).fetchone()
        application = dict(row) if row else None
    result["application"] = application
    return result


# ─── Admin: review applications ────────────────────────

class ReviewRequest(BaseModel):
    note: str = ""


@router.get("/api/partner-applications")
async def list_applications(admin=Depends(get_current_admin), db=Depends(get_db)):
    cursor = await db.execute(
        """
        SELECT a.*, u.id AS partner_user_id, u.is_active AS partner_active,
               u.last_login_at, (u.password_hash IS NOT NULL) AS password_set
        FROM partner_applications a
        LEFT JOIN partner_users u ON lower(u.email) = lower(a.email)
        ORDER BY a.created_at DESC, a.id DESC
        """
    )
    return [dict(row) for row in await cursor.fetchall()]


async def _get_application(db, app_id: int):
    row = await (await db.execute("SELECT * FROM partner_applications WHERE id = ?", (app_id,))).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Application not found")
    return row


@router.post("/api/partner-applications/{app_id}/approve")
async def approve_application(app_id: int, req: ReviewRequest, admin=Depends(get_current_admin), db=Depends(get_db)):
    application = await _get_application(db, app_id)
    await db.execute(
        "UPDATE partner_applications SET status = 'approved', admin_note = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?",
        (req.note, app_id),
    )
    user = await (await db.execute(
        "SELECT * FROM partner_users WHERE lower(email) = lower(?)", (application["email"],)
    )).fetchone()
    if user:
        user_id = user["id"]
        await db.execute(
            "UPDATE partner_users SET is_active = 1, application_id = ?, name = ?, business_name = ? WHERE id = ?",
            (app_id, application["full_name"], application["business_name"], user_id),
        )
    else:
        cursor = await db.execute(
            "INSERT INTO partner_users (application_id, name, business_name, email) VALUES (?, ?, ?, ?)",
            (app_id, application["full_name"], application["business_name"], application["email"].lower()),
        )
        user_id = cursor.lastrowid
    raw = await _issue_token(db, user_id, "setup", timedelta(hours=SETUP_TOKEN_HOURS))
    await db.commit()
    setup_url = f"{_site_url()}/partner/reset-password?token={raw}&setup=1"
    emailed = await _safe_send(
        [application["email"]],
        "Your Intube Media partner access is approved",
        _email_shell(
            f"Welcome aboard, {escape(application['full_name'])}.",
            "<p>Your partner application has been approved. Create your password to open your partner workspace.</p>"
            f'<p><a href="{setup_url}" style="display:inline-block;background:#5b6cff;color:#fff;padding:12px 20px;'
            'border-radius:10px;text-decoration:none">Create password</a></p>'
            f"<p style=\"color:#8a93b8\">This link expires in {SETUP_TOKEN_HOURS} hours. After that, use "
            f'"Forgot password" on <a style="color:#7c8cff" href="{_site_url()}/partner/login">the sign-in page</a>.</p>',
        ),
    )
    return {"message": "Application approved", "setup_url": setup_url, "emailed": emailed}


@router.post("/api/partner-applications/{app_id}/reject")
async def reject_application(app_id: int, req: ReviewRequest, admin=Depends(get_current_admin), db=Depends(get_db)):
    application = await _get_application(db, app_id)
    await db.execute(
        "UPDATE partner_applications SET status = 'rejected', admin_note = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?",
        (req.note, app_id),
    )
    await db.execute(
        "UPDATE partner_users SET is_active = 0 WHERE lower(email) = lower(?)", (application["email"],)
    )
    await db.commit()
    return {"message": "Application rejected"}


@router.delete("/api/partner-applications/{app_id}")
async def delete_application(app_id: int, admin=Depends(get_current_admin), db=Depends(get_db)):
    await _get_application(db, app_id)
    await db.execute("DELETE FROM partner_applications WHERE id = ?", (app_id,))
    await db.commit()
    return {"message": "Application deleted"}
