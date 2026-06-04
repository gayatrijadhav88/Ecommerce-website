import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, PackagePlus, Trash2 } from 'lucide-react';
import api from '../services/api.js';

const emptyProduct = {
  name: '',
  slug: '',
  brand: '',
  category: '',
  description: '',
  price: '',
  stock: '',
  images: '',
  tags: ''
};

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);

  const load = () => api.get('/products').then(({ data }) => setProducts(data.products));

  useEffect(() => {
    load().catch(() => {});
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    await api.post('/admin/products', {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: form.images.split(',').map((item) => item.trim()).filter(Boolean),
      tags: form.tags.split(',').map((item) => item.trim()).filter(Boolean)
    });
    setForm(emptyProduct);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/admin/products/${id}`);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-ink/65">Manage products, inventory, orders, and analytics.</p>
        </div>
        <Link className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 font-semibold text-white" to="/admin/analytics">
          <BarChart3 size={18} /> Analytics
        </Link>
      </div>
      <form className="rounded-lg bg-white p-5 shadow-sm" onSubmit={submit}>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><PackagePlus size={20} /> Add Product</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {Object.keys(emptyProduct).map((field) => (
            <input
              key={field}
              className="rounded-md border border-ink/15 px-3 py-2"
              placeholder={field}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              required={['name', 'slug', 'category', 'description', 'price', 'stock'].includes(field)}
            />
          ))}
        </div>
        <button className="mt-4 rounded-md bg-mint px-4 py-2 font-semibold text-white">Save Product</button>
      </form>
      <section className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-ink text-white">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-ink/10">
                <td className="p-3 font-semibold">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">₹{product.price.toLocaleString('en-IN')}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">
                  <button className="rounded-md border border-ink/10 p-2" onClick={() => remove(product._id)} title="Delete">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminDashboard;

