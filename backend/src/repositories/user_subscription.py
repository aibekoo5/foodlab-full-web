from typing import Optional, List
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
import uuid
from datetime import datetime

from src.models.user_subscription import UserSubscription
from .base import SQLAlchemyRepository


class UserSubscriptionRepository(SQLAlchemyRepository[UserSubscription]):
    model = UserSubscription

    def __init__(self, session: AsyncSession):
        super().__init__(session)

    async def get_user_active_subscription(self, user_id: uuid.UUID) -> Optional[UserSubscription]:
        """Получить активную подписку пользователя"""
        result = await self.session.execute(
            select(UserSubscription)
            .where(
                and_(
                    UserSubscription.user_id == user_id,
                    UserSubscription.is_active == True,
                    UserSubscription.end_date > datetime.utcnow()
                )
            )
            .order_by(UserSubscription.created_at.desc())
        )
        return result.scalar_one_or_none()

    async def get_user_subscriptions(self, user_id: uuid.UUID) -> List[UserSubscription]:
        """Получить все подписки пользователя"""
        result = await self.session.execute(
            select(UserSubscription)
            .where(UserSubscription.user_id == user_id)
            .order_by(UserSubscription.created_at.desc())
        )
        return result.scalars().all()

    async def decrement_meals(self, subscription_id: uuid.UUID) -> Optional[UserSubscription]:
        """Уменьшить количество оставшихся обедов"""
        subscription = await self.get(subscription_id)
        if not subscription or subscription.remaining_meals <= 0:
            return None

        subscription.remaining_meals -= 1
        await self.session.flush()
        await self.session.refresh(subscription)
        return subscription

