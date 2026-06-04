import asyncHandler from '../utils/asyncHandler.js';
import Wishlist from '../models/Wishlist.js';

export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
  res.json(wishlist || { user: req.user._id, products: [] });
});

export const toggleWishlist = asyncHandler(async (req, res) => {
  const wishlist = (await Wishlist.findOne({ user: req.user._id })) || new Wishlist({ user: req.user._id, products: [] });
  const exists = wishlist.products.some((product) => product.toString() === req.body.productId);
  wishlist.products = exists
    ? wishlist.products.filter((product) => product.toString() !== req.body.productId)
    : [...wishlist.products, req.body.productId];
  await wishlist.save();
  res.json(await Wishlist.findOne({ user: req.user._id }).populate('products'));
});

