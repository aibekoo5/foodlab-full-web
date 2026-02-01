from typing import Optional, List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.models.subscription_package import SubscriptionPackage
from .base import SQLAlchemyRepository


class SubscriptionPackageRepository(SQLAlchemyRepository[SubscriptionPackage]):
    model = SubscriptionPackage

    def __init__(self, session: AsyncSession):
        super().__init__(session)

    async def get_active_packages(self) -> List[SubscriptionPackage]:
        """Получить активные пакеты подписки"""
        result = await self.session.execute(
            select(SubscriptionPackage)
            .where(SubscriptionPackage.is_active == True)
            .order_by(SubscriptionPackage.price)
        )
        return result.scalars().all()

