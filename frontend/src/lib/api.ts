const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://sicillian-2.onrender.com/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> ?? {}),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const isJson = res.headers.get('content-type')?.includes('application/json');

  if (!res.ok) {
    if (isJson) {
      const data = await res.json();
      const message =
        data?.detail ||
        data?.non_field_errors?.[0] ||
        Object.values(data as Record<string, string[]>)?.[0]?.[0] ||
        'Request failed';
      throw new Error(message);
    }
    throw new Error(`Server error ${res.status}: ${res.statusText || 'unexpected response'}`);
  }

  if (!isJson) {
    throw new Error(`Expected JSON but got ${res.headers.get('content-type') ?? 'unknown content type'}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(endpoint: string) =>
    request<T>(endpoint),

  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),

  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
};
