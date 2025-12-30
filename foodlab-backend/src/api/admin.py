from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
import uuid

from ..models.user import User, UserRole
from ..schemas.user import UserOut
from ..schemas.canteen import CanteenOut, CanteenCreate
from ..schemas.subscription import UserSubscriptionOut
from ..schemas.payment import PaymentOut
from ..services.user import UserService
from ..services.canteen import CanteenService
from ..services.subscription import SubscriptionService
from ..services.payment import PaymentService
from ..core.security import require_admin
from ..api.dependencies import UOWDep

router = APIRouter()


@router.get("/users", response_model=List[UserOut])
async def get_users(
    uow: UOWDep,
    current_user: User = Depends(require_admin)
):
    """Получить всех пользователей (только для ADMIN)"""
    user_service = UserService()
    users = await user_service.get_all_users(uow)
    return [UserOut.model_validate(user) for user in users]


@router.get("/canteens", response_model=List[CanteenOut])
async def get_canteens(
    uow: UOWDep,
    current_user: User = Depends(require_admin)
):
    """Получить все асханы (только для ADMIN)"""
    canteen_service = CanteenService()
    return await canteen_service.get_all_canteens(uow)


@router.post("/canteens", response_model=CanteenOut, status_code=status.HTTP_201_CREATED)
async def create_canteen(
    canteen_data: CanteenCreate,
    uow: UOWDep,
    current_user: User = Depends(require_admin)
):
    """Создать асхану (только для ADMIN)"""
    canteen_service = CanteenService()
    try:
        return await canteen_service.create_canteen(uow, canteen_data)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/confirm-payment/{payment_id}", response_model=UserSubscriptionOut)
async def confirm_payment(
    payment_id: str,
    package_id: str,
    uow: UOWDep,
    current_user: User = Depends(require_admin)
):
    """Подтвердить платеж и активировать подписку (только для ADMIN)"""
    try:
        payment_uuid = uuid.UUID(payment_id)
        package_uuid = uuid.UUID(package_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid ID")

    payment_service = PaymentService()
    subscription_service = SubscriptionService()

    # Подтвердить платеж
    payment = await payment_service.confirm_payment(uow, payment_uuid)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    # Активировать подписку
    return await subscription_service.buy_subscription(uow, payment.user_id, package_uuid)


@router.get("/analytics")
async def get_analytics(
    uow: UOWDep,
    current_user: User = Depends(require_admin)
):
    """Получить аналитику (только для ADMIN)"""
    # TODO: Реализовать аналитику
    async with uow:
        total_users = len(await uow.users.find_all())
        total_orders = len(await uow.orders.find_all())
        # TODO: Добавить подсчет revenue из payments
        total_revenue = 0
    
    return {
        "total_users": total_users,
        "total_orders": total_orders,
        "total_revenue": total_revenue
    }

