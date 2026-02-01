from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional, List
import uuid

from src.models.user import User
from src.schemas.menu import MenuItemOut, MenuItemCreate
from src.models.menu import MenuItemType
from src.services.menu import MenuService
from src.core.security import require_canteen
from src.api.dependencies import UOWDep

router = APIRouter()


@router.get("/canteens/{canteen_id}/menu", response_model=List[MenuItemOut])
async def get_canteen_menu(
    canteen_id: str,
    uow: UOWDep,
    type: Optional[MenuItemType] = Query(None, description="Filter by type: food or drink")
):
    """Получить меню асханы"""
    menu_service = MenuService()
    try:
        canteen_uuid = uuid.UUID(canteen_id)
        return await menu_service.get_canteen_menu(uow, canteen_uuid, item_type=type)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid canteen ID")


@router.post("/menu", response_model=MenuItemOut, status_code=201)
async def create_menu_item(
    menu_item_data: MenuItemCreate,
    uow: UOWDep,
    current_user: User = Depends(require_canteen)
):
    """Создать позицию меню (только для CANTEEN)"""
    menu_service = MenuService()
    return await menu_service.create_menu_item(uow, menu_item_data)


@router.patch("/menu/{item_id}", response_model=MenuItemOut)
async def update_menu_item(
    item_id: str,
    uow: UOWDep,
    available: Optional[bool] = Query(None),
    name: Optional[str] = Query(None),
    current_user: User = Depends(require_canteen)
):
    """Обновить позицию меню"""
    menu_service = MenuService()
    try:
        item_uuid = uuid.UUID(item_id)
        item = await menu_service.update_menu_item(uow, item_uuid, available=available, name=name)
        if not item:
            raise HTTPException(status_code=404, detail="Menu item not found")
        return item
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid item ID")