import { Product } from '../products/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

// Find Product from DB by ordered product ID
const getOrderedBikeFromDB = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

// When ordered the product update the quantity/isStock
const updateOrderBikeFromDB = async (
  productId: string,
  updates: Partial<{ quantity: number; inStock: boolean }>,
) => {
  const result = await Product.findByIdAndUpdate(
    productId,
    { $set: updates },
    { new: true },
  );
  return result;
};

// Create order 
const makeAOrderIntoDB = async (orderInfo: TOrder) => {
  const result = await Order.create(orderInfo);
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
  updateOrderBikeFromDB,
  makeAOrderIntoDB,
  getAllOrderRevenue,
};
