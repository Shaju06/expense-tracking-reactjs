import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../context/category-context';
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
  const { addCategory } = useCategories();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      color: '#6366F1',
      description: '',
    },
  });

  const onSubmit = (data: CategoryFormType) => {
    addCategory(data);
    reset();
    navigate('/categories');
  };

  return (
    <PageWrapper>
      <Card className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          Add Category
        </h2>
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

          <Button type="submit">Add Category</Button>
        </form>
      </Card>
    </PageWrapper>
  );
}
