from fastapi import APIRouter, Depends, HTTPException
import uuid

from src.models.user import User
from src.schemas.user import UserOut
from src.schemas.subscription import UserSubscriptionOut
from src.schemas.order import OrderOut
from src.services.user import UserService
from src.services.subscription import SubscriptionService
from src.services.order import OrderService
from src.core.security import get_current_user
from src.api.dependencies import UOWDep

router = APIRouter()


@router.get("/profile", response_model=UserOut)
async def get_profile(
    uow: UOWDep,
    current_user: User = Depends(get_current_user)
):
    """Получить профиль пользователя"""
    user_service = UserService()
    profile = await user_service.get_user_profile(uow, current_user.id)
    if not profile:
        raise HTTPException(status_code=404, detail="User not found")
    return profile


@router.get("/subscription", response_model=UserSubscriptionOut)
async def get_subscription(
    uow: UOWDep,
    current_user: User = Depends(get_current_user)
):
    """Получить подписку пользователя"""
    subscription_service = SubscriptionService()
    subscription = await subscription_service.get_user_subscription(uow, current_user.id)
    if not subscription:
        raise HTTPException(status_code=404, detail="No active subscription")
    return subscription


@router.get("/orders", response_model=list[OrderOut])
async def get_orders(
    uow: UOWDep,
    current_user: User = Depends(get_current_user)
):
    """Получить заказы пользователя"""
    order_service = OrderService()
    return await order_service.get_user_orders(uow, current_user.id)