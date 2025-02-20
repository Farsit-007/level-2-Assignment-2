import AppError from '../../Errors/AppError';
import { TProduct } from '../products/product.interface';
import { Product } from '../products/product.model';
import { User } from '../user/user.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import httpStatus from 'http-status';
import { orderUtils } from './order.utils';
// Find Product from DB by ordered product ID
const getOrderedBikeFromDB = async (order: TOrder, client_ip: string) => {
  const product = await Product.findById(order.product);
  const user = await User.isUserExists(order.email);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product is not found');
  }
  const orderQuantity: number = (product as TProduct).quantity;

  if (order.quantity > orderQuantity) {
    throw new AppError(httpStatus.NOT_EXTENDED, 'Insufficient stock.');
  }
  const newQuantity: number = orderQuantity - order.quantity;
  const inStock = newQuantity > 0;
  const updates = {
    quantity: newQuantity,
    inStock,
  };

  let result;

  result = await Order.create(order);
  if (result) {
    await Product.findByIdAndUpdate(product, { $set: updates }, { new: true });
  }

  const shurjopayPayload = {
    amount: order.totalPrice,
    order_id: result._id,
    currency: 'USD',
    customer_name: user!.name,
    customer_email: user!.email,
    customer_city: user!.city,
    customer_phone: user!.phone,
    customer_address: user!.address,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  console.log(payment);

  if (payment?.transactionStatus) {
    result = await Order.findOneAndUpdate(
      { _id: result._id },
      {
        $set: {
          'transaction.id': payment.sp_order_id,
          'transaction.transactionStatus': payment.transactionStatus,
        },
      },
      { new: true },
    );
  }

  return payment.checkout_url;
};

const verifyPaymentDB = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

const getOrders = async () => {
  const data = await Order.find();
  return data;
};

const getUserOrder = async (email: string) => {
  const data = await Order.find({ email });
  return data;
};

// Get the revenue of order
const getAllOrderRevenue = async () => {
  const result = await Order.aggregate([
    {
      $addFields: {
        product: { $toObjectId: '$product' },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'productData',
      },
    },
    { $unwind: '$productData' },
    {
      $addFields: {
        calculatedTotalPrice: {
          $multiply: ['$productData.price', '$quantity'],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$calculatedTotalPrice' },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  return result;
};

export const OrderService = {
  getOrderedBikeFromDB,
  getAllOrderRevenue,
  verifyPaymentDB,
  getOrders,
  getUserOrder,
};
