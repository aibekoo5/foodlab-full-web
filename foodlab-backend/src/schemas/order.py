from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime
import uuid

from ..models.order import OrderStatus


class OrderCreate(BaseModel):
    canteen_id: uuid.UUID
    food_id: Optional[uuid.UUID] = None  # еда
    drink_id: Optional[uuid.UUID] = None  # напиток


class OrderOut(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    canteen_id: uuid.UUID
    food_id: Optional[uuid.UUID] = None
    drink_id: Optional[uuid.UUID] = None
    status: OrderStatus  # NEW / READY / DONE
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)