import React, { useEffect, useState } from 'react';
import { getMockOrderbook } from '../api/mockApi';
import { useAppContext } from '../context/AppContext';

export default function OrderbookScreen() {
  const [orderbook, setOrderbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setOrderPad } = useAppContext();

  useEffect(() => {
    getMockOrderbook().then(data => {
      setOrderbook(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ marginTop: 30 }}>Loading orderbook...</div>;

  return (
    <div style={{ padding: 24, paddingBottom: 64 }}>
      <h3>Orderbook</h3>
      <div>
        <strong>Realized PNL:</strong> {orderbook.realizedPNL} | <strong>Unrealized PNL:</strong> {orderbook.unrealizedPNL}
      </div>
      <table width="100%" style={{ marginTop: 18 }}>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Side</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Status</th>
            <th>Trade</th>
          </tr>
        </thead>
        <tbody>
          {orderbook.orders.map(order => (
            <tr key={order.id}>
              <td>{order.symbol}</td>
              <td>{order.side}</td>
              <td>{order.qty}</td>
              <td>{order.price}</td>
              <td>{order.status}</td>
              <td>
                <button style={{ color: '#198754' }} onClick={() => setOrderPad({ open: true, type: 'buy', stock: order })}>Buy</button>
                <button style={{ color: '#dc3545' }} onClick={() => setOrderPad({ open: true, type: 'sell', stock: order })}>Sell</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
