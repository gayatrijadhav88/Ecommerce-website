import express from 'express';
import { createOrder, getOrder, myOrders } from '../controllers/order.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.post('/', createOrder);
router.get('/my', myOrders);
router.get('/:id', getOrder);

export default router;

