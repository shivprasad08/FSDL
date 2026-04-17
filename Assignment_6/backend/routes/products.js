import express from 'express';
import {
  getAllProducts,
  getPopularProducts,
  getNewArrivals,
  getProductById,
  createProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/popular', getPopularProducts);
router.get('/new', getNewArrivals);
router.get('/:id', getProductById);
router.post('/', createProduct);

export default router;
