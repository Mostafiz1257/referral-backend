import express from 'express';
import {
  createProduct,
  getProductById,
  getProducts,
} from './product.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getProducts);
router.get('/products/:id', auth(USER_ROLE.user), getProductById);

export const productRoutes = router;
