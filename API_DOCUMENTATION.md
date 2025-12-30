# FoodLab Backend API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
Все защищенные endpoints требуют Bearer токен в заголовке:
```
Authorization: Bearer <access_token>
```

---

## 🔐 Auth Endpoints

### POST `/auth/register`
Регистрация нового пользователя (студента)

**Request Body:**
```json
{
  "email": "student@example.com",
  "phone": "+77001234567",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "student@example.com",
  "phone": "+77001234567",
  "role": "USER",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### POST `/auth/login`
Вход в систему

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

### GET `/auth/me`
Получить информацию о текущем пользователе

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "student@example.com",
  "phone": "+77001234567",
  "role": "USER",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

## 👤 User Endpoints

### GET `/user/profile`
Получить профиль пользователя

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "student@example.com",
  "phone": "+77001234567",
  "role": "USER",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### GET `/user/subscription`
Получить активную подписку пользователя

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "package_id": "uuid",
  "remaining_meals": 10,
  "start_date": "2024-01-01T00:00:00Z",
  "end_date": "2024-01-31T00:00:00Z",
  "is_active": true
}
```

**Response:** `404 Not Found` - если нет активной подписки

### GET `/user/orders`
Получить все заказы пользователя

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "canteen_id": "uuid",
    "food_id": "uuid",
    "drink_id": "uuid",
    "status": "NEW",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

---

## 📷 QR + Orders Endpoints

### GET `/qr/{qr_code}`
Получить меню асханы по QR коду

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "name": "Асхана №1",
  "location": "Корпус А",
  "qr_code": "QR123456",
  "is_active": true,
  "menu_items": [
    {
      "id": "uuid",
      "canteen_id": "uuid",
      "name": "Плов",
      "type": "food",
      "price": 1500,
      "available": true
    },
    {
      "id": "uuid",
      "canteen_id": "uuid",
      "name": "Кола",
      "type": "drink",
      "price": 300,
      "available": true
    }
  ]
}
```

### POST `/orders`
Создать заказ (использует обед из подписки)

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "canteen_id": "uuid",
  "food_id": "uuid",
  "drink_id": "uuid"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "canteen_id": "uuid",
  "food_id": "uuid",
  "drink_id": "uuid",
  "status": "NEW",
  "created_at": "2024-01-01T00:00:00Z"
}
```

**Response:** `402 Payment Required` - если нет активной подписки или закончились обеды

### GET `/orders/my`
Получить мои заказы

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "canteen_id": "uuid",
    "food_id": "uuid",
    "drink_id": "uuid",
    "status": "NEW",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

---

## 💳 Subscription Endpoints

### GET `/subscriptions/packages`
Получить доступные пакеты подписки

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "Базовый пакет",
    "description": "10 обедов в месяц",
    "price": 10000,
    "meal_count": 10,
    "is_active": true
  }
]
```

### POST `/subscriptions/buy`
Купить подписку (создает платеж Kaspi)

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "package_id": "uuid"
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "amount": 10000,
  "method": "kaspi",
  "status": "PENDING",
  "payment_url": "https://kaspi.kz/pay/foodlab/uuid",
  "created_at": "2024-01-01T00:00:00Z"
}
```

**Примечание:** После оплаты админ должен подтвердить платеж через `/admin/confirm-payment/{payment_id}`

---

## 🍳 Canteen Endpoints

### GET `/canteen/`
Получить все активные асханы

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "Асхана №1",
    "location": "Корпус А",
    "qr_code": "QR123456",
    "is_active": true
  }
]
```

### GET `/canteen/qr/{qr_code}`
Получить асхану по QR коду с меню (то же что `/qr/{qr_code}`)

### GET `/canteen/orders`
Получить заказы асханы (только для роли CANTEEN)

**Headers:** `Authorization: Bearer <token>` (CANTEEN role)

**Query Parameters:**
- `status` (optional): NEW, READY, DONE

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "canteen_id": "uuid",
    "food_id": "uuid",
    "drink_id": "uuid",
    "status": "NEW",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

### PATCH `/canteen/orders/{order_id}`
Обновить статус заказа (только для роли CANTEEN)

**Headers:** `Authorization: Bearer <token>` (CANTEEN role)

**Query Parameters:**
- `status`: NEW, READY, DONE

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "canteen_id": "uuid",
  "food_id": "uuid",
  "drink_id": "uuid",
  "status": "READY",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### POST `/canteen/menu`
Создать позицию меню (только для роли CANTEEN)

**Headers:** `Authorization: Bearer <token>` (CANTEEN role)

**Request Body:**
```json
{
  "canteen_id": "uuid",
  "name": "Плов",
  "type": "food",
  "description": "Вкусный плов",
  "price": 1500,
  "image_url": "https://example.com/image.jpg",
  "available": true
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "canteen_id": "uuid",
  "name": "Плов",
  "type": "food",
  "price": 1500,
  "available": true,
  "created_at": "2024-01-01T00:00:00Z"
}
```

### GET `/canteen/menu`
Получить меню асханы (только для роли CANTEEN)

**Headers:** `Authorization: Bearer <token>` (CANTEEN role)

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "canteen_id": "uuid",
    "name": "Плов",
    "type": "food",
    "price": 1500,
    "available": true
  }
]
```

---

## 👨‍💼 Admin Endpoints

### GET `/admin/users`
Получить всех пользователей (только для роли ADMIN)

**Headers:** `Authorization: Bearer <token>` (ADMIN role)

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "phone": "+77001234567",
    "role": "USER",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

### GET `/admin/canteens`
Получить все асханы (только для роли ADMIN)

**Headers:** `Authorization: Bearer <token>` (ADMIN role)

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "Асхана №1",
    "location": "Корпус А",
    "qr_code": "QR123456",
    "is_active": true
  }
]
```

### POST `/admin/canteens`
Создать асхану (только для роли ADMIN)

**Headers:** `Authorization: Bearer <token>` (ADMIN role)

**Request Body:**
```json
{
  "name": "Асхана №1",
  "location": "Корпус А",
  "description": "Описание",
  "qr_code": "QR123456",
  "image_url": "https://example.com/image.jpg"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "name": "Асхана №1",
  "location": "Корпус А",
  "qr_code": "QR123456",
  "is_active": true
}
```

### POST `/admin/confirm-payment/{payment_id}`
Подтвердить платеж и активировать подписку (только для роли ADMIN)

**Headers:** `Authorization: Bearer <token>` (ADMIN role)

**Query Parameters:**
- `package_id`: UUID пакета подписки

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "package_id": "uuid",
  "remaining_meals": 10,
  "start_date": "2024-01-01T00:00:00Z",
  "end_date": "2024-01-31T00:00:00Z",
  "is_active": true
}
```

### GET `/admin/analytics`
Получить аналитику (только для роли ADMIN)

**Headers:** `Authorization: Bearer <token>` (ADMIN role)

**Response:** `200 OK`
```json
{
  "total_users": 100,
  "total_orders": 500,
  "total_revenue": 500000
}
```

---

## 📋 Menu Endpoints (дополнительные)

### GET `/menu/canteens/{canteen_id}/menu`
Получить меню асханы

**Query Parameters:**
- `type` (optional): food, drink

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "canteen_id": "uuid",
    "name": "Плов",
    "type": "food",
    "price": 1500,
    "available": true
  }
]
```

---

## Типы данных

### UserRole
```typescript
enum UserRole {
  USER = "USER",      // студент
  CANTEEN = "CANTEEN", // асхана
  ADMIN = "ADMIN"     // Foodlab командасы
}
```

### OrderStatus
```typescript
enum OrderStatus {
  NEW = "NEW",
  READY = "READY",
  DONE = "DONE"
}
```

### MenuItemType
```typescript
enum MenuItemType {
  food = "food",
  drink = "drink"
}
```

### PaymentStatus
```typescript
enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED"
}
```

### PaymentMethod
```typescript
enum PaymentMethod {
  kaspi = "kaspi"
}
```

---

## Обработка ошибок

Все ошибки возвращаются в формате:
```json
{
  "detail": "Error message"
}
```

### Статус коды:
- `200 OK` - успешный запрос
- `201 Created` - ресурс создан
- `400 Bad Request` - неверный запрос
- `401 Unauthorized` - не авторизован
- `402 Payment Required` - нет подписки/обедов
- `403 Forbidden` - недостаточно прав
- `404 Not Found` - ресурс не найден
- `500 Internal Server Error` - ошибка сервера

---

## Примеры использования

### 1. Регистрация и вход
```javascript
// Регистрация
const registerResponse = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'student@example.com',
    phone: '+77001234567',
    password: 'password123'
  })
});

// Вход
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'student@example.com',
    password: 'password123'
  })
});
const { access_token } = await loginResponse.json();
```

### 2. Сканирование QR и заказ
```javascript
// Получить меню по QR
const menuResponse = await fetch(`/api/qr/${qrCode}`);
const { menu_items } = await menuResponse.json();

// Создать заказ
const orderResponse = await fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  },
  body: JSON.stringify({
    canteen_id: canteenId,
    food_id: selectedFoodId,
    drink_id: selectedDrinkId
  })
});
```

### 3. Покупка подписки
```javascript
// Получить пакеты
const packagesResponse = await fetch('/api/subscriptions/packages');
const packages = await packagesResponse.json();

// Купить подписку
const buyResponse = await fetch('/api/subscriptions/buy', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  },
  body: JSON.stringify({
    package_id: selectedPackageId
  })
});
const { payment_url } = await buyResponse.json();

// Перенаправить на Kaspi
window.location.href = payment_url;
```

---

## Что нужно для фронтенда

### 1. TypeScript типы
Создайте файл `types.ts`:
```typescript
export enum UserRole {
  USER = "USER",
  CANTEEN = "CANTEEN",
  ADMIN = "ADMIN"
}

export enum OrderStatus {
  NEW = "NEW",
  READY = "READY",
  DONE = "DONE"
}

export enum MenuItemType {
  food = "food",
  drink = "drink"
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  role: UserRole;
  created_at: string;
}

export interface Canteen {
  id: string;
  name: string;
  location?: string;
  qr_code: string;
  is_active: boolean;
}

export interface MenuItem {
  id: string;
  canteen_id: string;
  name: string;
  type: MenuItemType;
  price: number;
  available: boolean;
}

export interface Order {
  id: string;
  user_id: string;
  canteen_id: string;
  food_id?: string;
  drink_id?: string;
  status: OrderStatus;
  created_at: string;
}

export interface SubscriptionPackage {
  id: string;
  name: string;
  price: number;
  meal_count: number;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  package_id: string;
  remaining_meals: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}
```

### 2. API Client
Создайте файл `api.ts`:
```typescript
const API_BASE = 'http://localhost:8000/api';

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Request failed');
    }

    return response.json();
  }

  // Auth
  async register(data: { email: string; phone?: string; password: string }) {
    return this.request<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    const response = await this.request<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.setToken(response.access_token);
    return response;
  }

  async getMe() {
    return this.request<User>('/auth/me');
  }

  // QR
  async getCanteenByQR(qrCode: string) {
    return this.request<Canteen & { menu_items: MenuItem[] }>(`/qr/${qrCode}`);
  }

  // Orders
  async createOrder(data: { canteen_id: string; food_id?: string; drink_id?: string }) {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyOrders() {
    return this.request<Order[]>('/orders/my');
  }

  // Subscriptions
  async getPackages() {
    return this.request<SubscriptionPackage[]>('/subscriptions/packages');
  }

  async buySubscription(packageId: string) {
    return this.request<{ payment_url: string }>('/subscriptions/buy', {
      method: 'POST',
      body: JSON.stringify({ package_id: packageId }),
    });
  }

  async getMySubscription() {
    return this.request<UserSubscription>('/user/subscription');
  }
}

export const api = new ApiClient();
```

### 3. Environment variables
Создайте `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 4. React Query / SWR пример
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from './api';

// Получить меню по QR
export function useCanteenByQR(qrCode: string) {
  return useQuery({
    queryKey: ['canteen', qrCode],
    queryFn: () => api.getCanteenByQR(qrCode),
    enabled: !!qrCode,
  });
}

// Создать заказ
export function useCreateOrder() {
  return useMutation({
    mutationFn: api.createOrder,
  });
}
```

---

## Важные моменты для фронтенда

1. **Хранение токена**: Сохраняйте `access_token` в localStorage или secure cookie
2. **Обновление токена**: Токен истекает через `expires_in` секунд
3. **Обработка 402**: Если получили 402, значит нет подписки - покажите экран покупки
4. **QR сканирование**: Используйте библиотеку типа `react-qr-reader` или нативный API
5. **Kaspi оплата**: После создания платежа перенаправляйте на `payment_url`
6. **Статусы заказов**: Обновляйте статусы в реальном времени (WebSocket или polling)

