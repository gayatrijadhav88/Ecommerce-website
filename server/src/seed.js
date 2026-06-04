import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Cart from './models/Cart.js';
import Wishlist from './models/Wishlist.js';
import Order from './models/Order.js';
import BrowsingHistory from './models/BrowsingHistory.js';

dotenv.config();

const images = [
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
];

const products = [
  {
    name: 'NovaBook Pro 14',
    slug: 'novabook-pro-14',
    brand: 'Nova',
    category: 'Laptops',
    description: 'Lightweight performance laptop for students, developers, and creators with long battery life.',
    price: 129999,
    discountPrice: 119999,
    stock: 18,
    rating: 4.8,
    images: [images[0]],
    tags: ['laptop', 'creator', 'developer', 'portable'],
    specifications: { Processor: 'M-series class', RAM: '16GB', Storage: '512GB SSD' },
    isFeatured: true
  },
  {
    name: 'AeroSound Max',
    slug: 'aerosound-max',
    brand: 'Aero',
    category: 'Audio',
    description: 'Wireless noise cancelling headphones with deep bass, clear calls, and 40-hour battery.',
    price: 24999,
    discountPrice: 19999,
    stock: 45,
    rating: 4.6,
    images: [images[1]],
    tags: ['headphones', 'audio', 'noise-cancelling', 'travel'],
    isFeatured: true
  },
  {
    name: 'FitPulse Watch S',
    slug: 'fitpulse-watch-s',
    brand: 'FitPulse',
    category: 'Wearables',
    description: 'Fitness smartwatch with heart-rate tracking, sleep insights, and bright AMOLED display.',
    price: 15999,
    stock: 60,
    rating: 4.5,
    images: [images[2]],
    tags: ['watch', 'fitness', 'health', 'smartwatch'],
    isFeatured: true
  },
  {
    name: 'Velocity Runner X',
    slug: 'velocity-runner-x',
    brand: 'Stride',
    category: 'Fashion',
    description: 'Responsive running shoes designed for daily workouts, campus use, and weekend travel.',
    price: 8999,
    discountPrice: 7499,
    stock: 80,
    rating: 4.4,
    images: [images[3]],
    tags: ['shoes', 'running', 'fitness', 'fashion']
  },
  {
    name: 'PixelTab Air',
    slug: 'pixeltab-air',
    brand: 'PixelTab',
    category: 'Tablets',
    description: 'Slim tablet for notes, entertainment, online classes, and light productivity.',
    price: 42999,
    stock: 34,
    rating: 4.3,
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80'],
    tags: ['tablet', 'study', 'entertainment', 'portable']
  },
  {
    name: 'BrewMate Smart Kettle',
    slug: 'brewmate-smart-kettle',
    brand: 'BrewMate',
    category: 'Home',
    description: 'App-enabled electric kettle with precise temperature presets for tea and coffee lovers.',
    price: 5999,
    stock: 28,
    rating: 4.2,
    images: ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80'],
    tags: ['home', 'kitchen', 'coffee', 'smart']
  },
  {
    name: 'DeskGlow LED Lamp',
    slug: 'deskglow-led-lamp',
    brand: 'DeskGlow',
    category: 'Home',
    description: 'Eye-comfort desk lamp with adjustable brightness for study desks and workstations.',
    price: 3499,
    stock: 70,
    rating: 4.5,
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80'],
    tags: ['study', 'lamp', 'home-office', 'desk']
  },
  {
    name: 'CreatorCam 4K',
    slug: 'creatorcam-4k',
    brand: 'CreatorCam',
    category: 'Cameras',
    description: 'Compact 4K camera for vlogging, college projects, product shoots, and livestreams.',
    price: 54999,
    discountPrice: 49999,
    stock: 16,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80'],
    tags: ['camera', 'creator', 'video', 'vlogging']
  }
];

const seed = async () => {
  await connectDB();
  await Promise.all([
    User.deleteMany(),
    Product.deleteMany(),
    Cart.deleteMany(),
    Wishlist.deleteMany(),
    Order.deleteMany(),
    BrowsingHistory.deleteMany()
  ]);
  await User.create([
    { name: 'Admin User', email: 'admin@smartcommerce.ai', password: 'Admin@123', role: 'admin' },
    { name: 'Demo Customer', email: 'customer@smartcommerce.ai', password: 'Customer@123', role: 'customer' }
  ]);
  await Product.insertMany(products);
  console.log('Seed complete');
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

