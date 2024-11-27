import { Request, Response } from 'express';
import OrderValidationSchema from './order.zod.validation';
import { OrderService } from './order.service';
import { TProduct } from '../products/product.interface';

// Order a bikes
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = OrderValidationSchema.parse(req.body);
    const orderedProduct = await OrderService.getOrderedBikeFromDB(
      order.product,
    );

    if (!orderedProduct) {
      throw new Error('Product is not found');
    }
    const orderQuantity: number = (orderedProduct as TProduct).quantity;

    if (order.quantity > orderQuantity) {
      throw new Error('Insufficient stock.');
    }
    const newQuantity: number = orderQuantity - order.quantity;
    const inStock = newQuantity > 0;

    await OrderService.updateOrderBikeFromDB(order.product, {
      quantity: newQuantity,
      inStock,
    });

    const savedOrder = await OrderService.makeAOrderIntoDB(order);
    res.status(200).json({
      message: 'Bike Ordered successfully',
      status: true,
      data: savedOrder,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something Went Wrong!!',
      status: false,
      error: error.message || error,
      stack: new Error('Validation failed').stack,
    });
  }
};

// Get the all order revenue by aggregation
const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrderRevenue();
    if (!result) {
      throw new Error('Orders is not founded');
    }
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something Went Wrong!!',
      status: false,
      error: error.message || error,
      stack: new Error('Validation failed').stack,
    });
  }
};

export const OrderController = {
  createOrder,
  getTotalRevenue,
};
