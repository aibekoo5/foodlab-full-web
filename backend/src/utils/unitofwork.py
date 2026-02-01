from abc import ABC, abstractmethod
from typing import Type

from src.core.database import async_session_maker
from src.repositories.user import UserRepository
from src.repositories.canteen import CanteenRepository
from src.repositories.menu import MenuRepository
from src.repositories.order import OrderRepository
from src.repositories.subscription_package import SubscriptionPackageRepository
from src.repositories.user_subscription import UserSubscriptionRepository
from src.repositories.payment import PaymentRepository


# https://github1s.com/cosmicpython/code/tree/chapter_06_uow
class IUnitOfWork(ABC):
    users: Type[UserRepository]
    canteens: Type[CanteenRepository]
    menu: Type[MenuRepository]
    orders: Type[OrderRepository]
    subscription_packages: Type[SubscriptionPackageRepository]
    user_subscriptions: Type[UserSubscriptionRepository]
    payments: Type[PaymentRepository]
    
    @abstractmethod
    def __init__(self):
        ...

    @abstractmethod
    async def __aenter__(self):
        ...

    @abstractmethod
    async def __aexit__(self, *args):
        ...

    @abstractmethod
    async def commit(self):
        ...

    @abstractmethod
    async def rollback(self):
        ...


class UnitOfWork:
    def __init__(self):
        self.session_factory = async_session_maker

    async def __aenter__(self):
        self.session = self.session_factory()

        self.users = UserRepository(self.session)
        self.canteens = CanteenRepository(self.session)
        self.menu = MenuRepository(self.session)
        self.orders = OrderRepository(self.session)
        self.subscription_packages = SubscriptionPackageRepository(self.session)
        self.user_subscriptions = UserSubscriptionRepository(self.session)
        self.payments = PaymentRepository(self.session)
        
        return self

    async def __aexit__(self, *args):
        await self.rollback()
        await self.session.close()

    async def commit(self):
        await self.session.commit()

    async def rollback(self):
        await self.session.rollback()

