from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime
import uuid

from ..models.menu import MenuItemType


class MenuItemCreate(BaseModel):
    canteen_id: uuid.UUID
    name: str
    type: MenuItemType  # "food" | "drink"
    description: Optional[str] = None
    price: int = 0  # цена в тенге
    image_url: Optional[str] = None
    available: bool = True


class MenuItemOut(BaseModel):
    id: uuid.UUID
    canteen_id: uuid.UUID
    name: str
    description: Optional[str] = None
    type: MenuItemType
    price: int  # цена в тенге
    image_url: Optional[str] = None
    available: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)