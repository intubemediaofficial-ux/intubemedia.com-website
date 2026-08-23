import asyncio
import json
import os
import urllib.error
import urllib.request


def _send_password_reset_email(recipient: str, reset_url: str) -> None:
    api_key = os.environ.get("BREVO_API_KEY", "")
    sender_email = os.environ.get("BREVO_SENDER_EMAIL", "intubemediaofficial@gmail.com")
    sender_name = os.environ.get("BREVO_SENDER_NAME", "Intube Media")
    if not api_key:
        raise RuntimeError("BREVO_API_KEY is not configured")

    payload = json.dumps({
        "sender": {"name": sender_name, "email": sender_email},
        "to": [{"email": recipient}],
        "subject": "Reset your Intube Media admin password",
        "htmlContent": (
            "<p>A password reset was requested for your Intube Media admin account.</p>"
            f'<p><a href="{reset_url}">Reset admin password</a></p>'
            "<p>This link expires in 30 minutes and can only be used once.</p>"
            "<p>If you did not request this, you can ignore this email.</p>"
        ),
    }).encode()
    request = urllib.request.Request(
        "https://api.brevo.com/v3/smtp/email",
        data=payload,
        method="POST",
        headers={
            "accept": "application/json",
            "api-key": api_key,
            "content-type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=15):
            return
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"Brevo rejected the reset email with status {error.code}") from error


async def send_password_reset_email(recipient: str, reset_url: str) -> None:
    await asyncio.to_thread(_send_password_reset_email, recipient, reset_url)
