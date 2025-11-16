import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../context/category-context';
import { useExpenses } from '../../context/expense-context';
import PageWrapper from '../../layout/page-wrapper';
import Button from '../../ui/button';
import Card from '../../ui/card';
import DatePicker from '../../ui/date-picker';
import Input from '../../ui/input';
import Textarea from '../../ui/textarea';
import {
  ExpenseFormType,
  expenseSchema,
} from '../../validations/expense-schema';

export default function AddExpense() {
  const { categories } = useCategories();
  const { addExpense } = useExpenses();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      categoryId: '',
      type: 'out',
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      description: '',
    },
  });

  const onSubmit = (data: ExpenseFormType) => {
    addExpense(data);
    navigate('/');
  };

  return (
    <PageWrapper>
      <Card className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          Add Expense
        </h2>

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
              {categories.map((c) => (
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

            <DatePicker
              value={watch('date')}
              onChange={(val) =>
                setValue('date', val, {
                  shouldValidate: true,
                })
              }
              name="date"
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

          <Button type="submit">Save Expense</Button>
        </form>
      </Card>
    </PageWrapper>
  );
}
