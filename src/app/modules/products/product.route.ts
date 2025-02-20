import express from 'express';
import { ProductController } from './product.controller';
import { validation } from '../../middleware/validation';
import {
  updateProductSchema,
  zodProductSchema,
} from './product.zod.validation';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();
router.post('/', validation(zodProductSchema), ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/featured', ProductController.featuredProduct);
router.get('/:productId', ProductController.getSingleBike);
router.patch(
  '/:productId',
  auth(USER_ROLE.admin),
  validation(updateProductSchema),
  ProductController.updateSingleBike,
);
router.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  ProductController.deleteSingleBike,
);
export const ProductRoutes = router;
