from fastapi import APIRouter, Depends, HTTPException, status

from src.schemas.user import UserCreate, UserLogin, UserOut, TokenResponse
from src.services.auth import AuthService
from src.core.security import get_current_user
from src.models.user import User
from src.api.dependencies import UOWDep

router = APIRouter()


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserCreate,
    uow: UOWDep
):
    """Регистрация нового пользователя"""
    auth_service = AuthService()
    try:
        return await auth_service.register_user(uow, user_data)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/login", response_model=TokenResponse)
async def login(
    login_data: UserLogin,
    uow: UOWDep
):
    """Вход в систему"""
    auth_service = AuthService()
    user = await auth_service.authenticate_user(uow, login_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    return await auth_service.create_token_response(user.id)


@router.get("/me", response_model=UserOut)
async def get_me(
    current_user: User = Depends(get_current_user)
):
    """Получить информацию о текущем пользователе"""
    return UserOut(
        id=current_user.id,
        email=current_user.email,
        phone=current_user.phone,
        role=current_user.role,
        created_at=current_user.created_at
    )