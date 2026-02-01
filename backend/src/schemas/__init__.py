from .common import *
from .user import *
from .canteen import *
from .menu import *
from .order import *
from .postamat import *
from .subscription import *
from .admin import *
from .analytics import *

__all__ = [
    # Common
    "Paginated", "HealthCheck", "SuccessResponse", "ErrorResponse",
    "BulkOperationResponse", "FileUploadResponse", "SearchQuery",

    # User
    "UserBase", "UserCreate", "UserLogin", "UserUpdate", "UserUpdateAdmin",
    "UserOut", "UserProfile", "Token", "TokenRefresh", "PasswordChange",

    # Canteen
    "WorkingHours", "CanteenBase", "CanteenCreate", "CanteenUpdate",
    "CanteenOut", "CanteenWithMenu", "CanteenStats",

    # Menu
    "MenuCategory", "NutritionInfo", "AllergenInfo", "MenuItemBase",
    "MenuItemCreate", "MenuItemUpdate", "MenuItemOut", "MenuItemDetailed",
    "MenuCategoryWithItems", "MenuResponse",

    # Order
    "OrderSource", "OrderStatus", "PaymentStatus", "OrderItemIn",
    "OrderCreate", "OrderItemOut", "OrderOut", "OrderStatusUpdate",
    "OrderCancelRequest", "OrderPaymentUpdate", "OrderWithCanteen",  # Добавлены новые схемы
    "OrderStats", "QueueInfo",

    # Postamat
    "PostamatBase", "PostamatCreate", "PostamatUpdate", "PostamatOut",
    "PostamatWithStats", "CityPostamats",

    # Subscription
    "SubscriptionPackageOut", "UserSubscriptionOut",

    # Admin
    "AdminStats", "UserListResponse", "OrderListResponse",
    "CanteenListResponse", "SubscriptionListResponse", "UserCreateAdmin",
    "BulkUserCreate", "SystemSettings", "AuditLogEntry",

    # Analytics
    "RevenueStats", "CanteenPerformance", "PopularItems", "TimeSeriesData",
    "AnalyticsResponse"
]