import React, { useEffect, useState } from 'react';
import { getMockHoldings } from '../api/mockApi';
import { useAppContext } from '../context/AppContext';

export default function HoldingsScreen() {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setOrderPad } = useAppContext();

  useEffect(() => {
    getMockHoldings().then(data => {
      setHoldings(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ marginTop: 30 }}>Loading holdings...</div>;

  return (
    <div style={{ padding: 24, paddingBottom: 64 }}>
      <h3>My Holdings</h3>
      <table width="100%">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Qty</th>
            <th>Avg Price</th>
            <th>Trade</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map(stock => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.qty}</td>
              <td>{stock.avgPrice}</td>
              <td>
                <button style={{ color: '#198754' }} onClick={() => setOrderPad({ open: true, type: 'buy', stock })}>Buy</button>
                <button style={{ color: '#dc3545' }} onClick={() => setOrderPad({ open: true, type: 'sell', stock })}>Sell</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
