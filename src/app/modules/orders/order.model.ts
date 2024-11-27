import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      trim: true,
      required: [true, 'email is required.'],
    },
    product: {
      type: String,
      trim: true,
      required: [true, 'Product Id is required.'],
    },
    quantity: {
      type: Number,
      trim: true,
      required: [true, 'Quantity is required.'],
      min: [0, 'Quantity must be a positive number'],
    },
    totalPrice: {
      type: Number,
      trim: true,
      required: [true, 'Total Price is required.'],
      min: [0, 'Total Price must be a positive number'],
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>('Order', orderSchema);
