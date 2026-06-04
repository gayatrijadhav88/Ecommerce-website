import { useEffect, useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import api from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';

function Assistant() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([{ role: 'assistant', text: 'Tell me what you are shopping for and I will suggest useful products.' }]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    api.get('/ai/recommendations').then(({ data }) => setRecommendations(data.recommendations || [])).catch(() => {});
  }, []);

  const send = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    const next = [...chat, { role: 'user', text: message }];
    setChat(next);
    setMessage('');
    const { data } = await api.post('/ai/chat', { message });
    setChat([...next, { role: 'assistant', text: data.answer }]);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <section className="rounded-lg bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Bot className="text-mint" />
          <h1 className="text-3xl font-bold">AI Shopping Assistant</h1>
        </div>
        <div className="h-[460px] space-y-3 overflow-y-auto rounded-lg border border-ink/10 bg-[#f7faf9] p-4">
          {chat.map((entry, index) => (
            <div key={`${entry.role}-${index}`} className={`max-w-[78%] rounded-lg p-3 text-sm ${entry.role === 'user' ? 'ml-auto bg-ink text-white' : 'bg-white'}`}>
              {entry.text}
            </div>
          ))}
        </div>
        <form className="mt-4 flex gap-2" onSubmit={send}>
          <input className="flex-1 rounded-md border border-ink/15 px-3 py-3" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask for gift ideas, budget picks, comparisons..." />
          <button className="rounded-md bg-mint px-4 text-white" title="Send"><Send size={20} /></button>
        </form>
      </section>
      <aside>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><Sparkles size={20} /> Recommended for you</h2>
        <div className="space-y-4">
          {recommendations.slice(0, 3).map((product) => <ProductCard key={product.id || product._id} product={product} />)}
        </div>
      </aside>
    </div>
  );
}

export default Assistant;

