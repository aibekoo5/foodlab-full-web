from typing import Optional
import uuid

from src.utils.unitofwork import IUnitOfWork
from src.schemas.user import UserCreate, UserLogin, TokenResponse, UserOut
from src.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
)
from src.core.config import settings
from src.models.user import UserRole


class AuthService:
    async def authenticate_user(self, uow: IUnitOfWork, login_data: UserLogin) -> Optional[UserOut]:
        """Аутентификация пользователя"""
        async with uow:
            user = await uow.users.get_by_email(login_data.email)
            if not user:
                return None
            if not verify_password(login_data.password, user.password_hash):
                return None
            if not user.is_active:
                return None

            # Update last login
            await uow.users.update_last_login(user.id)
            await uow.commit()

            return UserOut(
                id=user.id,
                email=user.email,
                phone=user.phone,
                role=user.role,
                created_at=user.created_at
            )

    async def create_token_response(self, user_id: uuid.UUID) -> TokenResponse:
        """Создать токен для пользователя"""
        access_token = create_access_token(str(user_id))
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )

    async def register_user(self, uow: IUnitOfWork, user_data: UserCreate) -> UserOut:
        """Регистрация нового пользователя"""
        async with uow:
            # Check if user already exists
            existing_user = await uow.users.get_by_email(user_data.email)
            if existing_user:
                raise ValueError("User with this email already exists")

            if user_data.phone:
                existing_phone = await uow.users.get_by_phone(user_data.phone)
                if existing_phone:
                    raise ValueError("User with this phone already exists")

            user_dict = user_data.dict(exclude_unset=True)
            user_dict["password_hash"] = get_password_hash(user_dict.pop("password"))
            user_dict["role"] = UserRole.USER  # По умолчанию студент

            user = await uow.users.add_one(user_dict)
            await uow.commit()
            await uow.session.refresh(user)

            return UserOut(
                id=user.id,
                email=user.email,
                phone=user.phone,
                role=user.role,
                created_at=user.created_at
            )