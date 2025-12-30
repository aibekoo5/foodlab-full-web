from typing import Optional, List
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

from src.models.menu import MenuItem, MenuItemType
from .base import SQLAlchemyRepository


class MenuRepository(SQLAlchemyRepository[MenuItem]):
    model = MenuItem

    def __init__(self, session: AsyncSession):
        super().__init__(session)

    async def get_canteen_menu(
            self,
            canteen_id: uuid.UUID,
            item_type: Optional[MenuItemType] = None,
            available: bool = True
    ) -> List[MenuItem]:
        """Получить меню асханы"""
        conditions = [MenuItem.canteen_id == canteen_id]

        if item_type:
            conditions.append(MenuItem.type == item_type)

        if available:
            conditions.append(MenuItem.available == True)

        result = await self.session.execute(
            select(MenuItem)
            .where(and_(*conditions))
            .order_by(MenuItem.name)
        )
        return result.scalars().all()

    async def get_available_items(self, item_ids: List[uuid.UUID]) -> List[MenuItem]:
        """Получить доступные позиции меню по ID"""
        result = await self.session.execute(
            select(MenuItem)
            .where(
                and_(
                    MenuItem.id.in_(item_ids),
                    MenuItem.available == True
                )
            )
        )
        return result.scalars().all()

    async def get_food_items(self, canteen_id: uuid.UUID) -> List[MenuItem]:
        """Получить только еду"""
        result = await self.session.execute(
            select(MenuItem)
            .where(
                and_(
                    MenuItem.canteen_id == canteen_id,
                    MenuItem.type == MenuItemType.food,
                    MenuItem.available == True
                )
            )
        )
        return result.scalars().all()

    async def get_drink_items(self, canteen_id: uuid.UUID) -> List[MenuItem]:
        """Получить только напитки"""
        result = await self.session.execute(
            select(MenuItem)
            .where(
                and_(
                    MenuItem.canteen_id == canteen_id,
                    MenuItem.type == MenuItemType.drink,
                    MenuItem.available == True
                )
            )
        )
        return result.scalars().all()