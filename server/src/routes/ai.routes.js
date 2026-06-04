import express from 'express';
import { chat, recommendations, semanticSearch } from '../controllers/ai.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.get('/recommendations', recommendations);
router.get('/search', semanticSearch);
router.post('/chat', chat);

export default router;

