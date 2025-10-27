import { Router } from 'express';

import { AuthRouter } from '../modules/auth/auth.router';
import { userRoutes } from '../modules/user/user.route';
import { productRoutes } from '../modules/product/product.route';
import { purchaseRoutes } from '../modules/purchase/purchase.route';

const router = Router();

const moduleRoute = [
  {
    path: '/api/v1/users',
    router: userRoutes,
  },
  {
    path: '/api/v1',
    router: productRoutes,
  },
  {
    path: '/api/v1',
    router: purchaseRoutes,
  },
  {
    path: '/api/v1/auth',
    router: AuthRouter,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.router));

export default router;
