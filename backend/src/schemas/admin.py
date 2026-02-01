from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
import uuid

from .user import UserOut
from .canteen import CanteenOut
from .order import OrderOut
from .subscription import UserSubscriptionOut

class AdminStats(BaseModel):
    total_users: int
    total_orders: int
    total_canteens: int
    total_subscriptions: int
    revenue_today: int
    revenue_this_month: int
    active_orders: int

class UserListResponse(BaseModel):
    users: List[UserOut]
    total: int
    limit: int
    offset: int

class OrderListResponse(BaseModel):
    orders: List[OrderOut]
    total: int
    limit: int
    offset: int

class CanteenListResponse(BaseModel):
    canteens: List[CanteenOut]
    total: int
    limit: int
    offset: int

class SubscriptionListResponse(BaseModel):
    subscriptions: List[UserSubscriptionOut]
    total: int
    limit: int
    offset: int

class UserCreateAdmin(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None
    phone: Optional[str] = None
    is_staff: bool = False
    is_active: bool = True

class BulkUserCreate(BaseModel):
    users: List[UserCreateAdmin]

class SystemSettings(BaseModel):
    site_name: str
    maintenance_mode: bool = False
    allow_registrations: bool = True
    allow_guest_orders: bool = True
    default_ready_time: int = 15
    currency: str = "KZT"

class AuditLogEntry(BaseModel):
    id: uuid.UUID
    actor_user_id: Optional[uuid.UUID]
    action: str
    model: str
    model_id: Optional[uuid.UUID]
    data: Dict[str, Any]
    ip_address: Optional[str]
    user_agent: Optional[str]
    created_at: datetime