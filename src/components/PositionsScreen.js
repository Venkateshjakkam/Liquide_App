import React, { useEffect, useState } from 'react';
import { getMockPositions } from '../api/mockApi';
import { useAppContext } from '../context/AppContext';

export default function PositionsScreen() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setOrderPad } = useAppContext();

  useEffect(() => {
    getMockPositions().then(data => {
      setPositions(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ marginTop: 30 }}>Loading positions...</div>;

  return (
    <div style={{ padding: 24, paddingBottom: 64 }}>
      <h3>Active Positions</h3>
      <table width="100%">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Qty</th>
            <th>PNL</th>
            <th>Trade</th>
          </tr>
        </thead>
        <tbody>
          {positions.map(pos => (
            <tr key={pos.symbol}>
              <td>{pos.symbol}</td>
              <td>{pos.qty}</td>
              <td style={{ color: pos.pnl >= 0 ? 'green' : 'red' }}>{pos.pnl}</td>
              <td>
                <button style={{ color: '#198754' }} onClick={() => setOrderPad({ open: true, type: 'buy', stock: pos })}>Buy</button>
                <button style={{ color: '#dc3545' }} onClick={() => setOrderPad({ open: true, type: 'sell', stock: pos })}>Sell</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
