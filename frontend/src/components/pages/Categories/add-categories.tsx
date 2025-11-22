import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateCategory } from '../../../api/categories';
import PageWrapper from '../../layout/page-wrapper';
import Button from '../../ui/button';
import Card from '../../ui/card';
import Input from '../../ui/input';
import Textarea from '../../ui/textarea';
import {
  CategoryFormType,
  categorySchema,
} from '../../validations/category-schema';

export default function AddCategory() {
  const createCategory = useCreateCategory();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CategoryFormType>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = (data: CategoryFormType) => {
    // addCategory(data);
    setError('');
    createCategory.mutate(data, {
      onSuccess: () => {
        reset();
        navigate('/categories');
      },
      onError: (e: any) => setError(e.message),
    });
  };

  return (
    <PageWrapper>
      <Card className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          Add Category
        </h2>
        {error && (
          <p className="bg-red-600 text-white p-2 rounded mb-2 text-sm">
            {error}
          </p>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm mb-1">
              Name
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
              className="w-20 h-10 p-0 border-0"
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
            <Textarea
              {...register('description')}
              rows={3}
            />
          </div>

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Saving...' : 'Add Category'}
          </Button>
        </form>
      </Card>
    </PageWrapper>
  );
}
