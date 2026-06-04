import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    brand: { type: String, default: 'SmartCommerce' },
    category: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    stock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 4.4, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0 },
    images: [{ type: String }],
    tags: [{ type: String, index: true }],
    specifications: { type: Map, of: String },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', category: 'text', tags: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;

