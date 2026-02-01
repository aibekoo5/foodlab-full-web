import uuid
import enum
from sqlalchemy import Column, String, DateTime, Boolean, Enum, ForeignKey, Integer, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.core.database import Base


class MenuItemType(enum.Enum):
    food = "food"
    drink = "drink"


class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    canteen_id = Column(UUID(as_uuid=True), ForeignKey("canteens.id"), nullable=False, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    type = Column(Enum(MenuItemType), nullable=False)
    price = Column(Integer, nullable=False, default=0)
    image_url = Column(String, nullable=True)
    available = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    canteen = relationship("Canteen", back_populates="menu_items")