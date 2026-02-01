import uuid
from sqlalchemy import Column, String, DateTime, Integer, Text, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.core.database import Base


class SubscriptionPackage(Base):
    __tablename__ = "subscription_packages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)  # описание пакета
    price = Column(Integer, nullable=False)  # цена в тенге
    meal_count = Column(Integer, nullable=False)  # количество обедов
    is_active = Column(Boolean, default=True, nullable=False)  # активен ли пакет
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    user_subscriptions = relationship("UserSubscription", back_populates="package")

