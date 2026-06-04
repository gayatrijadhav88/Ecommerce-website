import axios from 'axios';
import asyncHandler from '../utils/asyncHandler.js';
import Product from '../models/Product.js';
import BrowsingHistory from '../models/BrowsingHistory.js';

const productPayload = (product) => ({
  id: product._id.toString(),
  name: product.name,
  brand: product.brand,
  category: product.category,
  description: product.description,
  price: product.discountPrice || product.price,
  rating: product.rating,
  tags: product.tags || [],
  image: product.images?.[0]
});

export const recommendations = asyncHandler(async (req, res) => {
  const [products, history] = await Promise.all([
    Product.find().limit(200),
    BrowsingHistory.find({ user: req.user._id }).sort({ viewedAt: -1 }).limit(20).populate('product')
  ]);
  const response = await axios.post(`${process.env.AI_RECOMMENDATION_URL || 'http://localhost:8001'}/recommend`, {
    products: products.map(productPayload),
    history: history.filter((entry) => entry.product).map((entry) => productPayload(entry.product)),
    limit: Number(req.query.limit || 8)
  });
  res.json(response.data);
});

export const semanticSearch = asyncHandler(async (req, res) => {
  const products = await Product.find().limit(500);
  const response = await axios.post(`${process.env.AI_SEARCH_URL || 'http://localhost:8002'}/search`, {
    query: req.query.q || req.body.query || '',
    products: products.map(productPayload),
    limit: Number(req.query.limit || 12)
  });
  res.json(response.data);
});

export const chat = asyncHandler(async (req, res) => {
  const products = await Product.find().limit(120);
  const response = await axios.post(`${process.env.AI_CHATBOT_URL || 'http://localhost:8003'}/chat`, {
    message: req.body.message,
    products: products.map(productPayload),
    user: { id: req.user._id.toString(), name: req.user.name }
  });
  res.json(response.data);
});

