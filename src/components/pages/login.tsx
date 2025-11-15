import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import PageWrapper from '../layout/page-wrapper';
import Button from '../ui/button';
import Input from '../ui/input';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);

    if (!ok) {
      setError('Invalid credentials (use admin / 1234)');
    }
  };

  console.log('Rerendering Login Page');

  return (
    <PageWrapper>
      <div className="max-w-md mx-auto mt-12">
        <div className="bg-card-dark rounded-xl p-8 border border-border-dark">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome Back
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="text-sm">Username</label>
              <Input
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="admin"
              />
            </div>

            <div>
              <label className="text-sm">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="1234"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">
                {error}
              </p>
            )}

            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
