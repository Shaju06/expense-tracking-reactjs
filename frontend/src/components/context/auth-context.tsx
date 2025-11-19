// frontend/src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { apiFetch, buildUrl } from '../../lib/api';

type User = {
  id: string;
  email: string;
  name?: string | null;
};

type AuthState = {
  user: User | null;
  accessToken: string | null; // kept in memory for security
  loading: boolean;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    email: string;
    password: string;
    name?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  fetchWithAuth: (
    input: RequestInfo,
    init?: RequestInit,
  ) => Promise<any>;
  loading: boolean;
  getAccessToken: () => string | null;
};

const AuthContext = createContext<
  AuthContextValue | undefined
>(undefined);

function parseJwt(token: string) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/')),
    );
  } catch {
    return null;
  }
}

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    loading: true,
  });

  // keep refresh token in localStorage (so it persists across reload)
  const REFRESH_KEY = 'app_refresh_token_v1';
  const USER_KEY = 'app_user_v1';

  // scheduled refresh timer id
  const refreshTimer = useRef<number | null>(null);

  // one in-flight refresh promise to coalesce multiple calls
  const pendingRefresh = useRef<Promise<
    string | null
  > | null>(null);

  // helper: schedule proactive refresh (1 minute before expiry)
  const scheduleRefresh = (accessToken: string | null) => {
    if (!accessToken) return;
    const payload = parseJwt(accessToken);
    if (!payload || !payload.exp) return;
    const expiresAt = payload.exp * 1000;
    const now = Date.now();
    const refreshAt = Math.max(0, expiresAt - now - 60_000); // 1 minute before expiry
    if (refreshTimer.current) {
      window.clearTimeout(refreshTimer.current);
      refreshTimer.current = null;
    }
    refreshTimer.current = window.setTimeout(() => {
      // kick off refresh but don't await
      void refreshTokens();
    }, refreshAt) as unknown as number;
  };

  useEffect(() => {
    // restore user + refresh token from localStorage at app start
    const savedUser = localStorage.getItem(USER_KEY);
    const refreshToken = localStorage.getItem(REFRESH_KEY);

    if (savedUser && refreshToken) {
      try {
        const parsed = JSON.parse(savedUser) as User;
        setState((s) => ({ ...s, user: parsed }));
        // attempt to get a fresh access token at startup
        void refreshTokens()
          .then((newAccess) => {
            setState((s) => ({
              ...s,
              accessToken: newAccess,
              loading: false,
            }));
            scheduleRefresh(newAccess);
          })
          .catch(() => {
            // failed to refresh -> clear
            setState({
              user: null,
              accessToken: null,
              loading: false,
            });
            localStorage.removeItem(REFRESH_KEY);
            localStorage.removeItem(USER_KEY);
          });
      } catch {
        setState({
          user: null,
          accessToken: null,
          loading: false,
        });
        localStorage.removeItem(REFRESH_KEY);
        localStorage.removeItem(USER_KEY);
      }
    } else {
      setState((s) => ({ ...s, loading: false }));
    }

    return () => {
      if (refreshTimer.current)
        window.clearTimeout(refreshTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refreshTokens(): Promise<string | null> {
    // coalesce refresh attempts
    if (pendingRefresh.current)
      return pendingRefresh.current;

    const refreshToken = localStorage.getItem(REFRESH_KEY);
    if (!refreshToken) {
      return Promise.reject(new Error('No refresh token'));
    }

    const p = (async () => {
      try {
        const res = await apiFetch('/auth/refresh', {
          method: 'POST',
          body: JSON.stringify({ token: refreshToken }),
        });

        const { accessToken, refreshToken: newRefresh } =
          res as {
            accessToken: string;
            refreshToken?: string;
          };
        if (!accessToken)
          throw new Error('No access token from refresh');

        // rotate refresh token if provided
        if (newRefresh) {
          localStorage.setItem(REFRESH_KEY, newRefresh);
        }

        setState((s) => ({ ...s, accessToken }));
        scheduleRefresh(accessToken);
        return accessToken;
      } finally {
        pendingRefresh.current = null;
      }
    })();

    pendingRefresh.current = p;
    return p;
  }

  async function login(email: string, password: string) {
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    console.log('Login response:', res);
    // expected: { user, accessToken, refreshToken }
    const { user, accessToken, refreshToken } = res as {
      user: User;
      accessToken: string;
      refreshToken?: string;
    };

    setState({ user, accessToken, loading: false });
    if (refreshToken)
      localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    scheduleRefresh(accessToken);
  }

  async function register(payload: {
    email: string;
    password: string;
    name?: string;
  }) {
    const res = await plainFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const { user, accessToken, refreshToken } = res as {
      user: User;
      accessToken: string;
      refreshToken?: string;
    };

    setState({ user, accessToken, loading: false });
    if (refreshToken)
      localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    scheduleRefresh(accessToken);
  }

  async function logout() {
    // optionally notify backend
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    try {
      if (refreshToken) {
        await apiFetch('/auth/logout', {
          method: 'POST',
          body: JSON.stringify({ token: refreshToken }),
        });
      }
    } catch {
      // ignore errors
    }

    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
    if (refreshTimer.current) {
      window.clearTimeout(refreshTimer.current);
      refreshTimer.current = null;
    }
    setState({
      user: null,
      accessToken: null,
      loading: false,
    });
  }

  function getAccessToken() {
    return state.accessToken;
  }

  /**
   * fetchWithAuth: attaches access token; on 401 attempts refresh and retries once.
   * Accepts RequestInfo same as fetch.
   */
  async function fetchWithAuth(
    input: RequestInfo,
    init?: RequestInit,
  ) {
    // prepare request
    const url =
      typeof input === 'string'
        ? input
        : (input as Request).url;
    const path = url.startsWith('http')
      ? url
      : buildUrl((url as string) || '');
    const attempt = async (accessToken?: string | null) => {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      };
      if (accessToken)
        headers['Authorization'] = `Bearer ${accessToken}`;
      const res = await fetch(path, {
        ...init,
        headers,
        credentials: 'include',
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        let errMsg = text || res.statusText || 'API error';
        try {
          const json = JSON.parse(text || '{}');
          if (json?.error) errMsg = json.error;
        } catch {}
        const err: any = new Error(errMsg);
        err.status = res.status;
        throw err;
      }
      if (res.status === 204) return null;
      return res.json().catch(() => null);
    };

    // try with current token
    try {
      return await attempt(state.accessToken);
    } catch (err: any) {
      if (err?.status === 401) {
        try {
          const newAccess = await refreshTokens();
          return await attempt(newAccess);
        } catch (refreshErr) {
          // refresh failed -> logout
          await logout();
          throw new Error(
            'Session expired. Please login again.',
          );
        }
      }
      throw err;
    }
  }

  const value: AuthContextValue = {
    user: state.user,
    login,
    register,
    logout,
    fetchWithAuth,
    loading: state.loading,
    getAccessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error(
      'useAuth must be used within AuthProvider',
    );
  return ctx;
}
