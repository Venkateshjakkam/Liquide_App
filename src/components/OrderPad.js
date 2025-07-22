
import  { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function OrderPad() {
  const { orderPad, setOrderPad } = useAppContext();
  const [qty, setQty] = useState(orderPad.stock?.qty || 1);
  const [price, setPrice] = useState(orderPad.stock?.avgPrice || orderPad.stock?.price || 0);

  if (!orderPad.open) return null;

  const { type, stock } = orderPad;

  const isBuy = type === 'buy';

  const onPlaceOrder = () => {
    // For demo: Just close on place. Replace with real order logic if needed.
    alert(`${isBuy ? 'Buying' : 'Selling'} ${qty} of ${stock.symbol} at price ${price}`);
    setOrderPad({ open: false, type: null, stock: null });
  };

  return (
    <div className={`order-pad ${isBuy ? 'buy' : 'sell'}`}>
      <h4>
        {isBuy ? 'Buy' : 'Sell'} {stock.symbol}
      </h4>
      <label htmlFor="order-qty">Quantity:</label>
      <input
        id="order-qty"
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      />
      <label htmlFor="order-price">Price:</label>
      <input
        id="order-price"
        type="number"
        min="0"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <div className="btn-group">
        <button className="btn-primary" type="button" onClick={onPlaceOrder}>
          Place Order
        </button>
        <button
          className="btn-cancel"
          type="button"
          onClick={() => setOrderPad({ open: false })}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
