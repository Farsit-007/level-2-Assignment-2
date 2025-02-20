import { z } from 'zod';

export const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Please provide a Name' }),
    email: z
      .string({ required_error: 'Please provide a Email' })
      .email('Please provide a valid Email'),
    password: z.string({ required_error: 'Please provide a password' }),
    phone: z.string({ required_error: 'Please provide a phone' }),
    city: z.string({ required_error: 'Please provide a city' }),
    address: z.string({ required_error: 'Please provide a address' }),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    isBlock: z.boolean(),
  }),
});
