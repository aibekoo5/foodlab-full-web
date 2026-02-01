import uuid
import enum
from sqlalchemy import Column, String, DateTime, Enum, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.core.database import Base


class UserRole(enum.Enum):
    USER = "USER"      # студент
    CANTEEN = "CANTEEN"  # асхана
    ADMIN = "ADMIN"    # Foodlab командасы


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True, unique=True, index=True)
    password_hash = Column(String, nullable=False)
    full_name = Column(String, nullable=True)  # полное имя
    role = Column(Enum(UserRole), default=UserRole.USER, nullable=False, index=True)
    canteen_id = Column(UUID(as_uuid=True), ForeignKey("canteens.id"), nullable=True, index=True)  # для роли CANTEEN
    is_active = Column(Boolean, default=True, nullable=False)  # активен ли пользователь
    last_login = Column(DateTime(timezone=True), nullable=True)  # последний вход
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    orders = relationship("Order", back_populates="user")
    subscriptions = relationship("UserSubscription", back_populates="user")
    payments = relationship("Payment", back_populates="user")
    canteen = relationship("Canteen", foreign_keys=[canteen_id])