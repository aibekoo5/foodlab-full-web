from typing import Optional, List
import uuid
from datetime import datetime, timedelta

from src.utils.unitofwork import IUnitOfWork
from src.schemas.subscription import SubscriptionPackageOut, UserSubscriptionOut


class SubscriptionService:
    async def get_packages(self, uow: IUnitOfWork) -> List[SubscriptionPackageOut]:
        """Получить доступные пакеты подписки"""
        async with uow:
            packages = await uow.subscription_packages.get_active_packages()
            return [SubscriptionPackageOut.model_validate(p) for p in packages]

    async def get_user_subscription(
            self,
            uow: IUnitOfWork,
            user_id: uuid.UUID
    ) -> Optional[UserSubscriptionOut]:
        """Получить активную подписку пользователя"""
        async with uow:
            subscription = await uow.user_subscriptions.get_user_active_subscription(user_id)
            if not subscription:
                return None
            return UserSubscriptionOut.model_validate(subscription)

    async def buy_subscription(
            self,
            uow: IUnitOfWork,
            user_id: uuid.UUID,
            package_id: uuid.UUID
    ) -> UserSubscriptionOut:
        """Купить подписку (после оплаты)"""
        async with uow:
            package = await uow.subscription_packages.get(package_id)
            if not package or not package.is_active:
                raise ValueError("Package not found or inactive")

            # Создать подписку
            start_date = datetime.utcnow()
            end_date = start_date + timedelta(days=30)  # 30 дней по умолчанию

            subscription_dict = {
                "user_id": user_id,
                "package_id": package_id,
                "remaining_meals": package.meal_count,
                "start_date": start_date,
                "end_date": end_date,
                "is_active": True
            }

            subscription = await uow.user_subscriptions.add_one(subscription_dict)
            await uow.commit()
            await uow.session.refresh(subscription)

            return UserSubscriptionOut.model_validate(subscription)

    async def use_meal(
            self,
            uow: IUnitOfWork,
            user_id: uuid.UUID
    ) -> bool:
        """Использовать один обед из подписки"""
        async with uow:
            subscription = await uow.user_subscriptions.get_user_active_subscription(user_id)
            if not subscription or subscription.remaining_meals <= 0:
                return False

            updated = await uow.user_subscriptions.decrement_meals(subscription.id)
            if not updated:
                return False

            await uow.commit()
            return True
