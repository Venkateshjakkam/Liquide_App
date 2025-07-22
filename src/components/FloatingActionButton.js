// src/components/FloatingActionButton.js
import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { getMockHoldings, getMockOrderbook, getMockPositions } from '../api/mockApi';

export default function FloatingActionButton() {
  const { activeScreen, setOrderPad } = useAppContext();
  const [drag, setDrag] = useState(false);
  const [pos, setPos] = useState({ x: 24, y: window.innerHeight - 120 });
  const fabRef = useRef(null);

  const onMouseDown = (e) => {
    setDrag(true);
    fabRef.current.startX = e.clientX - pos.x;
    fabRef.current.startY = e.clientY - pos.y;
  };
  const onMouseMove = (e) => {
    if (drag) {
      setPos({
        x: Math.min(Math.max(0, e.clientX - fabRef.current.startX), window.innerWidth - 60),
        y: Math.min(Math.max(0, e.clientY - fabRef.current.startY), window.innerHeight - 60),
      });
    }
  };
  const onMouseUp = () => setDrag(false);

  useEffect(() => {
    if (drag) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
    return undefined;
  }, [drag]);

  const [expanded, setExpanded] = useState(false);

  const handlePadOpen = async (type) => {
    let stocks = [];

    if (activeScreen === 'Holdings') {
      stocks = await getMockHoldings();
    } else if (activeScreen === 'Orderbook') {
      const orderbook = await getMockOrderbook();
      stocks = orderbook.orders;
    } else if (activeScreen === 'Positions') {
      stocks = await getMockPositions();
    }

    let stock = stocks.length > 0 ? stocks[0] : { symbol: 'AAPL', qty: 1, avgPrice: 0 };

    setOrderPad({ open: true, type, stock });
    setExpanded(false);
  };

  return (
    <div
      ref={fabRef}
      className="fab-container"
      style={{ left: pos.x, top: pos.y, position: 'fixed', zIndex: 300 }}
      onMouseDown={onMouseDown}
      aria-label="Floating Action Button"
    >
      <div className="fab-main" onClick={() => setExpanded((e) => !e)} role="button" tabIndex={0}>
        +
      </div>
      {expanded && (
        <div className="fab-expanded">
          <button
            className="fab-buy-btn"
            type="button"
            onClick={() => handlePadOpen('buy')}
            aria-label="Buy Order Pad"
          >
            Buy
          </button>
          <button
            className="fab-sell-btn"
            type="button"
            onClick={() => handlePadOpen('sell')}
            aria-label="Sell Order Pad"
          >
            Sell
          </button>
        </div>
      )}
    </div>
  );
}
