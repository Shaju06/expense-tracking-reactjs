import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../components/context/auth-context';

export function useLastSixSummary() {
  const { fetchWithAuth } = useAuth();

  return useQuery({
    queryKey: ['last6'],
    queryFn: () => fetchWithAuth(`/api/summary/last6`),
  });
}
