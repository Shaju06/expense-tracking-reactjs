import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useAuth } from '../components/context/auth-context';

export function useCreateExpense() {
  const { fetchWithAuth } = useAuth();
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchWithAuth('/api/expenses', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['summary'] });
      client.invalidateQueries({
        queryKey: ['recent-expenses'],
      });
    },
  });
}
