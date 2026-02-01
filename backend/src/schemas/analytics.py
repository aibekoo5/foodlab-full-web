import uuid

from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime, date

class RevenueStats(BaseModel):
    date: date
    revenue: int
    orders_count: int
    average_order_value: float

class CanteenPerformance(BaseModel):
    canteen_id: uuid.UUID
    canteen_name: str
    total_orders: int
    total_revenue: int
    average_prep_time: float
    completion_rate: float

class PopularItems(BaseModel):
    menu_item_id: uuid.UUID
    menu_item_name: str
    orders_count: int
    total_quantity: int
    total_revenue: int

class TimeSeriesData(BaseModel):
    labels: List[str]
    datasets: List[Dict[str, Any]]

class AnalyticsResponse(BaseModel):
    period: str
    start_date: date
    end_date: date
    revenue_stats: List[RevenueStats]
    canteen_performance: List[CanteenPerformance]
    popular_items: List[PopularItems]