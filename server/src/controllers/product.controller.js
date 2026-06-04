import asyncHandler from '../utils/asyncHandler.js';
import Product from '../models/Product.js';
import BrowsingHistory from '../models/BrowsingHistory.js';

export const listProducts = asyncHandler(async (req, res) => {
  const { search = '', category = '', min = 0, max = 1000000, sort = 'createdAt', page = 1 } = req.query;
  const limit = 12;
  const filter = {
    price: { $gte: Number(min), $lte: Number(max) }
  };
  if (category) filter.category = category;
  if (search) filter.$text = { $search: search };

  const skip = (Number(page) - 1) * limit;
  const [products, total] = await Promise.all([
    Product.find(filter).sort(sort === 'price' ? { price: 1 } : { createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filter)
  ]);
  res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  if (req.user) {
    await BrowsingHistory.create({ user: req.user._id, product: product._id });
  }
  res.json(product);
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category');
  res.json(categories);
});

export const getSimilarProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  const products = await Product.find({
    _id: { $ne: product._id },
    $or: [{ category: product.category }, { tags: { $in: product.tags } }]
  }).limit(8);
  res.json(products);
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  res.json({ message: 'Product deleted' });
});

