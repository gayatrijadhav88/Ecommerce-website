import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../services/api.js';

const colors = ['#1f9d8a', '#ef6f61', '#f6b73c', '#334155', '#8b5cf6'];

function AnalyticsDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/admin/analytics').then((res) => setData(res.data)).catch(() => {});
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      <section className="grid gap-4 md:grid-cols-4">
        {Object.entries(data.stats).map(([key, value]) => (
          <div key={key} className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm uppercase text-ink/55">{key}</p>
            <p className="mt-2 text-2xl font-bold">{key === 'revenue' ? `₹${value.toLocaleString('en-IN')}` : value}</p>
          </div>
        ))}
      </section>
      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#1f9d8a" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-bold">Category Mix</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.categories} dataKey="value" nameKey="name" outerRadius={100} label>
                {data.categories.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="rounded-lg bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-bold">Orders by Month</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data.monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#ef6f61" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}

export default AnalyticsDashboard;

