import hashlib
import hmac
import secrets
from datetime import datetime, timedelta, timezone

OTP_MINUTES = 10
OTP_MAX_ATTEMPTS = 5
OTP_PREFIX = "otp$"


def generate_otp() -> str:
    return f"{secrets.randbelow(1_000_000):06d}"


def hash_otp(otp: str) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.sha256(f"{salt}:{otp}".encode()).hexdigest()
    return f"{OTP_PREFIX}{salt}${digest}"


def otp_matches(stored: str, otp: str) -> bool:
    if not stored.startswith(OTP_PREFIX):
        return False
    try:
        salt, digest = stored[len(OTP_PREFIX):].split("$", 1)
    except ValueError:
        return False
    actual = hashlib.sha256(f"{salt}:{otp.strip()}".encode()).hexdigest()
    return hmac.compare_digest(actual, digest)


def otp_expiry() -> str:
    return (datetime.now(timezone.utc) + timedelta(minutes=OTP_MINUTES)).isoformat()


def otp_email_html(code: str, account: str) -> str:
    return (
        '<div style="font-family:Arial,sans-serif;background:#f5f6fa;padding:32px">'
        '<div style="max-width:520px;margin:auto;background:#fff;border-radius:14px;padding:32px;color:#1d2233">'
        '<div style="font-size:20px;font-weight:700;color:#e11d2a">Intube Media</div>'
        f'<h2 style="margin:20px 0 8px">Your {account} password reset code</h2>'
        '<p style="color:#555">Enter this code on the reset page to choose a new password.</p>'
        f'<div style="font-size:34px;font-weight:700;letter-spacing:10px;margin:24px 0;color:#111">{code}</div>'
        f'<p style="color:#555">The code expires in {OTP_MINUTES} minutes and can be used once. '
        'If you did not ask for it, ignore this email; your password stays the same.</p>'
        "</div></div>"
    )
