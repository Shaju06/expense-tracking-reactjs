const API_BASE = process.env.REACT_APP_API_URL || '/api';

export async function apiFetch(
  path: string,
  options: RequestInit = {},
) {
  const res = await fetch(API_BASE + path, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'API error');
  }

  return res.json();
}
