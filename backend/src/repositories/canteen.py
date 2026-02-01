from typing import Optional, List
from sqlalchemy import select, and_, func
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

from src.models.canteen import Canteen
from .base import SQLAlchemyRepository


class CanteenRepository(SQLAlchemyRepository[Canteen]):
    model = Canteen

    def __init__(self, session: AsyncSession):
        super().__init__(session)

    async def get_by_qr_code(self, qr_code: str) -> Optional[Canteen]:
        """Получить асхану по QR коду"""
        result = await self.session.execute(
            select(Canteen).where(Canteen.qr_code == qr_code)
        )
        return result.scalar_one_or_none()

    async def get_by_id_or_qr(self, identifier: str) -> Optional[Canteen]:
        """Получить асхану по ID или QR коду"""
        try:
            canteen_id = uuid.UUID(identifier)
            return await self.get(canteen_id)
        except ValueError:
            return await self.get_by_qr_code(identifier)

    async def get_active_canteens(self) -> List[Canteen]:
        """Получить активные асханы"""
        result = await self.session.execute(
            select(Canteen).where(Canteen.is_active == True)
        )
        return result.scalars().all()

    async def search_canteens(
            self,
            search: Optional[str] = None,
            limit: int = 100,
            offset: int = 0
    ) -> List[Canteen]:
        """Поиск асхан"""
        query = select(Canteen).where(Canteen.is_active == True)

        if search:
            query = query.where(
                Canteen.name.ilike(f"%{search}%") |
                Canteen.location.ilike(f"%{search}%")
            )

        query = query.offset(offset).limit(limit)
        result = await self.session.execute(query)
        return result.scalars().all()