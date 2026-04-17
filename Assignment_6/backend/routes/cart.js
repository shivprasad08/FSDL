import express from 'express';
import {
  addToCart,
  getCart,
  getMyCart,
  removeFromCart,
} from '../controllers/cartController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, addToCart);
router.get('/me', auth, getMyCart);
router.get('/:userId', getCart);
router.delete('/', auth, removeFromCart);

export default router;
