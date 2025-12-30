from fastapi import APIRouter
from src.api import auth, health, users, canteens, menu, orders, subscriptions, admin, qr

api_router = APIRouter()

# Auth endpoints
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])

# QR endpoints
api_router.include_router(qr.router, prefix="/qr", tags=["qr"])

# User endpoints
api_router.include_router(users.router, prefix="/user", tags=["user"])

# Canteen endpoints
api_router.include_router(canteens.router, prefix="/canteen", tags=["canteen"])

# Menu endpoints
api_router.include_router(menu.router, prefix="/canteen", tags=["menu"])

# Order endpoints
api_router.include_router(orders.router, prefix="/orders", tags=["orders"])

# Subscription endpoints
api_router.include_router(subscriptions.router, prefix="/subscriptions", tags=["subscriptions"])

# Admin endpoints
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])

# Health check
api_router.include_router(health.router, prefix="/health", tags=["health"])