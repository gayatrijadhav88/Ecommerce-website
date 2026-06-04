import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice.js';
import { toggleWishlist } from '../store/wishlistSlice.js';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const price = product.discountPrice || product.price;

  return (
    <article className="overflow-hidden rounded-lg border border-ink/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <Link to={`/products/${product._id || product.id}`}>
        <img className="h-48 w-full object-cover" src={product.images?.[0] || product.image} alt={product.name} />
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-mint">{product.category}</p>
            <Link to={`/products/${product._id || product.id}`} className="mt-1 block font-semibold text-ink hover:text-mint">
              {product.name}
            </Link>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-saffron">
            <Star size={15} fill="currentColor" /> {product.rating || 4.5}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-ink/65">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold">₹{price?.toLocaleString('en-IN')}</span>
            {product.discountPrice && <span className="ml-2 text-sm text-ink/40 line-through">₹{product.price.toLocaleString('en-IN')}</span>}
          </div>
          <div className="flex gap-2">
            <button className="focus-ring rounded-md border border-ink/10 p-2" onClick={() => dispatch(toggleWishlist(product._id || product.id))} title="Wishlist">
              <Heart size={18} />
            </button>
            <button className="focus-ring rounded-md bg-mint p-2 text-white" onClick={() => dispatch(addToCart({ productId: product._id || product.id }))} title="Add to cart">
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

