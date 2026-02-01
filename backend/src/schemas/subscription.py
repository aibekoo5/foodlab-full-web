from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime
import uuid


class SubscriptionPackageOut(BaseModel):
    id: uuid.UUID
    name: str
    description: Optional[str] = None
    price: int  # цена в тенге
    meal_count: int  # количество обедов
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserSubscriptionOut(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    package_id: uuid.UUID
    remaining_meals: int  # оставшиеся обеды
    start_date: datetime
    end_date: datetime
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
