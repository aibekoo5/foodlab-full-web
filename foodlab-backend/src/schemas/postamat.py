from pydantic import BaseModel, validator
from typing import Optional, List, Dict, Any
from datetime import datetime
import uuid

class PostamatBase(BaseModel):
    name: str
    address: str
    city: str
    lat: Optional[float] = None
    lng: Optional[float] = None
    code: Optional[str] = None

class PostamatCreate(PostamatBase):
    metadata: Optional[Dict[str, Any]] = None

class PostamatUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    code: Optional[str] = None
    is_active: Optional[bool] = None
    metadata: Optional[Dict[str, Any]] = None

class PostamatOut(PostamatBase):
    id: uuid.UUID
    is_active: bool
    metadata: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PostamatWithStats(PostamatOut):
    total_orders: int
    today_orders: int
    active_orders: int

class CityPostamats(BaseModel):
    city: str
    postamats: List[PostamatOut]