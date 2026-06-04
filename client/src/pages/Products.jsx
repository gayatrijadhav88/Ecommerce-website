import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import api from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [semantic, setSemantic] = useState(false);

  const loadProducts = async () => {
    if (semantic && query.trim()) {
      const { data } = await api.get(`/ai/search?q=${encodeURIComponent(query)}`);
      setProducts(data.results || []);
      return;
    }
    const { data } = await api.get('/products', { params: { search: query, category } });
    setProducts(data.products);
  };

  useEffect(() => {
    api.get('/products/categories').then(({ data }) => setCategories(data)).catch(() => {});
    loadProducts().catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="mt-1 text-ink/65">Browse the catalog or switch to AI semantic search.</p>
        </div>
        <form
          className="flex flex-col gap-2 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            loadProducts().catch(() => {});
          }}
        >
          <div className="flex rounded-md border border-ink/15 bg-white">
            <input className="w-full rounded-md px-3 py-2 outline-none" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" />
            <button className="px-3 text-mint" title="Search"><Search size={20} /></button>
          </div>
          <select className="rounded-md border border-ink/15 bg-white px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
          <label className="flex items-center gap-2 rounded-md border border-ink/15 bg-white px-3 py-2 text-sm">
            <input type="checkbox" checked={semantic} onChange={(e) => setSemantic(e.target.checked)} />
            AI Search
          </label>
        </form>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product._id || product.id} product={product} />)}
      </div>
    </div>
  );
}

export default Products;

