import aiosqlite
import os
import json

DB_PATH = os.environ.get("DB_PATH", "/data/app.db")

async def get_db():
    db = await aiosqlite.connect(DB_PATH)
    db.row_factory = aiosqlite.Row
    try:
        yield db
    finally:
        await db.close()

async def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS admin_users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
            default_hash = hash_password("admin123")
            await db.execute(
                "INSERT INTO admin_users (username, password_hash) VALUES (?, ?)",
                ("admin", default_hash)
            )
            await db.commit()

        # Seed default theme settings if not exists
        cursor = await db.execute("SELECT COUNT(*) as cnt FROM theme_settings")
        row = await cursor.fetchone()
        if row[0] == 0:
            defaults = {
                "primary_color": "#7c3aed",
                "secondary_color": "#ec4899",
                "bg_color": "#050510",
                "font_family": "Inter",
                "logo_text": "Intube Media",
                "logo_short": "iM",
                "hero_title": "Transform Your Digital Presence With Us",
                "hero_subtitle": "From business IT solutions to influencer management, we provide comprehensive digital services that help brands grow and creators shine.",
                "hero_badge": "India's Fastest Growing Digital Agency",
                "phone": "+91 XXXXX XXXXX",
                "email": "hello@intubemedia.com",
                "address": "India",
                "working_hours": "Mon - Sat, 10AM - 7PM IST",
                "stat_projects": "500+",
                "stat_clients": "200+",
                "stat_team": "50+",
                "stat_experience": "5+",
            }
            for key, value in defaults.items():
                await db.execute(
                    "INSERT INTO theme_settings (key, value) VALUES (?, ?)",
                    (key, value)
                )
            await db.commit()
