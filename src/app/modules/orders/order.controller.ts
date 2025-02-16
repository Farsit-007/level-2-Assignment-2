import { OrderService } from './order.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
// Order a bikes
const createOrder = catchAsync(async (req, res) => {
  const result = await OrderService.getOrderedBikeFromDB(req.body);
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

export const OrderController = {
  createOrder,
  getTotalRevenue,
};
