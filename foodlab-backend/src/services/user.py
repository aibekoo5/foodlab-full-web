from typing import Optional, List
import uuid

from src.utils.unitofwork import IUnitOfWork
from src.schemas.user import UserOut
from src.models.user import User


class UserService:
    async def get_user(self, uow: IUnitOfWork, user_id: uuid.UUID) -> Optional[UserOut]:
        """Получить пользователя по ID"""
        async with uow:
            user = await uow.users.get(user_id)
            if not user:
                return None
            return UserOut(
                id=user.id,
                email=user.email,
                phone=user.phone,
                role=user.role,
                created_at=user.created_at
            )

    async def get_user_profile(self, uow: IUnitOfWork, user_id: uuid.UUID) -> Optional[UserOut]:
        """Получить профиль пользователя"""
        return await self.get_user(uow, user_id)

    async def get_all_users(self, uow: IUnitOfWork) -> List[User]:
        """Получить всех пользователей"""
        async with uow:
            return await uow.users.find_all()