import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

function Checkout() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ line1: '', city: '', state: '', postalCode: '', country: 'India' });

  const submit = async (event) => {
    event.preventDefault();
    await api.post('/orders', { shippingAddress: form, paymentMethod: 'Cash on Delivery' });
    navigate('/orders');
  };

  return (
    <form className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-sm" onSubmit={submit}>
      <h1 className="text-3xl font-bold">Checkout</h1>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {['line1', 'city', 'state', 'postalCode', 'country'].map((field) => (
          <input
            key={field}
            className="rounded-md border border-ink/15 px-3 py-2"
            placeholder={field}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            required
          />
        ))}
      </div>
      <button className="mt-5 rounded-md bg-mint px-5 py-3 font-semibold text-white">Place Order</button>
    </form>
  );
}

export default Checkout;

