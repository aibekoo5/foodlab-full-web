from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from sqlalchemy import text

from src.schemas.common import HealthCheck
from src.core.database import get_async_session

router = APIRouter()

@router.get("/", response_model=HealthCheck)
async def health_check(db: AsyncSession = Depends(get_async_session)):
    # Check database connection
    db_ok = True
    try:
        # Используем text() и явно коммитим транзакцию
        result = await db.execute(text("SELECT 1"))
        await db.commit()  # Явный коммит
    except Exception as e:
        print(f"Database health check error: {e}")
        db_ok = False
        await db.rollback()  # Роллбэк в случае ошибки

    return HealthCheck(
        status="ok",
        database=db_ok,
        timestamp=datetime.utcnow()
    )