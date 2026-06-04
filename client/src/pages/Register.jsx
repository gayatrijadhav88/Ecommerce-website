import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../store/authSlice.js';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async (event) => {
    event.preventDefault();
    const result = await dispatch(register(form));
    if (result.payload) navigate('/');
  };

  return (
    <form className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-sm" onSubmit={submit}>
      <h1 className="text-3xl font-bold">Create Account</h1>
      <div className="mt-5 grid gap-4">
        <input className="rounded-md border border-ink/15 px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="rounded-md border border-ink/15 px-3 py-2" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="rounded-md border border-ink/15 px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      </div>
      <button className="mt-5 w-full rounded-md bg-mint px-5 py-3 font-semibold text-white">Register</button>
    </form>
  );
}

export default Register;

