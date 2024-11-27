import { z } from 'zod';

const OrderValidationSchema = z.object({
  email: z.string().email('Invalid email address.'),
  product: z.string().trim().min(1, 'Product Id is required.'),
  quantity: z.number().int().min(0, 'Quantity must be a positive number'),
  totalPrice: z.number().min(0, 'Total Price must be a positive number'),
});

export default OrderValidationSchema;
