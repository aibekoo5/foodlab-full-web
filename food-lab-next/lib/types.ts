// Shared TypeScript types that mirror backend SQLAlchemy/Pydantic models

export enum Role {
  USER = 'USER',
  CANTEEN = 'CANTEEN',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string; // uuid
  email: string;
  phone?: string | null;
  role: Role;
  created_at: string; // ISO date
}

export interface Canteen {
  id: string;
  name: string;
  location?: string | null;
  qr_code?: string | null;
  is_active: boolean;
  // When fetching by QR, the backend returns menu_items
  menu_items?: MenuItem[];
}

export type MenuItemType = 'food' | 'drink';

export interface MenuItem {
  id: string;
  canteen_id: string;
  name: string;
  type: MenuItemType;
  price?: number;
  description?: string;
  image_url?: string;
  available: boolean;
}

export interface SubscriptionPackage {
  id: string;
  name: string;
  description?: string;
  price: number;
  meal_count: number;
  is_active?: boolean;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  package_id: string;
  remaining_meals: number;
  start_date: string; // ISO date
  end_date: string; // ISO date
  is_active: boolean;
}

export type OrderStatus = 'NEW' | 'READY' | 'DONE';

export interface Order {
  id: string;
  user_id: string;
  canteen_id: string;
  food_id?: string | null;
  drink_id?: string | null;
  status: OrderStatus;
  created_at: string; // ISO date
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  method: 'kaspi' | string;
  status: 'PENDING' | 'PAID' | 'FAILED';
  payment_url?: string;
  created_at?: string;
}

// API response shapes
export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in?: number; // seconds
}

// Schemas for requests
export interface UserCreate {
  email: string;
  phone?: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
