from typing import Optional, List
import uuid

from src.utils.unitofwork import IUnitOfWork
from src.schemas.canteen import CanteenOut, CanteenWithMenu
from src.schemas.menu import MenuItemOut


class CanteenService:
    async def get_by_qr_code(self, uow: IUnitOfWork, qr_code: str) -> Optional[CanteenWithMenu]:
        """Получить асхану по QR коду с меню"""
        async with uow:
            canteen = await uow.canteens.get_by_qr_code(qr_code)
            if not canteen or not canteen.is_active:
                return None

            # Получить меню
            menu_items = await uow.menu.get_canteen_menu(canteen.id, available=True)
            
            return CanteenWithMenu(
                id=canteen.id,
                name=canteen.name,
                location=canteen.location,
                qr_code=canteen.qr_code,
                is_active=canteen.is_active,
                menu_items=[MenuItemOut.model_validate(item) for item in menu_items]
            )

    async def get_canteen(self, uow: IUnitOfWork, identifier: str) -> Optional[CanteenOut]:
        """Получить асхану по ID или QR коду"""
        async with uow:
            canteen = await uow.canteens.get_by_id_or_qr(identifier)
            if not canteen:
                return None
            return CanteenOut.model_validate(canteen)

    async def get_active_canteens(self, uow: IUnitOfWork) -> List[CanteenOut]:
        """Получить все активные асханы"""
        async with uow:
            canteens = await uow.canteens.get_active_canteens()
            return [CanteenOut.model_validate(c) for c in canteens]

    async def get_all_canteens(self, uow: IUnitOfWork) -> List[CanteenOut]:
        """Получить все асханы (включая неактивные)"""
        async with uow:
            canteens = await uow.canteens.find_all()
            return [CanteenOut.model_validate(c) for c in canteens]

    async def create_canteen(self, uow: IUnitOfWork, canteen_data: 'CanteenCreate') -> CanteenOut:
        """Создать новую асхану"""
        async with uow:
            # Проверить, что QR код уникален
            existing = await uow.canteens.get_by_qr_code(canteen_data.qr_code)
            if existing:
                raise ValueError("Canteen with this QR code already exists")

            canteen_dict = canteen_data.model_dump()
            canteen = await uow.canteens.add_one(canteen_dict)
            await uow.commit()
            await uow.session.refresh(canteen)
            return CanteenOut.model_validate(canteen)