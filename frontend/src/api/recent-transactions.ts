import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../components/context/auth-context';

export function useRecentExpenses(limit = 10) {
  const { fetchWithAuth } = useAuth();
  return useQuery({
    queryKey: ['recent-expenses', limit],
    queryFn: () =>
      fetchWithAuth(`/api/expenses?limit=${limit}`),
  });
}
