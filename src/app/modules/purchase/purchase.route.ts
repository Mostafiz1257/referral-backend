import express from 'express';
import { simulatePurchase } from './purchase.controller';

const router = express.Router();

router.post('/purchase', simulatePurchase);

export const purchaseRoutes = router;
