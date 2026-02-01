from fastapi import APIRouter, Depends, HTTPException
from typing import List
import uuid

from src.models.user import User
from src.schemas.subscription import SubscriptionPackageOut, UserSubscriptionOut
from src.schemas.payment import PaymentCreate, PaymentOut
from src.services.subscription import SubscriptionService
from src.services.payment import PaymentService
from src.core.security import get_current_user, require_admin
from src.api.dependencies import UOWDep

router = APIRouter()


@router.get("/packages", response_model=List[SubscriptionPackageOut])
async def get_packages(
    uow: UOWDep
):
    """Получить доступные пакеты подписки"""
    subscription_service = SubscriptionService()
    return await subscription_service.get_packages(uow)


@router.post("/buy", response_model=PaymentOut)
async def buy_subscription(
    package_id: str,
    uow: UOWDep,
    current_user: User = Depends(get_current_user)
):
    """Купить подписку (создает платеж)"""
    try:
        package_uuid = uuid.UUID(package_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid package ID")

    subscription_service = SubscriptionService()
    payment_service = PaymentService()

    # Получить пакет
    packages = await subscription_service.get_packages(uow)
    package = next((p for p in packages if p.id == package_uuid), None)
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")

    # Создать платеж
    payment_data = PaymentCreate(
        user_id=current_user.id,
        amount=package.price
    )
    return await payment_service.create_kaspi_payment(uow, payment_data)


@router.post("/confirm-payment/{payment_id}", response_model=UserSubscriptionOut)
async def confirm_payment(
    payment_id: str,
    package_id: str,
    uow: UOWDep,
    current_user: User = Depends(require_admin)  # Только админ может подтверждать
):
    """Подтвердить платеж и активировать подписку"""
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