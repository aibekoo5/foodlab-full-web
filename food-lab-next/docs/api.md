# API Contract (Frontend reference)

This document mirrors the FastAPI backend endpoints and Pydantic schemas that the frontend expects. Use it as a quick reference for integration and testing.

Base URL: `http://localhost:8000/api` (frontend uses NEXT_PUBLIC_API_BASE to override)

## Auth

POST /auth/register
- Body: { email: string, phone?: string, password: string }
- Response: User

POST /auth/login
- Body: { email: string, password: string }
- Response: { access_token: string, token_type: 'bearer' }

GET /auth/me
- Headers: Authorization: Bearer TOKEN
- Response: User

## User

GET /user/profile
- Response: User

GET /user/subscription
- Response: UserSubscription

GET /user/orders
- Response: [Order]

## Subscriptions

GET /subscriptions/packages
- Response: [SubscriptionPackage]

POST /subscriptions/buy
- Body: { package_id: number }
- Response: UserSubscription

## QR + Orders

GET /qr/{qr_code}
- Response: { canteen: Canteen, menu: [MenuItem] }

POST /orders
- Body: { user_id?, canteen_id, food_id?, drink_id? }
- Response: Order

GET /orders/my
- Response: [Order]

## Canteen

GET /canteen/orders
- Response: [Order]

PATCH /canteen/orders/{id}
- Body: Partial Order (e.g., { status: 'READY' })
- Response: Order

POST /canteen/menu
- Body: { canteen_id?, name, type: 'food'|'drink', available }
- Response: MenuItem

GET /canteen/menu
- Response: [MenuItem]

## Admin

GET /admin/users
- Response: [User]

GET /admin/canteens
- Response: [Canteen]

POST /admin/canteens
- Body: { name, location, is_active }
- Response: Canteen

GET /admin/analytics
- Response: { revenue, active_subscriptions, orders_per_day, growth }

---

Types summary (frontend)
- User: id, email, phone, role, created_at
- Canteen: id, name, location, qr_code, is_active
- MenuItem: id, canteen_id, name, type, available
- SubscriptionPackage: id, name, price, meal_count
- UserSubscription: id, user_id, package_id, remaining_meals, start_date, end_date, is_active
- Order: id, user_id, canteen_id, food_id, drink_id, status, created_at
- Payment: id, user_id, amount, method, status

Notes:
- All responses are expected in JSON.
- Auth token is a bearer token; store it in `localStorage` during development for convenience.
- The frontend currently uses `lib/apiClient.ts` as the single place to call backend endpoints.
