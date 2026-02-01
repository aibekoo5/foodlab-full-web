from pydantic import BaseModel, ConfigDict
from typing import Generic, TypeVar, List, Optional, Dict, Any
from datetime import datetime

T = TypeVar('T')

class Paginated(BaseModel, Generic[T]):
    items: List[T]
    total: int
    limit: int
    offset: int
    has_more: bool

    model_config = ConfigDict(arbitrary_types_allowed=True)

class HealthCheck(BaseModel):
    status: str = "ok"
    database: bool = True
    redis: Optional[bool] = None
    timestamp: datetime

class SuccessResponse(BaseModel):
    success: bool = True
    message: Optional[str] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    details: Optional[Dict[str, Any]] = None
    code: Optional[str] = None

class BulkOperationResponse(BaseModel):
    success: bool
    processed: int
    failed: int
    errors: Optional[List[str]] = None

class FileUploadResponse(BaseModel):
    filename: str
    url: str
    size: int
    content_type: str

class SearchQuery(BaseModel):
    q: Optional[str] = None
    limit: int = 20
    offset: int = 0

class DateRangeFilter(BaseModel):
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

class LocationFilter(BaseModel):
    lat: float
    lng: float
    radius: Optional[float] = None  # in kilometers