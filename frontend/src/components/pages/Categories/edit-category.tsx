import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Button from '../../ui/button';
import Input from '../../ui/input';
import Textarea from '../../ui/textarea';
import {
  CategoryFormType,
  categorySchema,
} from '../../validations/category-schema';

export default function EditCategoryForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: CategoryFormType;
  onSubmit: (data: CategoryFormType) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormType>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });

  return (
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
        <label className="block text-sm mb-1">Color</label>
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

      <Button type="submit">Save Changes</Button>
    </form>
  );
}
