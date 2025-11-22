import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../../api/categories';
import { useCreateExpense } from '../../../api/expenses';
import PageWrapper from '../../layout/page-wrapper';
import Button from '../../ui/button';
import Card from '../../ui/card';
import Input from '../../ui/input';
import Textarea from '../../ui/textarea';
import {
  ExpenseFormType,
  expenseSchema,
} from '../../validations/expense-schema';

export default function AddExpense() {
  const { data: categories } = useCategories();
  const createExpense = useCreateExpense();
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = (data: ExpenseFormType) => {
    setError('');
    createExpense.mutate(data, {
      onSuccess: () => navigate('/'),
      onError: (e: any) => setError(e.message),
    });
  };

  return (
    <PageWrapper>
      <Card className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          Add Expense
        </h2>
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
              Category
            </label>
            <select
              {...register('categoryId')}
              className="w-full px-3 py-2 rounded-md bg-surface-dark border border-border-dark"
            >
              <option value="">Select category</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-400 text-sm mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">
              Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="in"
                  {...register('type')}
                />
                <span>Cash In</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="out"
                  {...register('type')}
                />
                <span>Cash Out</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Amount
            </label>
            <Input
              type="number"
              {...register('amount', {
                valueAsNumber: true,
              })}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Date
            </label>

            <input
              {...register('date')}
              type="date"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />

            {errors.date && (
              <p className="text-red-400 text-sm mt-1">
                {errors.date.message}
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
            {' '}
            {isSubmitting ? 'Saving...' : 'Add Expense'}
          </Button>
        </form>
      </Card>
    </PageWrapper>
  );
}
