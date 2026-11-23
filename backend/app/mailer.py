import asyncio
import json
import os
import urllib.error
import urllib.request


def _send_email(recipients: list[str], subject: str, html: str, reply_to: str | None = None) -> None:
    api_key = os.environ.get("BREVO_API_KEY", "")
    sender_email = os.environ.get("BREVO_SENDER_EMAIL", "intubemediaofficial@gmail.com")
    sender_name = os.environ.get("BREVO_SENDER_NAME", "Intube Media")
    if not api_key:
        raise RuntimeError("BREVO_API_KEY is not configured")
    message: dict = {
        "sender": {"name": sender_name, "email": sender_email},
        "to": [{"email": recipient} for recipient in recipients],
        "subject": subject,
        "htmlContent": html,
    }
    if reply_to:
        message["replyTo"] = {"email": reply_to}
    request = urllib.request.Request(
        "https://api.brevo.com/v3/smtp/email",
        data=json.dumps(message).encode(),
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
        raise RuntimeError(f"Brevo rejected the email with status {error.code}") from error


async def send_email(recipients: list[str], subject: str, html: str, reply_to: str | None = None) -> None:
    await asyncio.to_thread(_send_email, recipients, subject, html, reply_to)


async def send_password_otp_email(recipient: str, code: str, account: str) -> None:
    from app.otp import otp_email_html

    await send_email(
        [recipient],
        "Your Intube Media password reset code",
        otp_email_html(code, account),
    )
