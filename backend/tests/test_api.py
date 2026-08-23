import os
import tempfile
import unittest
from unittest.mock import AsyncMock, patch
from urllib.parse import parse_qs, urlparse

from fastapi.testclient import TestClient

TEST_DIRECTORY = tempfile.TemporaryDirectory()
os.environ["DB_PATH"] = os.path.join(TEST_DIRECTORY.name, "app.db")
os.environ["JWT_SECRET"] = "test-jwt-secret-with-at-least-32-bytes"
os.environ["ADMIN_USERNAME"] = "admin"
os.environ["ADMIN_EMAIL"] = "admin@example.com"
os.environ["ADMIN_INITIAL_PASSWORD"] = "InitialPass123!"
os.environ["PUBLIC_SITE_URL"] = "https://intubemedia.com"

from app.main import app


class AdminApiTest(unittest.TestCase):
    def setUp(self):
        self.client_context = TestClient(app)
        self.client = self.client_context.__enter__()
        login = self.client.post(
            "/api/auth/login",
            json={"username": "admin", "password": "InitialPass123!"},
        )
        self.assertEqual(login.status_code, 200)
        self.headers = {"Authorization": f"Bearer {login.json()['token']}"}

    def tearDown(self):
        self.client_context.__exit__(None, None, None)

    def test_admin_and_public_cms_flows(self):
        services = self.client.get("/api/public/services")
        self.assertEqual(services.status_code, 200)
        self.assertEqual(len(services.json()), 11)
        self.assertEqual(len(self.client.get("/api/public/packages").json()), 3)

        created_service = self.client.post(
            "/api/services",
            headers=self.headers,
            json={
                "slug": "temporary-service",
                "title": "Temporary Service",
                "icon": "Sparkles",
                "color": "from-blue-500 to-cyan-400",
                "section": "business",
                "description": "Created during the API test.",
                "is_active": True,
            },
        )
        self.assertEqual(created_service.status_code, 200)
        service_id = created_service.json()["id"]

        created_item = self.client.post(
            "/api/service-items",
            headers=self.headers,
            json={
                "service_id": service_id,
                "icon": "CheckCircle2",
                "name": "Temporary Item",
                "description": "Temporary item description.",
                "is_active": True,
            },
        )
        self.assertEqual(created_item.status_code, 200)
        item_id = created_item.json()["id"]
        public_service = next(
            service for service in self.client.get("/api/public/services").json()
            if service["id"] == service_id
        )
        self.assertEqual(public_service["items"][0]["name"], "Temporary Item")

        updated_item = self.client.put(
            f"/api/service-items/{item_id}",
            headers=self.headers,
            json={"name": "Updated Item", "is_active": False},
        )
        self.assertEqual(updated_item.status_code, 200)
        public_service = next(
            service for service in self.client.get("/api/public/services").json()
            if service["id"] == service_id
        )
        self.assertEqual(public_service["items"], [])

        self.assertEqual(
            self.client.put(
                f"/api/services/{service_id}",
                headers=self.headers,
                json={"title": "Updated Service", "is_active": False},
            ).status_code,
            200,
        )
        public_ids = {service["id"] for service in self.client.get("/api/public/services").json()}
        self.assertNotIn(service_id, public_ids)

        created_package = self.client.post(
            "/api/packages",
            headers=self.headers,
            json={
                "name": "Temporary Package",
                "features": ["Feature one", "Feature two"],
                "is_active": True,
            },
        )
        self.assertEqual(created_package.status_code, 200)
        package_id = created_package.json()["id"]
        package = next(
            item for item in self.client.get("/api/public/packages").json()
            if item["id"] == package_id
        )
        self.assertEqual(package["features"], ["Feature one", "Feature two"])

        created_page = self.client.post(
            "/api/pages",
            headers=self.headers,
            json={
                "slug": "temporary-page",
                "title": "Temporary Page",
                "content": "Temporary page content.",
                "is_active": True,
            },
        )
        self.assertEqual(created_page.status_code, 200)
        page_id = created_page.json()["id"]
        self.assertEqual(
            self.client.get("/api/public/pages/temporary-page").json()["title"],
            "Temporary Page",
        )
        self.assertEqual(
            self.client.put(
                f"/api/pages/{page_id}",
                headers=self.headers,
                json={"slug": "updated-page", "title": "Updated Page"},
            ).status_code,
            200,
        )
        self.assertEqual(self.client.get("/api/public/pages/temporary-page").status_code, 404)
        self.assertEqual(self.client.get("/api/public/pages/updated-page").status_code, 200)

        contact = self.client.post(
            "/api/contact",
            json={
                "name": "Temporary Contact",
                "phone": "+910000000000",
                "email": "contact@example.com",
                "service": "Temporary Service",
                "message": "Temporary message.",
            },
        )
        self.assertEqual(contact.status_code, 200)
        submission_id = self.client.get("/api/contact-submissions", headers=self.headers).json()[0]["id"]
        self.assertEqual(
            self.client.put(
                f"/api/contact-submissions/{submission_id}/read",
                headers=self.headers,
                json={},
            ).status_code,
            200,
        )

        self.assertEqual(
            self.client.put(
                "/api/theme",
                headers=self.headers,
                json={"settings": {"hero_title": "Temporary Hero"}},
            ).status_code,
            200,
        )
        self.assertEqual(
            self.client.get("/api/public/theme").json()["hero_title"],
            "Temporary Hero",
        )

        me = self.client.get("/api/auth/me", headers=self.headers)
        self.assertEqual(me.json()["email"], "admin@example.com")
        dashboard = self.client.get("/api/dashboard", headers=self.headers).json()
        self.assertIn("pages", dashboard)
        self.assertIn("submissions", dashboard)

        self.assertEqual(
            self.client.post(
                "/api/auth/change-password",
                headers=self.headers,
                json={"old_password": "wrong-password", "new_password": "ChangedPassword123!"},
            ).status_code,
            400,
        )
        self.assertEqual(
            self.client.post(
                "/api/auth/change-password",
                headers=self.headers,
                json={
                    "old_password": "InitialPass123!",
                    "new_password": "ChangedPassword123!",
                },
            ).status_code,
            200,
        )
        unknown_forgot = self.client.post(
            "/api/auth/forgot-password",
            json={"identifier": "missing@example.com"},
        )

        with patch("app.main.send_password_reset_email", new=AsyncMock()) as send_email:
            forgot = self.client.post(
                "/api/auth/forgot-password",
                json={"identifier": "admin@example.com"},
            )
            self.assertEqual(forgot.status_code, 202)
            self.assertEqual(unknown_forgot.json(), forgot.json())
            reset_url = send_email.await_args.args[1]

        token = parse_qs(urlparse(reset_url).query)["token"][0]
        reset = self.client.post(
            "/api/auth/reset-password",
            json={"token": token, "new_password": "ResetPassword123!"},
        )
        self.assertEqual(reset.status_code, 200)
        self.assertEqual(
            self.client.post(
                "/api/auth/reset-password",
                json={"token": token, "new_password": "AnotherPassword123!"},
            ).status_code,
            400,
        )
        self.assertEqual(
            self.client.post(
                "/api/auth/login",
                json={"username": "admin", "password": "ResetPassword123!"},
            ).status_code,
            200,
        )

        self.assertEqual(self.client.delete(f"/api/services/{service_id}", headers=self.headers).status_code, 200)
        self.assertEqual(self.client.delete(f"/api/packages/{package_id}", headers=self.headers).status_code, 200)
        self.assertEqual(self.client.delete(f"/api/pages/{page_id}", headers=self.headers).status_code, 200)
        self.assertEqual(
            self.client.delete(f"/api/contact-submissions/{submission_id}", headers=self.headers).status_code,
            200,
        )


if __name__ == "__main__":
    unittest.main()
