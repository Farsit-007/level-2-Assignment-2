import { Types } from 'mongoose';

export type TOrder = {
  email: string;
  name: string;
  product: Types.ObjectId;
  productImage: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};
