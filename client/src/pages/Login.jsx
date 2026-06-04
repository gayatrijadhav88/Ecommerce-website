import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice.js';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: 'customer@smartcommerce.ai', password: 'Customer@123' });

  const submit = async (event) => {
    event.preventDefault();
    const result = await dispatch(login(form));
    if (result.payload) navigate('/');
  };

  return (
    <form className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-sm" onSubmit={submit}>
      <h1 className="text-3xl font-bold">Login</h1>
      <div className="mt-5 grid gap-4">
        <input className="rounded-md border border-ink/15 px-3 py-2" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="rounded-md border border-ink/15 px-3 py-2" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      </div>
      <button className="mt-5 w-full rounded-md bg-ink px-5 py-3 font-semibold text-white">{loading ? 'Signing in...' : 'Login'}</button>
      <p className="mt-4 text-sm text-ink/65">New customer? <Link className="font-semibold text-mint" to="/register">Create an account</Link></p>
    </form>
  );
}

export default Login;

