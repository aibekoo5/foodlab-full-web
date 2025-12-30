from pydantic import BaseModel, EmailStr, validator, ConfigDict
from typing import Optional
from datetime import datetime
import uuid
from enum import Enum

from ..models.user import UserRole


class UserCreate(BaseModel):
    email: EmailStr
    phone: Optional[str] = None
    password: str

    @validator('password')
    def password_strength(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class UserOut(BaseModel):
    id: uuid.UUID
    email: str
    phone: Optional[str] = None
    role: UserRole
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)