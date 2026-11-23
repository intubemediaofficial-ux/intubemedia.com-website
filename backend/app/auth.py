import jwt
import os
import hashlib
import hmac
import secrets
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

SECRET_KEY = os.environ.get("JWT_SECRET", "intube-media-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24
PASSWORD_HASH_ITERATIONS = 310000
LEGACY_HASH_SALT = "intube-media-salt"

security = HTTPBearer()

# Only these mailboxes may hold the website admin role.
DEFAULT_ADMIN_EMAILS = (
    "shivlalbainslaofficial@gmail.com",
    "ajeetbainslaofficial@gmail.com",
)


def admin_emails() -> tuple[str, ...]:
    configured = os.environ.get("ADMIN_EMAILS", "")
    emails = tuple(e.strip().lower() for e in configured.split(",") if e.strip())
    return emails or DEFAULT_ADMIN_EMAILS


def is_admin_email(email: object) -> bool:
    return isinstance(email, str) and email.strip().lower() in admin_emails()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    if hashed_password.startswith("pbkdf2_sha256$"):
        try:
            _, iterations, salt, expected_hash = hashed_password.split("$", 3)
            actual_hash = hashlib.pbkdf2_hmac(
                "sha256",
                plain_password.encode(),
                bytes.fromhex(salt),
                int(iterations),
            ).hex()
            return hmac.compare_digest(actual_hash, expected_hash)
        except (TypeError, ValueError):
            return False

    legacy_hash = hashlib.pbkdf2_hmac(
        "sha256",
        plain_password.encode(),
        LEGACY_HASH_SALT.encode(),
        100000,
    ).hex()
    return hmac.compare_digest(legacy_hash, hashed_password)

def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode(),
        salt,
        PASSWORD_HASH_ITERATIONS,
    ).hex()
    return f"pbkdf2_sha256${PASSWORD_HASH_ITERATIONS}${salt.hex()}${password_hash}"

def password_needs_rehash(hashed_password: str) -> bool:
    if not hashed_password.startswith("pbkdf2_sha256$"):
        return True
    try:
        _, iterations, _, _ = hashed_password.split("$", 3)
        return int(iterations) < PASSWORD_HASH_ITERATIONS
    except (TypeError, ValueError):
        return True

def validate_password(password: str) -> None:
    if len(password) < 12:
        raise HTTPException(status_code=400, detail="Password must be at least 12 characters")
    if not any(character.islower() for character in password):
        raise HTTPException(status_code=400, detail="Password must include a lowercase letter")
    if not any(character.isupper() for character in password):
        raise HTTPException(status_code=400, detail="Password must include an uppercase letter")
    if not any(character.isdigit() for character in password):
        raise HTTPException(status_code=400, detail="Password must include a number")

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    payload = decode_token(credentials.credentials)
    if (
        not payload.get("id")
        or not payload.get("sub")
        or payload.get("role") == "partner"
        or not is_admin_email(payload.get("email"))
    ):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return payload

async def get_current_partner(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    payload = decode_token(credentials.credentials)
    if payload.get("role") != "partner" or not payload.get("pid"):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return payload
