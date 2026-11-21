import { API_URL } from './api';

export const PARTNER_TOKEN_KEY = 'partner_token';

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem(PARTNER_TOKEN_KEY);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }));
    const detail = Array.isArray(err.detail) ? 'Please check the highlighted fields' : err.detail;
    const error = new Error(detail || 'Request failed') as Error & { status?: number };
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export const partnerApi = {
  get: (path: string) => request(path),
  post: (path: string, data: unknown) => request(path, { method: 'POST', body: JSON.stringify(data) }),
};
