from typing import Optional, List
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
import uuid
from datetime import datetime

from src.models.subscription import Plan, Subscription
from .base import SQLAlchemyRepository


class PlanRepository(SQLAlchemyRepository[Plan]):
    model = Plan

    def __init__(self, session: AsyncSession):
        super().__init__(session)

    async def get_by_slug(self, slug: str) -> Optional[Plan]:
        result = await self.session.execute(
            select(Plan).where(Plan.slug == slug)
        )
        return result.scalar_one_or_none()

    async def get_available_plans(self) -> List[Plan]:
        result = await self.session.execute(
            select(Plan).order_by(Plan.price_cents)
        )
        return result.scalars().all()

    async def get_by_stripe_price_id(self, stripe_price_id: str) -> Optional[Plan]:
        result = await self.session.execute(
            select(Plan).where(Plan.stripe_price_id == stripe_price_id)
        )
        return result.scalar_one_or_none()


class SubscriptionRepository(SQLAlchemyRepository[Subscription]):
    model = Subscription

    def __init__(self, session: AsyncSession):
        super().__init__(session)

    async def get_user_subscription(self, user_id: uuid.UUID) -> Optional[Subscription]:
        result = await self.session.execute(
            select(Subscription)
            .where(Subscription.user_id == user_id)
            .order_by(Subscription.created_at.desc())
        )
        return result.scalar_one_or_none()

    async def get_active_subscription(self, user_id: uuid.UUID) -> Optional[Subscription]:
        result = await self.session.execute(
            select(Subscription)
            .where(
                and_(
                    Subscription.user_id == user_id,
                    Subscription.status.in_(['active', 'trialing']),
                    Subscription.current_period_end > datetime.utcnow()
                )
            )
        )
        return result.scalar_one_or_none()

    async def get_by_stripe_subscription_id(self, stripe_subscription_id: str) -> Optional[Subscription]:
        result = await self.session.execute(
            select(Subscription)
            .where(Subscription.stripe_subscription_id == stripe_subscription_id)
        )
        return result.scalar_one_or_none()

    async def get_expiring_subscriptions(self, days: int = 7) -> List[Subscription]:
        expiry_date = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        result = await self.session.execute(
            select(Subscription)
            .where(
                and_(
                    Subscription.status == 'active',
                    Subscription.current_period_end <= expiry_date
                )
            )
        )
        return result.scalars().all()

    async def update_subscription_status(
            self,
            subscription_id: uuid.UUID,
            status: str,
            current_period_end: Optional[datetime] = None
    ) -> Optional[Subscription]:
        subscription = await self.get(subscription_id)
        if not subscription:
            return None

        subscription.status = status
        if current_period_end:
            subscription.current_period_end = current_period_end

        await self.session.flush()
        await self.session.refresh(subscription)
        return subscription