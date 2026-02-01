from fastapi import APIRouter, Depends, HTTPException
from typing import List
import uuid

from src.models.user import User
from src.schemas.order import OrderCreate, OrderOut
from src.models.order import OrderStatus
from src.services.order import OrderService
from src.services.subscription import SubscriptionService
from src.core.security import get_current_user
from src.api.dependencies import UOWDep

router = APIRouter()


@router.post("/", response_model=OrderOut, status_code=201)
async def create_order(
    order_data: OrderCreate,
    uow: UOWDep,
    current_user: User = Depends(get_current_user)
):
    """Создать заказ"""
    order_service = OrderService()
    subscription_service = SubscriptionService()
    
    # Проверить подписку и использовать обед
    has_subscription = await subscription_service.use_meal(uow, current_user.id)
    if not has_subscription:
        raise HTTPException(
            status_code=402,
            detail="No active subscription or no remaining meals"
        )
    
    return await order_service.create_order(uow, order_data, current_user.id)


@router.get("/my", response_model=List[OrderOut])
async def get_my_orders(
    uow: UOWDep,
    current_user: User = Depends(get_current_user)
):
    """Получить мои заказы"""
    order_service = OrderService()
    return await order_service.get_user_orders(uow, current_user.id)