import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import api from '../services/api.js';
import { addToCart } from '../store/cartSlice.js';
import { toggleWishlist } from '../store/wishlistSlice.js';
import ProductCard from '../components/ProductCard.jsx';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setProduct(data)).catch(() => {});
    api.get(`/products/${id}/similar`).then(({ data }) => setSimilar(data)).catch(() => {});
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  const price = product.discountPrice || product.price;

  return (
    <div className="space-y-8">
      <section className="grid gap-8 rounded-lg bg-white p-5 shadow-sm md:grid-cols-2">
        <img className="h-96 w-full rounded-lg object-cover" src={product.images?.[0]} alt={product.name} />
        <div className="space-y-4">
          <p className="font-bold uppercase tracking-wide text-mint">{product.category}</p>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-ink/70">{product.description}</p>
          <div className="flex items-center gap-2 text-saffron"><Star size={18} fill="currentColor" /> {product.rating} rating</div>
          <div className="text-3xl font-bold">₹{price.toLocaleString('en-IN')}</div>
          <p className="text-sm text-ink/60">Stock: {product.stock}</p>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-md bg-mint px-5 py-3 font-semibold text-white" onClick={() => dispatch(addToCart({ productId: product._id }))}>
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-ink/15 px-5 py-3 font-semibold" onClick={() => dispatch(toggleWishlist(product._id))}>
              <Heart size={18} /> Wishlist
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.tags?.map((tag) => <span key={tag} className="rounded-md bg-mint/10 px-2 py-1 text-sm text-mint">{tag}</span>)}
          </div>
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold">Similar Products</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((item) => <ProductCard key={item._id} product={item} />)}
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;

