import { z } from 'zod';

const zodProductSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }).trim(),
  brand: z.string().min(1, { message: 'Brand is required.' }).trim(),
  price: z.number().min(0, { message: 'Price must be a positive number.' }),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
    errorMap: () => ({
      message:
        "Category must be one of 'Mountain', 'Road', 'Hybrid', 'Electric'.",
    }),
  }),
  description: z
    .string()
    .min(30, { message: 'Description must be at least 30 characters long.' })
    .trim(),
  quantity: z
    .number()
    .int()
    .min(0, { message: 'Quantity must be a positive number.' }),
  inStock: z.boolean({ required_error: 'InStock is required.' }),
});

export default zodProductSchema;
