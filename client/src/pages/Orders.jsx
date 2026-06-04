import { useEffect, useState } from 'react';
import api from '../services/api.js';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders/my').then(({ data }) => setOrders(data)).catch(() => {});
  }, []);

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="rounded-lg bg-white p-5 shadow-sm">
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <p className="font-semibold">Order #{order._id.slice(-8)}</p>
              <p className="text-sm text-ink/60">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <span className="rounded-md bg-saffron/20 px-3 py-1 text-sm font-semibold">{order.status}</span>
          </div>
          <div className="mt-4 space-y-2">
            {order.items.map((item) => (
              <div key={item.product} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-ink/10 pt-3 text-right font-bold">₹{order.totalAmount.toLocaleString('en-IN')}</div>
        </div>
      ))}
    </div>
  );
}

export default Orders;

