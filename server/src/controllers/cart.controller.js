import asyncHandler from '../utils/asyncHandler.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const getPopulatedCart = (userId) =>
  Cart.findOne({ user: userId }).populate('items.product');

export const getCart = asyncHandler(async (req, res) => {
  let cart = await getPopulatedCart(req.user._id);
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
  res.json(cart);
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  const cart = (await Cart.findOne({ user: req.user._id })) || new Cart({ user: req.user._id, items: [] });
  const item = cart.items.find((entry) => entry.product.toString() === productId);
  if (item) item.quantity += Number(quantity);
  else cart.items.push({ product: productId, quantity: Number(quantity) });
  await cart.save();
  res.json(await getPopulatedCart(req.user._id));
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.json({ user: req.user._id, items: [] });
  const item = cart.items.find((entry) => entry.product.toString() === req.params.productId);
  if (item) item.quantity = Math.max(1, Number(req.body.quantity || 1));
  await cart.save();
  res.json(await getPopulatedCart(req.user._id));
});

export const removeCartItem = asyncHandler(async (req, res) => {
  await Cart.updateOne({ user: req.user._id }, { $pull: { items: { product: req.params.productId } } });
  res.json(await getPopulatedCart(req.user._id));
});

export const clearCart = asyncHandler(async (req, res) => {
  await Cart.updateOne({ user: req.user._id }, { $set: { items: [] } }, { upsert: true });
  res.json({ message: 'Cart cleared' });
});

