import { OrderService } from './order.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
// Order a bikes
const createOrder = catchAsync(async (req, res) => {
  const result = await OrderService.getOrderedBikeFromDB(req.body, req.ip!);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product ordered Successfully',
    data: result,
  });
});

// Get the all order revenue by aggregation
const getTotalRevenue = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrderRevenue();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved Successfully',
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderService.verifyPaymentDB(
    req.query.order_id as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order verified successfully',
    data: order,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const order = await OrderService.getOrders();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: order,
  });
});

const getUserOrder = catchAsync(async (req, res) => {
  const order = await OrderService.getUserOrder(req.params.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: order,
  });
});

export const OrderController = {
  createOrder,
  verifyPayment,
  getTotalRevenue,
  getOrders,
  getUserOrder,
};
