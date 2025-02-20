import express from 'express';
import { validation } from '../../middleware/validation';
import {
  profileValidationSchema,
  updateUserValidationSchema,
  userValidationSchema,
} from './user.zod.validation';
import { UserController } from './user.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();
router.post('/', validation(userValidationSchema), UserController.createUser);
router.get('/', auth(USER_ROLE.admin), UserController.getAllUser);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validation(updateUserValidationSchema),
  UserController.updateUser,
);
router.get(
  '/:email',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  UserController.getSingleUser,
);
router.patch(
  '/profile/:email',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validation(profileValidationSchema),
  UserController.updateProfileUser,
);

export const UserRoutes = router;
