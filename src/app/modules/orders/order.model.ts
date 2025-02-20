import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      trim: true,
      required: [true, 'email is required.'],
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'name is required.'],
    },
    product: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: [true, 'Product Id is required.'],
    },
    productName: {
      type: String,
      trim: true,
      required: [true, 'Product Name is required.'],
    },
    productImage: {
      type: String,
      trim: true,
      required: [true, 'Product Image is required.'],
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
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>('Order', orderSchema);
