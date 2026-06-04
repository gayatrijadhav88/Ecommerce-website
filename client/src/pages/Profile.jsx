import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store/authSlice.js';

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || { line1: '', city: '', state: '', postalCode: '', country: 'India' }
  });

  const submit = (event) => {
    event.preventDefault();
    dispatch(updateProfile(form));
  };

  return (
    <form className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-sm" onSubmit={submit}>
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="mt-5 grid gap-4">
        <input className="rounded-md border border-ink/15 px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="rounded-md border border-ink/15 px-3 py-2" value={user?.email || ''} disabled />
        <input className="rounded-md border border-ink/15 px-3 py-2" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        {['line1', 'city', 'state', 'postalCode', 'country'].map((field) => (
          <input
            key={field}
            className="rounded-md border border-ink/15 px-3 py-2"
            placeholder={field}
            value={form.address?.[field] || ''}
            onChange={(e) => setForm({ ...form, address: { ...form.address, [field]: e.target.value } })}
          />
        ))}
      </div>
      <button className="mt-5 rounded-md bg-mint px-5 py-3 font-semibold text-white">Save Profile</button>
    </form>
  );
}

export default Profile;

