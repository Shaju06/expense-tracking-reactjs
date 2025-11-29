const API_BASE = process.env.REACT_APP_API_URL || '/api';

export function buildUrl(path: string) {
  // If an absolute URL is provided, use it directly
  if (/^https?:\/\//i.test(path)) return path;
  // Ensure proper joining of base and path
  if (!path.startsWith('/')) path = `/${path}`;
  return `${API_BASE}${path}`;
}

/**
 * Basic fetch wrapper - does not attach auth.
 */
export async function apiFetch(
  path: string,
  opts: RequestInit = {},
) {
  const url = buildUrl(path);
  console.log('API Fetch URL:', url, path, 'opts');
  const finalOptions: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
    ...opts,
  };

  const res = await fetch(url, finalOptions);
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    // preserve existing error handling pattern if different
    throw data || new Error(res.statusText);
  }
  return data;
}
