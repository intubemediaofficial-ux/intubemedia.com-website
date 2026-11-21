import os
import secrets
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.responses import FileResponse

from app.auth import get_current_admin
from app.database import DB_PATH

router = APIRouter()

UPLOAD_DIR = Path(os.environ.get("UPLOAD_DIR") or Path(DB_PATH).parent / "uploads")
MAX_UPLOAD_BYTES = 6 * 1024 * 1024
ALLOWED_TYPES = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif"}
SIGNATURES = (b"\xff\xd8\xff", b"\x89PNG\r\n\x1a\n", b"GIF87a", b"GIF89a")


def _looks_like_image(head: bytes) -> bool:
    return head.startswith(SIGNATURES) or (head[:4] == b"RIFF" and head[8:12] == b"WEBP")


@router.post("/api/uploads")
async def upload_image(file: UploadFile = File(...), admin=Depends(get_current_admin)):
    extension = ALLOWED_TYPES.get(file.content_type or "")
    if not extension:
        raise HTTPException(status_code=400, detail="Only JPG, PNG, WEBP or GIF images are allowed")
    data = await file.read(MAX_UPLOAD_BYTES + 1)
    if len(data) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=400, detail="Image must be 6 MB or smaller")
    if not _looks_like_image(data[:16]):
        raise HTTPException(status_code=400, detail="File is not a valid image")
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    name = f"{secrets.token_hex(12)}{extension}"
    (UPLOAD_DIR / name).write_bytes(data)
    return {"path": f"/uploads/{name}"}


@router.get("/uploads/{name}")
async def get_upload(name: str):
    if "/" in name or "\\" in name or name.startswith("."):
        raise HTTPException(status_code=404, detail="Not found")
    path = UPLOAD_DIR / name
    if not path.is_file():
        raise HTTPException(status_code=404, detail="Not found")
    return FileResponse(path, headers={"Cache-Control": "public, max-age=31536000, immutable"})
