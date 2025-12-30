import { TokenResponse, UserCreate, UserLogin, User, SubscriptionPackage, UserSubscription, Order, Canteen, MenuItem, Payment } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api';

function authHeaders() {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResp(res: Response) {
  const text = await res.text().catch(() => '');
  if (!res.ok) {
    // Try to parse JSON error
    try {
      const parsed = JSON.parse(text || '{}')
      const err = new Error(parsed.detail || res.statusText)
      ;(err as any).status = res.status
      throw err
    } catch (e) {
      const err = new Error(text || res.statusText)
      ;(err as any).status = res.status
      throw err
    }
  }
  return text ? JSON.parse(text) : null
}

export const auth = {
  register: (payload: UserCreate) =>
    fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(handleResp) as Promise<User>,

  login: (payload: UserLogin) =>
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((res) => handleResp(res) as Promise<TokenResponse>),

  me: () =>
    fetch(`${API_BASE}/auth/me`, {
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    }).then(handleResp) as Promise<User>,
};

export const subscriptions = {
  listPackages: () =>
    fetch(`${API_BASE}/subscriptions/packages`, {
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    }).then(handleResp) as Promise<SubscriptionPackage[]>,

  buy: (packageId: string) =>
    fetch(`${API_BASE}/subscriptions/buy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ package_id: packageId }),
    }).then(handleResp) as Promise<Payment>,

  // Get current user's active subscription (returns 404 if none)
  getMySubscription: () =>
    fetch(`${API_BASE}/user/subscription`, {
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    }).then(handleResp) as Promise<UserSubscription>,
};

export const orders = {
  getQrMenu: (qrCode: string) =>
    fetch(`${API_BASE}/qr/${encodeURIComponent(qrCode)}`, {
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    }).then(handleResp) as Promise<Canteen & { menu_items: MenuItem[] }>,

  create: (payload: Partial<Order>) =>
    fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      if (res.status === 402) {
        const errBody = await res.json().catch(() => ({ detail: 'Payment required' }))
        const err = new Error(errBody.detail || 'Payment required') as any
        err.code = 'PAYMENT_REQUIRED'
        err.status = 402
        throw err
      }

      return handleResp(res) as Promise<Order>
    }),

  myOrders: () =>
    fetch(`${API_BASE}/orders/my`, {
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    }).then(handleResp) as Promise<Order[]>,
};

export const canteen = {
  orders: (status?: string) =>
    fetch(`${API_BASE}/canteen/orders${status ? `?status=${status}` : ''}`, {
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    }).then(handleResp) as Promise<Order[]>,

  patchOrder: (id: string, data: Partial<Order>) =>
    fetch(`${API_BASE}/canteen/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(data),
    }).then(handleResp) as Promise<Order>,

  createMenuItem: (payload: Partial<MenuItem>) =>
    fetch(`${API_BASE}/canteen/menu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(payload),
    }).then(handleResp) as Promise<MenuItem>,

  getMenu: () =>
    fetch(`${API_BASE}/canteen/menu`, {
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    }).then(handleResp) as Promise<MenuItem[]>,
};

export const admin = {
  users: () =>
    fetch(`${API_BASE}/admin/users`, {
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    }).then(handleResp) as Promise<User[]>,

  canteens: () =>
    fetch(`${API_BASE}/admin/canteens`, {
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    }).then(handleResp) as Promise<Canteen[]>,

  createCanteen: (payload: Partial<Canteen>) =>
    fetch(`${API_BASE}/admin/canteens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(payload),
    }).then(handleResp) as Promise<Canteen>,

  analytics: () =>
    fetch(`${API_BASE}/admin/analytics`, {
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    }).then(handleResp) as Promise<any>,
};

// Helpers
export function saveToken(tokenResp: TokenResponse) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('access_token', tokenResp.access_token);
  if (tokenResp.expires_in) {
    const expiresAt = Date.now() + tokenResp.expires_in * 1000
    localStorage.setItem('access_token_expires_at', String(expiresAt))
  }
}

export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('access_token');
  localStorage.removeItem('access_token_expires_at');
}