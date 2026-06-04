import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard.jsx';
import { fetchWishlist } from '../store/wishlistSlice.js';

function Wishlist() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.wishlist.wishlist.products || []);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Wishlist</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
}

export default Wishlist;

