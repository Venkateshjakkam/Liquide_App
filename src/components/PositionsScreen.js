// src/components/PositionsScreen.js
import React, { useEffect, useState } from 'react';
import { getMockPositions } from '../api/mockApi';
import { useAppContext } from '../context/AppContext';

export default function PositionsScreen() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setOrderPad } = useAppContext();

  useEffect(() => {
    getMockPositions().then((data) => {
      setPositions(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ marginTop: 30 }}>Loading positions...</div>;

  return (
    <div style={{ padding: '24px', paddingBottom: '64px' }}>
      <h3>Active Positions</h3>
      <table>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Qty</th>
            <th>PNL</th>
            <th>Trade</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos) => (
            <tr key={pos.symbol}>
              <td>{pos.symbol}</td>
              <td>{pos.qty}</td>
              <td className={pos.pnl >= 0 ? 'pnl-positive' : 'pnl-negative'}>
                {pos.pnl}
              </td>
              <td>
                <button
                  className="buy-btn"
                  type="button"
                  onClick={() => setOrderPad({ open: true, type: 'buy', stock: pos })}
                >
                  Buy
                </button>
                <button
                  className="sell-btn"
                  type="button"
                  onClick={() => setOrderPad({ open: true, type: 'sell', stock: pos })}
                >
                  Sell
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
