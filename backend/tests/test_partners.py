import os
import tempfile
import unittest
from unittest.mock import AsyncMock, patch
from urllib.parse import parse_qs, urlparse

from fastapi.testclient import TestClient

if "DB_PATH" not in os.environ:
    TEST_DIRECTORY = tempfile.TemporaryDirectory()
    os.environ["DB_PATH"] = os.path.join(TEST_DIRECTORY.name, "app.db")
os.environ.setdefault("JWT_SECRET", "test-jwt-secret-with-at-least-32-bytes")
os.environ.setdefault("ADMIN_USERNAME", "admin")
os.environ.setdefault("ADMIN_EMAIL", "admin@example.com")
os.environ.setdefault("ADMIN_EMAILS", "admin@example.com,second.admin@example.com")
os.environ.setdefault("ADMIN_INITIAL_PASSWORD", "InitialPass123!")
os.environ.setdefault("PUBLIC_SITE_URL", "https://intubemedia.com")

from app.main import app

APPLICATION = {
    "full_name": "Test Artist",
    "business_name": "Test Records",
    "email": "Artist@Example.com",
    "phone": "+91 99999 99999",
    "whatsapp": "+91 99999 99999",
    "country": "India",
    "category": "Record label",
    "catalog_size": "11-50 releases",
    "music_links": "https://youtube.com/@test",
    "about": "Folk <b>music</b>",
    "distribution_needs": "Worldwide",
    "consent": True,
}


class PartnerFlowTest(unittest.TestCase):
    def setUp(self):
        self.ctx = TestClient(app)
        self.client = self.ctx.__enter__()
        login = self.client.post("/api/auth/login", json={"username": "admin", "password": "InitialPass123!"})
        self.admin = {"Authorization": f"Bearer {login.json()['token']}"}

    def tearDown(self):
        self.ctx.__exit__(None, None, None)

    def test_apply_approve_login_reset(self):
        with patch("app.partners.send_email", new=AsyncMock()) as send:
            self.assertEqual(self.client.post("/api/partner/apply", json={**APPLICATION, "consent": False}).status_code, 400)
            self.assertEqual(self.client.post("/api/partner/apply", json={**APPLICATION, "email": "bad"}).status_code, 400)
            res = self.client.post("/api/partner/apply", json=APPLICATION)
            self.assertEqual(res.status_code, 201)
            self.assertEqual(send.await_count, 2)
            notify_to, subject, html = send.await_args_list[0].args[:3]
            self.assertEqual(notify_to, ["intubemediaofficial@gmail.com", "business@intubemedia.com"])
            self.assertIn("Test Artist", subject)
            self.assertIn("&lt;b&gt;music&lt;/b&gt;", html)
            self.assertEqual(send.await_args_list[1].args[0], ["artist@example.com"])

            self.client.post("/api/partner/apply", json=APPLICATION)
            self.client.post("/api/partner/apply", json={**APPLICATION, "email": "bot@example.com", "website": "x"})

        self.assertEqual(self.client.get("/api/partner-applications").status_code, 401)
        apps = self.client.get("/api/partner-applications", headers=self.admin).json()
        mine = [a for a in apps if a["email"] == "artist@example.com"]
        self.assertEqual(len(mine), 1)
        self.assertFalse([a for a in apps if a["email"] == "bot@example.com"])
        app_id = mine[0]["id"]
        self.assertEqual(mine[0]["status"], "pending")

        bad_login = self.client.post("/api/partner/login", json={"email": "artist@example.com", "password": "x"})
        self.assertEqual(bad_login.status_code, 401)

        with patch("app.partners.send_email", new=AsyncMock()) as send:
            approved = self.client.post(f"/api/partner-applications/{app_id}/approve", json={}, headers=self.admin).json()
        self.assertTrue(approved["emailed"])
        token = parse_qs(urlparse(approved["setup_url"]).query)["token"][0]
        self.assertEqual(self.client.post("/api/partner/reset-password", json={"token": token, "new_password": "short"}).status_code, 400)
        self.assertEqual(self.client.post("/api/partner/reset-password", json={"token": token, "new_password": "Partner2026"}).status_code, 200)
        self.assertEqual(self.client.post("/api/partner/reset-password", json={"token": token, "new_password": "Partner2026"}).status_code, 400)

        login = self.client.post("/api/partner/login", json={"email": "ARTIST@example.com", "password": "Partner2026"})
        self.assertEqual(login.status_code, 200)
        partner = {"Authorization": f"Bearer {login.json()['token']}"}
        me = self.client.get("/api/partner/me", headers=partner).json()
        self.assertEqual(me["name"], "Test Artist")
        self.assertEqual(me["application"]["catalog_size"], "11-50 releases")
        self.assertEqual(self.client.get("/api/partner-applications", headers=partner).status_code, 401)
        self.assertEqual(self.client.get("/api/partner/me", headers=self.admin).status_code, 401)

        import sqlite3
        with sqlite3.connect(os.environ["DB_PATH"]) as raw_db:
            raw_db.execute("UPDATE partner_password_tokens SET created_at = datetime('now', '-5 minutes')")
        with patch("app.partners.send_email", new=AsyncMock()) as send:
            self.client.post("/api/partner/forgot-password", json={"email": "artist@example.com"})
            self.client.post("/api/partner/forgot-password", json={"email": "nobody@example.com"})
        self.assertEqual(send.await_count, 1)
        self.assertEqual(send.await_args.args[0], ["artist@example.com"])
        import re
        code = re.search(r">(\d{6})<", send.await_args.args[2]).group(1)
        self.assertNotIn(code, send.await_args.args[1], "code must not be in the subject")
        reset = lambda otp, email="artist@example.com": self.client.post(
            "/api/partner/reset-password", json={"email": email, "otp": otp, "new_password": "NewPass2026"}
        )
        wrong = "000000" if code != "000000" else "111111"
        self.assertEqual(reset(wrong).status_code, 400)
        self.assertEqual(reset(code, "nobody@example.com").status_code, 400)
        self.assertEqual(reset(code).status_code, 200)
        self.assertEqual(reset(code).status_code, 400, "code is single use")
        self.assertEqual(self.client.post("/api/partner/login", json={"email": "artist@example.com", "password": "NewPass2026"}).status_code, 200)

        self.client.post(f"/api/partner-applications/{app_id}/reject", json={}, headers=self.admin)
        self.assertEqual(self.client.post("/api/partner/login", json={"email": "artist@example.com", "password": "NewPass2026"}).status_code, 403)
        self.assertEqual(self.client.get("/api/partner/me", headers=partner).status_code, 401)
        stats = self.client.get("/api/dashboard", headers=self.admin).json()
        self.assertIn("pending_partner_applications", stats)

    def test_turnstile_required_when_configured(self):
        with patch.dict(os.environ, {"TURNSTILE_SECRET_KEY": "secret"}), patch("app.partners._verify_turnstile_sync", return_value=False):
            res = self.client.post("/api/partner/apply", json={**APPLICATION, "email": "t@example.com"})
            self.assertEqual(res.status_code, 400)
            res = self.client.post("/api/partner/login", json={"email": "t@example.com", "password": "x"})
            self.assertEqual(res.status_code, 400)

    def test_upload_image(self):
        png = b"\x89PNG\r\n\x1a\n" + b"0" * 32
        self.assertEqual(self.client.post("/api/uploads", files={"file": ("a.png", png, "image/png")}).status_code, 401)
        bad = self.client.post("/api/uploads", files={"file": ("a.png", b"hello", "image/png")}, headers=self.admin)
        self.assertEqual(bad.status_code, 400)
        res = self.client.post("/api/uploads", files={"file": ("a.png", png, "image/png")}, headers=self.admin)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(self.client.get(res.json()["path"]).content, png)
        self.assertEqual(self.client.get("/uploads/..secret").status_code, 404)


if __name__ == "__main__":
    unittest.main()
