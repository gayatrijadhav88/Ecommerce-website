import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeCartItem, updateCartItem } from '../store/cartSlice.js';

function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = cart.items?.reduce((sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity, 0) || 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Cart</h1>
        {cart.items?.map((item) => (
          <div key={item.product._id} className="flex gap-4 rounded-lg bg-white p-4 shadow-sm">
            <img className="h-24 w-24 rounded-md object-cover" src={item.product.images?.[0]} alt={item.product.name} />
            <div className="flex-1">
              <h2 className="font-semibold">{item.product.name}</h2>
              <p className="text-sm text-ink/60">₹{(item.product.discountPrice || item.product.price).toLocaleString('en-IN')}</p>
              <input
                className="mt-3 w-20 rounded-md border border-ink/15 px-2 py-1"
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => dispatch(updateCartItem({ productId: item.product._id, quantity: e.target.value }))}
              />
            </div>
            <button className="h-10 rounded-md border border-ink/10 p-2" onClick={() => dispatch(removeCartItem(item.product._id))} title="Remove">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </section>
      <aside className="h-fit rounded-lg bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <div className="mt-4 flex justify-between border-t border-ink/10 pt-4">
          <span>Total</span>
          <strong>₹{total.toLocaleString('en-IN')}</strong>
        </div>
        <Link className="mt-5 block rounded-md bg-ink px-4 py-3 text-center font-semibold text-white" to="/checkout">Checkout</Link>
      </aside>
    </div>
  );
}

export default Cart;

