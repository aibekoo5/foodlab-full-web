import asyncio
import asyncpg
import os
import sys

# Добавляем корневую директорию в path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.config import settings


async def test_database_connection():
    try:
        # Парсим URL для получения параметров подключения
        db_url = settings.DATABASE_URL
        print(f"Testing connection to: {db_url}")

        # Извлекаем параметры из URL
        if db_url.startswith("postgresql+asyncpg://"):
            db_url = db_url.replace("postgresql+asyncpg://", "postgresql://")

        # Пробуем подключиться напрямую через asyncpg
        conn = await asyncpg.connect(db_url)
        print("✅ Database connection successful!")

        # Проверяем версию PostgreSQL
        version = await conn.fetchval("SELECT version()")
        print(f"✅ PostgreSQL version: {version}")

        # Проверяем существование таблиц
        tables = await conn.fetch("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """)
        print(f"✅ Found {len(tables)} tables:")
        for table in tables:
            print(f"   - {table['table_name']}")

        await conn.close()

    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print("Please check:")
        print("1. Is PostgreSQL running?")
        print("2. Is the database created?")
        print("3. Are the credentials correct?")
        print("4. Is the host/port accessible?")


if __name__ == "__main__":
    asyncio.run(test_database_connection())