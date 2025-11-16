import { apiFetch } from '../lib/api';

export const AuthAPI = {
  login: (email: string, password: string) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (data: {
    email: string;
    password: string;
    name?: string;
  }) =>
    apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  refresh: (token: string) =>
    apiFetch('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),

  logout: (token: string) =>
    apiFetch('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
};
