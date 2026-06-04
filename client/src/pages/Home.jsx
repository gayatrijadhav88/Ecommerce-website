import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Search, ShieldCheck } from 'lucide-react';
import api from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(({ data }) => setProducts(data.products.slice(0, 4))).catch(() => {});
  }, []);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 rounded-lg bg-white p-6 shadow-sm md:grid-cols-[1.1fr_0.9fr] md:p-10">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-coral">AI-powered shopping</p>
          <h1 className="text-4xl font-bold leading-tight text-ink md:text-5xl">SmartCommerce AI</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            Discover products faster with personalized recommendations, semantic search, and an AI assistant that understands real shopping intent.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 font-semibold text-white" to="/products">
              Explore Products <ArrowRight size={18} />
            </Link>
            <Link className="inline-flex items-center gap-2 rounded-md border border-ink/15 px-5 py-3 font-semibold" to="/assistant">
              Ask AI <Brain size={18} />
            </Link>
          </div>
        </div>
        <img
          className="h-full min-h-72 rounded-lg object-cover"
          src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80"
          alt="Modern e-commerce shopping desk"
        />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['Semantic Search', Search, 'Find products by meaning, not only exact keywords.'],
          ['Personalized Picks', Brain, 'Recommendations improve from browsing history and product similarity.'],
          ['Secure Commerce', ShieldCheck, 'JWT auth, role-based access, clean API boundaries.']
        ].map(([title, Icon, text]) => (
          <div key={title} className="rounded-lg border border-ink/10 bg-white p-5">
            <Icon className="text-mint" />
            <h2 className="mt-3 font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-ink/65">{text}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link className="font-semibold text-mint" to="/products">View all</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </section>
    </div>
  );
}

export default Home;

