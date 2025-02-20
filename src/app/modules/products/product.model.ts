import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'First Name is required.'],
    },
    brand: {
      type: String,
      trim: true,
      required: [true, 'Brand is required.'],
    },
    image: {
      type: String || File,
      trim: true,
      required: [true, 'Image is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      trim: true,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        message:
          "The category must be one of 'Mountain', 'Road', 'Hybrid', 'Electric'.'{VALUE}' is not a valid category.",
      },
      required: [true, 'Category is required.'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Description is required.'],
      minLength: [30, 'Description will be greater then 30 character'],
    },
    quantity: {
      type: Number,
      required: [true, 'quantity is required.'],
      min: [0, 'Quantity must be a positive number'],
    },
    inStock: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('Product', productSchema);
