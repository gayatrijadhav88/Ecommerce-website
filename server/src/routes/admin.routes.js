import express from 'express';
import { analytics, listOrders, listUsers, updateOrderStatus } from '../controllers/admin.controller.js';
import { createProduct, deleteProduct, updateProduct } from '../controllers/product.controller.js';
import { authorize, protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect, authorize('admin'));
router.get('/analytics', analytics);
router.get('/users', listUsers);
router.get('/orders', listOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;

