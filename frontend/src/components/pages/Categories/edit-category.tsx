import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateCategory } from '../../../api/categories';
import Button from '../../ui/button';
import Input from '../../ui/input';
import Textarea from '../../ui/textarea';
import {
  CategoryFormType,
  categorySchema,
} from '../../validations/category-schema';

type Category = CategoryFormType & { id: string };

export default function EditCategoryForm({
  category,
  setEditOpen,
}: {
  category: Category;
  setEditOpen: any;
}) {
  const updateCategory = useUpdateCategory();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormType>({
    resolver: zodResolver(categorySchema),
    defaultValues: category,
  });

  const onSubmit = (data: CategoryFormType) => {
    setError('');
    updateCategory.mutate(
      { id: category.id, ...data },
      {
        onSuccess: () => setEditOpen(false),
        onError: (e: any) => setError(e.message),
      },
    );
  };

  return (
    <>
      {error && (
        <p className="bg-red-600 p-2 rounded text-sm mb-2">
          {error}
        </p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm mb-1">
            Category Name
          </label>
          <Input {...register('name')} />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">
            Color
          </label>
          <input
            type="color"
            {...register('color')}
            className="w-20 h-10 rounded"
          />
          {errors.color && (
            <p className="text-red-400 text-sm mt-1">
              {errors.color.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">
            Description
          </label>
          <Textarea {...register('description')} rows={3} />
        </div>

        <Button type="submit">
          {' '}
          {isSubmitting ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </>
  );
}
