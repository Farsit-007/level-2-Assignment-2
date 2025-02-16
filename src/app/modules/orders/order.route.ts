import express from 'express';
import { OrderController } from './order.controller';
import OrderValidationSchema from './order.zod.validation';
import { validation } from '../../middleware/validation';

const router = express.Router();
router.post('/',validation(OrderValidationSchema), OrderController.createOrder);
router.get('/revenue', OrderController.getTotalRevenue);
export const OrderRoutes = router;
