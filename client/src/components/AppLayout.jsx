import { Heart, LayoutDashboard, LogOut, Menu, Search, ShoppingCart, Sparkles, User } from 'lucide-react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice.js';

const linkClass = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-mint text-white' : 'text-ink hover:bg-white'}`;

function AppLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const count = useSelector((state) => state.cart.cart.items?.length || 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-[#f7faf9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-bold text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-white">
              <Sparkles size={18} />
            </span>
            SmartCommerce AI
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <NavLink className={linkClass} to="/products">Products</NavLink>
            <NavLink className={linkClass} to="/assistant">AI Assistant</NavLink>
            <NavLink className={linkClass} to="/orders">Orders</NavLink>
            {user?.role === 'admin' && <NavLink className={linkClass} to="/admin"><LayoutDashboard size={16} /> Admin</NavLink>}
          </nav>
          <div className="flex items-center gap-2">
            <Link className="focus-ring rounded-md p-2 hover:bg-white" to="/products" title="Search"><Search size={20} /></Link>
            <Link className="focus-ring rounded-md p-2 hover:bg-white" to="/wishlist" title="Wishlist"><Heart size={20} /></Link>
            <Link className="focus-ring relative rounded-md p-2 hover:bg-white" to="/cart" title="Cart">
              <ShoppingCart size={20} />
              {count > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-coral px-1.5 text-xs text-white">{count}</span>}
            </Link>
            {user ? (
              <>
                <Link className="focus-ring rounded-md p-2 hover:bg-white" to="/profile" title="Profile"><User size={20} /></Link>
                <button className="focus-ring rounded-md p-2 hover:bg-white" onClick={handleLogout} title="Logout"><LogOut size={20} /></button>
              </>
            ) : (
              <Link className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white" to="/login">Login</Link>
            )}
            <button className="rounded-md p-2 md:hidden" title="Menu"><Menu size={20} /></button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

