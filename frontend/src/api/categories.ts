import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useAuth } from '../components/context/auth-context';

export function useCategories() {
  const { fetchWithAuth } = useAuth();

  return useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchWithAuth('/api/categories'),
  });
}

export function useCreateCategory() {
  const { fetchWithAuth } = useAuth();
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetchWithAuth('/api/categories', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });
}

export function useUpdateCategory() {
  const { fetchWithAuth } = useAuth();
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: any) =>
      fetchWithAuth(`/api/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ['categories'],
      }),
  });
}

export function useDeleteCategory() {
  const { fetchWithAuth } = useAuth();
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetchWithAuth(`/api/categories/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ['categories'],
      }),
  });
}
