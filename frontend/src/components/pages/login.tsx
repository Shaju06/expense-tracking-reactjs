import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import PageWrapper from '../layout/page-wrapper';
import Button from '../ui/button';
import Input from '../ui/input';
import {
  LoginForm,
  loginSchema,
} from '../validations/login-scheama';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  async function onSubmit(data: LoginForm) {
    setApiError('');
    try {
      await login(data.email, data.password);
      navigate('/', { replace: true });
    } catch (e: any) {
      setApiError(e.message || 'Login failed');
    }
  }

  return (
    <PageWrapper>
      <div className="max-w-md mx-auto mt-12">
        <div className="bg-card-dark rounded-xl p-8 border border-border-dark">
          <h2 className="text-2xl font-semibold mb-4">
            Sign In
          </h2>
          {apiError && (
            <p className="bg-red-600 text-white p-2 rounded mb-3 text-sm">
              {apiError}
            </p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <label className="text-sm">Email</label>
              <Input
                type="email"
                {...register('email')}
                placeholder="email"
              />
              {errors.email && (
                <span className="text-red-400 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="text-sm">Password</label>
              <Input
                type="password"
                {...register('password')}
                placeholder="password"
              />
              {errors.password && (
                <span className="text-red-400 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {' '}
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
