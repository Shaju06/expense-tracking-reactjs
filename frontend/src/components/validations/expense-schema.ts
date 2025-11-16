import { z } from 'zod';

export const expenseSchema = z.object({
  categoryId: z.string().min(1, 'Category is required'),
  type: z.enum(['in', 'out']),
  amount: z
    .number()
    .positive('Amount should be greater than 0'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().optional(),
});

export type ExpenseFormType = z.infer<typeof expenseSchema>;
