import { Router } from 'express';
import { ProductRoutes } from '../products/product.route';
import { OrderRoutes } from '../orders/order.route';
import { UserRoutes } from '../user/user.route';
import { AuthRoutes } from '../Auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
