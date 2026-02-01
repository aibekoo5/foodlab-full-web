from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime
import uuid

from ..models.payment import PaymentMethod, PaymentStatus


class PaymentOut(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    amount: int  # сумма в тенге
    method: PaymentMethod  # "kaspi"
    status: PaymentStatus  # PENDING / PAID / FAILED
    payment_url: Optional[str] = None  # ссылка на оплату Kaspi
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PaymentCreate(BaseModel):
    user_id: uuid.UUID
    amount: int
    method: PaymentMethod = PaymentMethod.kaspi

