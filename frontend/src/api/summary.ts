import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../components/context/auth-context';

export function useSummary(month: string) {
  const { fetchWithAuth } = useAuth();

  return useQuery({
    queryKey: ['summary', month],
    queryFn: () =>
      fetchWithAuth(`/api/summary?month=${month}`),
    enabled: !!month,
  });
}
