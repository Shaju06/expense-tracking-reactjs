import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import PageWrapper from '../layout/page-wrapper';
import Button from '../ui/button';
import Input from '../ui/input';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err: any) {
      alert(err.message || 'Login failed');
    } finally {
      setBusy(false);
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
              <label className="text-sm">Email</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
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

            <Button type="submit" disabled={busy}>
              {' '}
              {busy ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
