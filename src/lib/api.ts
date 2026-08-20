import { User } from '../types';

interface AuthResponse { token: string; user: User; }
interface CurrentUserResponse { user: User; }

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');
const API_BASE_URL = configuredBaseUrl ?? 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { Accept: 'application/json', ...options.headers }
  });
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = typeof body === 'object' && body !== null && 'message' in body && typeof body.message === 'string'
      ? body.message
      : 'Request failed';
    throw new ApiError(message, response.status);
  }
  return body as T;
};

export const authApi = {
  login: (email: string, password: string) => request<AuthResponse>('/auth/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password })
  }),
  register: (name: string, email: string, password: string) => request<AuthResponse>('/auth/register', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: name, email, password })
  }),
  getCurrentUser: (token: string) => request<CurrentUserResponse>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  })
};

export { ApiError };
