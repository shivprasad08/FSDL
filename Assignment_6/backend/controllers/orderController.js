import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const normalizeOrderItems = async (items) => {
  const normalizedItems = [];

  for (const item of items) {
    const productId = item.productId || item.product;
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error(`Product not found: ${productId}`);
    }

    const quantity = Number(item.quantity || 1);
    const size = item.size;

    if (!size) {
      throw new Error(`Size is required for product: ${product.name}`);
    }

    if (product.availableSizes?.length && !product.availableSizes.includes(size)) {
      throw new Error(`Size ${size} is not available for ${product.name}`);
    }

    if (quantity < 1) {
      throw new Error(`Invalid quantity for ${product.name}`);
    }

    if (product.stock < quantity) {
      throw new Error(`Insufficient stock for ${product.name}`);
    }

    const unitPrice = Number(product.price);
    const lineTotal = unitPrice * quantity;

    normalizedItems.push({
      product: product._id,
      shoeName: product.name,
      imageUrl: product.imageUrl,
      size,
      quantity,
      unitPrice,
      lineTotal,
      stockToReduce: quantity,
    });
  }

  return normalizedItems;
};

export const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, shippingAddress } = req.body;

    let orderInputItems = items;

    if (!orderInputItems || !orderInputItems.length) {
      const user = await User.findById(userId).populate('cart.product');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      orderInputItems = user.cart.map((cartItem) => ({
        productId: cartItem.product?._id,
        quantity: cartItem.quantity,
        size: cartItem.size,
      }));
    }

    if (!orderInputItems.length) {
      return res.status(400).json({ message: 'No items provided for order' });
    }

    const normalizedItems = await normalizeOrderItems(orderInputItems);

    for (const item of normalizedItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.stockToReduce },
      });
    }

    const orderItems = normalizedItems.map(({ stockToReduce, ...rest }) => rest);
    const totalAmount = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      currency: 'INR',
      status: 'pending',
    });

    await User.findByIdAndUpdate(userId, { $set: { cart: [] } });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.userId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
