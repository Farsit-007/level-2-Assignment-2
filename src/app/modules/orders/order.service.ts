import AppError from '../../Errors/AppError';
import { TProduct } from '../products/product.interface';
import { Product } from '../products/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import httpStatus from 'http-status'
// Find Product from DB by ordered product ID
const getOrderedBikeFromDB = async (order : TOrder) => {
  const product = await Product.findById(order.product)
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND,'Product is not found');
  }
  const orderQuantity: number = (product as TProduct).quantity;

  if (order.quantity > orderQuantity) {
    throw new AppError(httpStatus.NOT_EXTENDED,'Insufficient stock.');
  }
  const newQuantity: number = orderQuantity - order.quantity;
  const inStock = newQuantity > 0;
  const updates = {
    quantity: newQuantity,
    inStock,
  }

  const result = await Order.create(order);
  if(result){
    await Product.findByIdAndUpdate(
      product,
      { $set: updates },
      { new: true },
    );
  }
  return result;
};


// Get the revenue of order
const getAllOrderRevenue = async () => {
  const result = await Order.aggregate([
    {
      $addFields: {
        product: { $toObjectId: "$product" }, 
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
    { $unwind: "$productData" }, 
    {
      $addFields: {
        calculatedTotalPrice: {
          $multiply: ["$productData.price", "$quantity"],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$calculatedTotalPrice" },
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
};
