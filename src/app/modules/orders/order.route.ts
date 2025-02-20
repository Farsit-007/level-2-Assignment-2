import express from 'express';
import { OrderController } from './order.controller';
import OrderValidationSchema from './order.zod.validation';
import { validation } from '../../middleware/validation';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();
router.get(
  '/verify',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  OrderController.verifyPayment,
);
router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validation(OrderValidationSchema),
  OrderController.createOrder,
);
router.get('/', auth(USER_ROLE.admin), OrderController.getOrders);
router.get(
  '/:email',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  OrderController.getUserOrder,
);

router.get('/revenue', auth(USER_ROLE.admin), OrderController.getTotalRevenue);
export const OrderRoutes = router;
