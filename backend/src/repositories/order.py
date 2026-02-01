from typing import Optional, List
from sqlalchemy import select, and_, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
import uuid
from datetime import datetime

from src.models.order import Order, OrderStatus
from .base import SQLAlchemyRepository


class OrderRepository(SQLAlchemyRepository[Order]):
    model = Order

    def __init__(self, session: AsyncSession):
        super().__init__(session)

    async def get_with_relations(self, order_id: uuid.UUID) -> Optional[Order]:
        """Получить заказ с загруженными связями"""
        result = await self.session.execute(
            select(Order)
            .options(
                selectinload(Order.user),
                selectinload(Order.canteen),
                selectinload(Order.food),
                selectinload(Order.drink)
            )
            .where(Order.id == order_id)
        )
        return result.scalar_one_or_none()

    async def get_user_orders(
            self,
            user_id: uuid.UUID,
            status: Optional[OrderStatus] = None,
            limit: int = 100,
            offset: int = 0
    ) -> List[Order]:
        """Получить заказы пользователя"""
        conditions = [Order.user_id == user_id]

        if status:
            conditions.append(Order.status == status)

        result = await self.session.execute(
            select(Order)
            .where(and_(*conditions))
            .order_by(Order.created_at.desc())
            .offset(offset)
            .limit(limit)
        )
        return result.scalars().all()

    async def get_canteen_orders(
            self,
            canteen_id: uuid.UUID,
            status: Optional[OrderStatus] = None,
            limit: int = 100,
            offset: int = 0
    ) -> List[Order]:
        """Получить заказы асханы"""
        conditions = [Order.canteen_id == canteen_id]

        if status:
            conditions.append(Order.status == status)

        result = await self.session.execute(
            select(Order)
            .where(and_(*conditions))
            .order_by(Order.created_at.desc())
            .offset(offset)
            .limit(limit)
        )
        return result.scalars().all()

    async def get_new_orders(self, canteen_id: uuid.UUID) -> List[Order]:
        """Получить новые заказы асханы"""
        result = await self.session.execute(
            select(Order)
            .where(
                and_(
                    Order.canteen_id == canteen_id,
                    Order.status == OrderStatus.NEW
                )
            )
            .order_by(Order.created_at.asc())
        )
        return result.scalars().all()

    async def update_order_status(
            self,
            order_id: uuid.UUID,
            status: OrderStatus
    ) -> Optional[Order]:
        """Обновить статус заказа"""
        order = await self.get(order_id)
        if not order:
            return None

        order.status = status
        await self.session.flush()
        await self.session.refresh(order)
        return order

    async def count_by_status(self, canteen_id: uuid.UUID, status: OrderStatus) -> int:
        """Подсчитать заказы по статусу"""
        result = await self.session.execute(
            select(func.count(Order.id)).where(
                and_(
                    Order.canteen_id == canteen_id,
                    Order.status == status
                )
            )
        )
        return result.scalar_one()