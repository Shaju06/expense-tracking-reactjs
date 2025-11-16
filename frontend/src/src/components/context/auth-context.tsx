import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthCtx {
  isAuthenticated: boolean;
  login: (
    username: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => void;
  user?: { username: string } | null;
}

const AuthContext = createContext<AuthCtx | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(() => {
      return localStorage.getItem('auth') === 'true';
    });
  const [user, setUser] = useState<{
    username: string;
  } | null>(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (isAuthenticated)
      localStorage.setItem('auth', 'true');
    else localStorage.removeItem('auth');
  }, [isAuthenticated]);

  const login = async (
    username: string,
    password: string,
  ) => {
    // Mock auth: admin / 1234 — replace with API later
    if (username === 'admin' && password === '1234') {
      setIsAuthenticated(true);
      setUser({ username });
      localStorage.setItem(
        'user',
        JSON.stringify({ username }),
      );
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthCtx => {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error(
      'useAuth must be used within AuthProvider',
    );
  return ctx;
};
