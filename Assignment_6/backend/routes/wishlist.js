import express from 'express';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../controllers/wishlistController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, addToWishlist);
router.get('/:userId', getWishlist);
router.delete('/', auth, removeFromWishlist);

export default router;
