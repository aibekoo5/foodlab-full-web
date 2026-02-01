from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from src.core.config import settings


# Для Alembic используем синхронный URL
SYNC_DATABASE_URL = settings.DATABASE_URL.replace("asyncpg", "psycopg2")

# Асинхронный engine для приложения
engine = create_async_engine(settings.DATABASE_URL, echo=True)
async_session_maker = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

# Base для моделей
Base = declarative_base()

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        try:
            yield session
        finally:
            await session.close()
