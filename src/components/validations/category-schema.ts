import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .min(6, 'Category name must be at least 6 characters'),
  color: z.string().min(1, 'Color is required'),
  description: z.string().optional(),
});

export type CategoryFormType = z.infer<
  typeof categorySchema
>;
