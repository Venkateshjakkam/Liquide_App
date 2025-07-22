import { useAppContext } from '../context/AppContext';

export default function OrderPad() {
  const { orderPad, setOrderPad } = useAppContext();
  if (!orderPad.open) return null;

  const { type, stock } = orderPad;
  const padColor = type === 'buy' ? '#eaffea' : '#ffeaea';

  return (
    <div
      style={{
        position: 'fixed',
        top: 40,
        right: 0,
        left: 0,
        margin: 'auto',
        maxWidth: 400,
        padding: 28,
        borderRadius: 8,
        boxShadow: '0 3px 16px rgba(0,0,0,0.12)',
        background: padColor,
        zIndex: 20,
      }}
    >
      <h4 style={{ color: type === 'buy' ? '#198754' : '#dc3545', marginBottom: 14 }}>
        {type === 'buy' ? 'Buy' : 'Sell'} {stock.symbol}
      </h4>
      <div>
        <label>Quantity: </label>
        <input type="number" min={1} defaultValue={stock.qty || 1} />
      </div>
      <div>
        <label>Price: </label>
        <input type="number" min={1} defaultValue={stock.avgPrice || stock.price || 0} />
      </div>
      <div style={{ marginTop: 18 }}>
        <button style={{ marginRight: 12 }}>Place Order</button>
        <button onClick={() => setOrderPad({ open: false })} style={{ color: '#888' }}>Cancel</button>
      </div>
    </div>
  );
}
