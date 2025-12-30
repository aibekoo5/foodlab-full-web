from typing import Optional, List
import uuid

from src.utils.unitofwork import IUnitOfWork
from src.schemas.menu import MenuItemCreate, MenuItemOut
from src.models.menu import MenuItemType


class MenuService:
    async def get_canteen_menu(
            self,
            uow: IUnitOfWork,
            canteen_id: uuid.UUID,
            item_type: Optional[MenuItemType] = None
    ) -> List[MenuItemOut]:
        """Получить меню асханы"""
        async with uow:
            menu_items = await uow.menu.get_canteen_menu(
                canteen_id, item_type=item_type, available=True
            )
            return [MenuItemOut.model_validate(item) for item in menu_items]

    async def create_menu_item(self, uow: IUnitOfWork, menu_item_data: MenuItemCreate) -> MenuItemOut:
        """Создать позицию меню"""
        async with uow:
            # Verify canteen exists
            canteen = await uow.canteens.get(menu_item_data.canteen_id)
            if not canteen:
                raise ValueError("Canteen not found")

            menu_item = await uow.menu.add_one(menu_item_data.dict())
            await uow.commit()
            await uow.session.refresh(menu_item)
            return MenuItemOut.model_validate(menu_item)

    async def update_menu_item(
            self,
            uow: IUnitOfWork,
            item_id: uuid.UUID,
            available: Optional[bool] = None,
            name: Optional[str] = None
    ) -> Optional[MenuItemOut]:
        """Обновить позицию меню"""
        async with uow:
            menu_item = await uow.menu.get(item_id)
            if not menu_item:
                return None

            if available is not None:
                menu_item.available = available
            if name:
                menu_item.name = name

            await uow.commit()
            await uow.session.refresh(menu_item)
            return MenuItemOut.model_validate(menu_item)

    async def delete_menu_item(self, uow: IUnitOfWork, item_id: uuid.UUID) -> bool:
        """Удалить позицию меню"""
        async with uow:
            result = await uow.menu.delete(item_id)
            await uow.commit()
            return result