import { z } from 'zod';

const OrderValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address.'),
    product: z.string().trim().min(1, 'Product Id is required.'),
    productName: z.string().trim(),
    productImage: z.string().trim(),
    quantity: z.number().int().min(0, 'Quantity must be a positive number'),
    totalPrice: z.number().min(0, 'Total Price must be a positive number'),
    status: z
      .enum(['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'])
      .default('Pending'),
    transaction: z
      .object({
        id: z.string().optional(),
        transactionStatus: z.string().optional(),
        bank_status: z.string().optional(),
        sp_code: z.string().optional(),
        sp_message: z.string().optional(),
        method: z.string().optional(),
        date_time: z.string().optional(),
      })
      .optional(),
  }),
});

export default OrderValidationSchema;
