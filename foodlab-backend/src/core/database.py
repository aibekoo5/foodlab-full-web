from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Используем относительный импорт для избежания циклических зависимостей
try:
    from .config import settings
except ImportError:
    # Fallback для случаев, когда импортируется напрямую
    from core.config import settings

# Для Alembic используем синхронный URL
SYNC_DATABASE_URL = settings.DATABASE_URL.replace("asyncpg", "psycopg2")

# Асинхронный engine для приложения
engine = create_async_engine(settings.DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# Base для моделей
Base = declarative_base()

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()