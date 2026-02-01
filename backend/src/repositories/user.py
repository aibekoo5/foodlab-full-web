from typing import Optional, List
from sqlalchemy import select, update, func
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

from src.models.user import User
from .base import SQLAlchemyRepository


class UserRepository(SQLAlchemyRepository[User]):
    model = User

    def __init__(self, session: AsyncSession):
        super().__init__(session)

    async def get_by_email(self, email: str) -> Optional[User]:
        result = await self.session.execute(
            select(User).where(User.email == email)
        )
        return result.scalar_one_or_none()

    async def get_by_phone(self, phone: str) -> Optional[User]:
        result = await self.session.execute(
            select(User).where(User.phone == phone)
        )
        return result.scalar_one_or_none()

    async def update_last_login(self, user_id: uuid.UUID) -> None:
        await self.session.execute(
            update(User)
            .where(User.id == user_id)
            .values(last_login=func.now())
        )
        await self.session.flush()

    async def get_by_role(self, role) -> List[User]:
        """Получить пользователей по роли"""
        result = await self.session.execute(
            select(User).where(User.role == role)
        )
        return result.scalars().all()

    async def get_active_users(self) -> List[User]:
        """Получить активных пользователей"""
        result = await self.session.execute(
            select(User).where(User.is_active == True)
        )
        return result.scalars().all()