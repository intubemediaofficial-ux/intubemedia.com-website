import aiosqlite
import json
import os
from pathlib import Path

DB_PATH = os.environ.get("DB_PATH", "/data/app.db")
DEFAULT_CONTENT_PATH = Path(__file__).with_name("default_content.json")

async def get_db():
    db = await aiosqlite.connect(DB_PATH)
    db.row_factory = aiosqlite.Row
    try:
        yield db
    finally:
        await db.close()

async def init_db():
    os.makedirs(os.path.dirname(DB_PATH) or ".", exist_ok=True)
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS admin_users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT NOT NULL DEFAULT '',
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        admin_columns = {
            row[1] for row in await (await db.execute("PRAGMA table_info(admin_users)")).fetchall()
        }
        if "email" not in admin_columns:
            await db.execute("ALTER TABLE admin_users ADD COLUMN email TEXT NOT NULL DEFAULT ''")
        await db.execute("""
            CREATE TABLE IF NOT EXISTS password_reset_tokens (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                admin_user_id INTEGER NOT NULL,
                token_hash TEXT UNIQUE NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                used_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE CASCADE
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS services (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                slug TEXT UNIQUE NOT NULL,
                title TEXT NOT NULL,
                icon TEXT NOT NULL DEFAULT 'Globe',
                color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-400',
                section TEXT NOT NULL DEFAULT 'business',
                tagline TEXT NOT NULL DEFAULT '',
                description TEXT NOT NULL DEFAULT '',
                meta_title TEXT NOT NULL DEFAULT '',
                meta_description TEXT NOT NULL DEFAULT '',
                sort_order INTEGER NOT NULL DEFAULT 0,
                is_active INTEGER NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS service_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                service_id INTEGER NOT NULL,
                icon TEXT NOT NULL DEFAULT 'Globe',
                name TEXT NOT NULL,
                description TEXT NOT NULL DEFAULT '',
                sort_order INTEGER NOT NULL DEFAULT 0,
                is_active INTEGER NOT NULL DEFAULT 1,
                FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS packages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                tagline TEXT NOT NULL DEFAULT '',
                color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-400',
                is_popular INTEGER NOT NULL DEFAULT 0,
                features TEXT NOT NULL DEFAULT '[]',
                sort_order INTEGER NOT NULL DEFAULT 0,
                is_active INTEGER NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS contact_submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL DEFAULT '',
                email TEXT NOT NULL DEFAULT '',
                service TEXT NOT NULL DEFAULT '',
                message TEXT NOT NULL DEFAULT '',
                is_read INTEGER NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS theme_settings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                key TEXT UNIQUE NOT NULL,
                value TEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS pages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                slug TEXT UNIQUE NOT NULL,
                title TEXT NOT NULL,
                content TEXT NOT NULL DEFAULT '',
                meta_title TEXT NOT NULL DEFAULT '',
                meta_description TEXT NOT NULL DEFAULT '',
                is_active INTEGER NOT NULL DEFAULT 1,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        await db.commit()

        # Seed default admin if not exists
        cursor = await db.execute("SELECT COUNT(*) as cnt FROM admin_users")
        row = await cursor.fetchone()
        if row[0] == 0:
            from app.auth import hash_password
            username = os.environ.get("ADMIN_USERNAME", "admin")
            email = os.environ.get("ADMIN_EMAIL", "")
            password = os.environ.get("ADMIN_INITIAL_PASSWORD", "admin123")
            await db.execute(
                "INSERT INTO admin_users (username, email, password_hash) VALUES (?, ?, ?)",
                (username, email, hash_password(password))
            )
            await db.commit()
        else:
            email = os.environ.get("ADMIN_EMAIL", "")
            if email:
                await db.execute(
                    "UPDATE admin_users SET email = ? WHERE email = ''",
                    (email,),
                )
            await db.commit()

        with DEFAULT_CONTENT_PATH.open(encoding="utf-8") as content_file:
            default_content = json.load(content_file)

        cursor = await db.execute("SELECT COUNT(*) as cnt FROM services")
        row = await cursor.fetchone()
        if row[0] == 0:
            for service in default_content["services"]:
                await db.execute(
                    """
                    INSERT INTO services (
                        slug, title, icon, color, section, tagline, description,
                        meta_title, meta_description, sort_order, is_active
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        service["slug"],
                        service["title"],
                        service["icon"],
                        service["color"],
                        service["section"],
                        service["tagline"],
                        service["description"],
                        service["meta_title"],
                        service["meta_description"],
                        service["sort_order"],
                        int(service["is_active"]),
                    ),
                )
                service_id = (await (await db.execute("SELECT last_insert_rowid()")).fetchone())[0]
                for item in service["items"]:
                    await db.execute(
                        """
                        INSERT INTO service_items (
                            service_id, icon, name, description, sort_order, is_active
                        ) VALUES (?, ?, ?, ?, ?, ?)
                        """,
                        (
                            service_id,
                            item["icon"],
                            item["name"],
                            item["description"],
                            item["sort_order"],
                            int(item["is_active"]),
                        ),
                    )
            await db.commit()

        cursor = await db.execute("SELECT COUNT(*) as cnt FROM packages")
        row = await cursor.fetchone()
        if row[0] == 0:
            for package in default_content["packages"]:
                await db.execute(
                    """
                    INSERT INTO packages (
                        name, tagline, color, is_popular, features, sort_order, is_active
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        package["name"],
                        package["tagline"],
                        package["color"],
                        int(package["is_popular"]),
                        json.dumps(package["features"]),
                        package["sort_order"],
                        int(package["is_active"]),
                    ),
                )
            await db.commit()

        defaults = {
            "primary_color": "#7c3aed",
            "secondary_color": "#ec4899",
            "accent_color": "#06b6d4",
            "bg_color": "#050510",
            "text_color": "#ffffff",
            "heading_font": "Inter",
            "body_font": "Inter",
            "logo_text": "Intube Media",
            "logo_short": "iM",
            "tagline": "Digital • Technology • Creators • Media • Entertainment",
            "footer_text": "The digital, technology and media network for business IT solutions, creator management, media and entertainment.",
            "hero_title": "Transform Your Digital Presence With Us",
            "hero_subtitle": "Intube Media is the umbrella network for digital agency services, IT solutions, influencer management, media and entertainment businesses.",
            "hero_badge": "Digital • Technology • Creators • Media • Entertainment",
            "phone": "+91 XXXXX XXXXX",
            "email": "hello@intubemedia.com",
            "address": "India",
            "working_hours": "Mon - Sat, 10AM - 7PM IST",
            "stat_projects": "500+",
            "stat_clients": "200+",
            "stat_team": "50+",
            "stat_experience": "5+",
            "instagram": "",
            "youtube": "",
            "facebook": "",
            "twitter": "",
            "linkedin": "",
        }
        for key, value in defaults.items():
            await db.execute(
                "INSERT OR IGNORE INTO theme_settings (key, value) VALUES (?, ?)",
                (key, value),
            )
        await db.commit()
