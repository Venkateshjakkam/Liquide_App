import  { useEffect, useState } from 'react';
import { getMockHoldings } from '../api/mockApi';
import { useAppContext } from '../context/AppContext';

export default function HoldingsScreen() {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setOrderPad } = useAppContext();

  useEffect(() => {
    getMockHoldings().then((data) => {
      setHoldings(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ marginTop: 30 }}>Loading holdings...</div>;

  return (
    <div style={{ padding: '24px', paddingBottom: '64px' }}>
      <h3>My Holdings</h3>
      <table>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Qty</th>
            <th>Avg Price</th>
            <th>Trade</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.qty}</td>
              <td>{stock.avgPrice}</td>
              <td>
                <button
                  className="buy-btn"
                  type="button"
                  onClick={() => setOrderPad({ open: true, type: 'buy', stock })}
                >
                  Buy
                </button>
                <button
                  className="sell-btn"
                  type="button"
                  onClick={() => setOrderPad({ open: true, type: 'sell', stock })}
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
