import uuid
import enum
from sqlalchemy import Column, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.core.database import Base


class OrderStatus(enum.Enum):
    NEW = "NEW"
    READY = "READY"
    DONE = "DONE"


class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    canteen_id = Column(UUID(as_uuid=True), ForeignKey("canteens.id"), nullable=False, index=True)
    food_id = Column(UUID(as_uuid=True), ForeignKey("menu_items.id"), nullable=True)  # еда
    drink_id = Column(UUID(as_uuid=True), ForeignKey("menu_items.id"), nullable=True)  # напиток
    status = Column(Enum(OrderStatus), default=OrderStatus.NEW, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="orders")
    canteen = relationship("Canteen", back_populates="orders")
    food = relationship("MenuItem", foreign_keys=[food_id])
    drink = relationship("MenuItem", foreign_keys=[drink_id])