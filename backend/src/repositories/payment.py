from typing import Optional, List
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

from src.models.payment import Payment, PaymentStatus
from .base import SQLAlchemyRepository


class PaymentRepository(SQLAlchemyRepository[Payment]):
    model = Payment

    def __init__(self, session: AsyncSession):
        super().__init__(session)

    async def get_user_payments(
            self,
            user_id: uuid.UUID,
            status: Optional[PaymentStatus] = None,
            limit: int = 100
    ) -> List[Payment]:
        """Получить платежи пользователя"""
        conditions = [Payment.user_id == user_id]

        if status:
            conditions.append(Payment.status == status)

        result = await self.session.execute(
            select(Payment)
            .where(and_(*conditions))
            .order_by(Payment.created_at.desc())
            .limit(limit)
        )
        return result.scalars().all()

    async def get_pending_payments(self) -> List[Payment]:
        """Получить все ожидающие платежи"""
        result = await self.session.execute(
            select(Payment)
            .where(Payment.status == PaymentStatus.PENDING)
            .order_by(Payment.created_at.asc())
        )
        return result.scalars().all()

    async def update_payment_status(
            self,
            payment_id: uuid.UUID,
            status: PaymentStatus
    ) -> Optional[Payment]:
        """Обновить статус платежа"""
        payment = await self.get(payment_id)
        if not payment:
            return None

        payment.status = status
        await self.session.flush()
        await self.session.refresh(payment)
        return payment

