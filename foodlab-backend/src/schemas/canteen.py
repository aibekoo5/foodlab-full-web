from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
import uuid

from .menu import MenuItemOut


class CanteenOut(BaseModel):
    id: uuid.UUID
    name: str
    location: Optional[str] = None
    description: Optional[str] = None
    qr_code: str
    image_url: Optional[str] = None
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class CanteenCreate(BaseModel):
    name: str
    location: Optional[str] = None
    description: Optional[str] = None
    qr_code: str
    image_url: Optional[str] = None
    is_active: bool = True

class CanteenWithMenu(CanteenOut):
    menu_items: List['MenuItemOut'] = []