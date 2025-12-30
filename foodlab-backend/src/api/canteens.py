from fastapi import APIRouter, Depends, HTTPException
from typing import List

from src.models.user import User
from src.schemas.canteen import CanteenOut, CanteenWithMenu
from src.schemas.order import OrderOut
from src.schemas.menu import MenuItemOut, MenuItemCreate
from src.services.canteen import CanteenService
from src.services.order import OrderService
from src.services.menu import MenuService
from src.core.security import require_admin, require_canteen
from src.api.dependencies import UOWDep
from src.models.order import OrderStatus

router = APIRouter()


@router.get("/", response_model=List[CanteenOut])
async def get_canteens(
    uow: UOWDep
):
    """Получить все активные асханы"""
    canteen_service = CanteenService()
    return await canteen_service.get_active_canteens(uow)


@router.get("/qr/{qr_code}", response_model=CanteenWithMenu)
async def get_canteen_by_qr(
    qr_code: str,
    uow: UOWDep
):
    """Получить асхану по QR коду с меню"""
    canteen_service = CanteenService()
    canteen = await canteen_service.get_by_qr_code(uow, qr_code)
    if not canteen:
        raise HTTPException(status_code=404, detail="Canteen not found")
    return canteen


@router.get("/menu", response_model=List[MenuItemOut])
async def get_menu(
    uow: UOWDep,
    current_user: User = Depends(require_canteen)
):
    """Получить меню асханы (только для CANTEEN роли)"""
    if not current_user.canteen_id:
        raise HTTPException(status_code=403, detail="User is not associated with a canteen")
    
    menu_service = MenuService()
    return await menu_service.get_canteen_menu(uow, current_user.canteen_id)


@router.post("/menu", response_model=MenuItemOut)
async def create_menu_item(
    menu_item_data: MenuItemCreate,
    uow: UOWDep,
    current_user: User = Depends(require_canteen)
):
    """Создать позицию меню (только для CANTEEN роли)"""
    menu_service = MenuService()
    return await menu_service.create_menu_item(uow, menu_item_data)


@router.get("/orders", response_model=List[OrderOut])
async def get_canteen_orders(
    uow: UOWDep,
    status: OrderStatus = None,
    current_user: User = Depends(require_canteen)
):
    """Получить заказы асханы (только для CANTEEN роли)"""
    if not current_user.canteen_id:
        raise HTTPException(status_code=403, detail="User is not associated with a canteen")
    
    order_service = OrderService()
    return await order_service.get_canteen_orders(uow, current_user.canteen_id, status=status)


@router.patch("/orders/{order_id}", response_model=OrderOut)
async def update_order_status(
    order_id: str,
    status: OrderStatus,
    uow: UOWDep,
    current_user: User = Depends(require_canteen)
):
    """Обновить статус заказа"""
    import uuid
    if not current_user.canteen_id:
        raise HTTPException(status_code=403, detail="User is not associated with a canteen")
    
    order_service = OrderService()
    try:
        order_uuid = uuid.UUID(order_id)
        # Проверить, что заказ принадлежит асхане пользователя
        async with uow:
            order = await uow.orders.get(order_uuid)
            if not order:
                raise HTTPException(status_code=404, detail="Order not found")
            if order.canteen_id != current_user.canteen_id:
                raise HTTPException(status_code=403, detail="Order does not belong to your canteen")
        
        order = await order_service.update_order_status(uow, order_uuid, status)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return order
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid order ID")