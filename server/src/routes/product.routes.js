import express from 'express';
import {
  getCategories,
  getProduct,
  getSimilarProducts,
  listProducts
} from '../controllers/product.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

const optionalAuth = (req, res, next) => {
  if (!req.headers.authorization) return next();
  return protect(req, res, next);
};

router.get('/', listProducts);
router.get('/categories', getCategories);
router.get('/:id', optionalAuth, getProduct);
router.get('/:id/similar', getSimilarProducts);

export default router;

