export const API_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.DEV ? 'http://localhost:8000' : 'https://api.intubemedia.com/website-cms'
);

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('admin_token');
  const publicAuthPaths = ['/api/auth/login', '/api/auth/forgot-password', '/api/auth/reset-password'];
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (res.status === 401 && token && !publicAuthPaths.includes(path)) {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(err.detail || 'Request failed');
  }
  return res.json();
}

export const api = {
  get: (path: string) => request(path),
  post: (path: string, data: unknown) => request(path, { method: 'POST', body: JSON.stringify(data) }),
  put: (path: string, data: unknown) => request(path, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (path: string) => request(path, { method: 'DELETE' }),
};

export async function uploadImage(file: File): Promise<string> {
  const token = localStorage.getItem('admin_token');
  const body = new FormData();
  body.append('file', file);
  const res = await fetch(`${API_URL}/api/uploads`, {
    method: 'POST',
    body,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Upload failed' }));
    throw new Error(err.detail || 'Upload failed');
  }
  const data = await res.json();
  return data.path as string;
}
