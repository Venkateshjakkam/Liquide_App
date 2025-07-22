import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { getMockHoldings, getMockOrderbook, getMockPositions } from '../api/mockApi';

export default function FloatingActionButton() {
  const { activeScreen, setOrderPad } = useAppContext();
  const [drag, setDrag] = useState(false);
  const [pos, setPos] = useState({ x: 24, y: window.innerHeight - 120 });
  const fabRef = useRef();

  const onMouseDown = e => {
    setDrag(true);
    fabRef.current.startX = e.clientX - pos.x;
    fabRef.current.startY = e.clientY - pos.y;
  };
  const onMouseMove = e => {
    if (drag) {
      setPos({
        x: e.clientX - fabRef.current.startX,
        y: e.clientY - fabRef.current.startY
      });
    }
  };
  const onMouseUp = () => setDrag(false);

  React.useEffect(() => {
    if (drag) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
  });

  const handlePadOpen = async type => {
    let stocks = [];
    if (activeScreen === 'Holdings') {
      stocks = await getMockHoldings();
    } else if (activeScreen === 'Orderbook') {
      const orderbook = await getMockOrderbook();
      stocks = orderbook.orders;
    } else if (activeScreen === 'Positions') {
      stocks = await getMockPositions();
    }
    let stock = stocks && stocks.length > 0 ? stocks[0] : { symbol: 'AMIORG', qty: 1, avgPrice: 0 };

    setOrderPad({ open: true, type, stock });
  };

  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={fabRef}
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        zIndex: 30,
        cursor: 'move',
        userSelect: 'none'
      }}
      onMouseDown={onMouseDown}
    >
      <div style={{
        background: '#0D6EFD',
        width: 60,
        height: 60,
        borderRadius: '50%',
        boxShadow: '0 2px 8px #999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 36,
        transition: 'background 0.2s',
        cursor: 'pointer'
      }}
        onClick={() => setExpanded(e => !e)}
      >+</div>
      {expanded && (
        <div style={{
          position: 'absolute',
          top: -64,
          left: 0,
          display: 'flex',
          gap: 12
        }}>
          <button
            style={{
              background: '#198754',
              color: '#fff',
              border: 'none',
              borderRadius: 16,
              padding: '10px 18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => { handlePadOpen('buy'); setExpanded(false); }}>
            Buy
          </button>
          <button
            style={{
              background: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: 16,
              padding: '10px 18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => { handlePadOpen('sell'); setExpanded(false); }}>
            Sell
          </button>
        </div>
      )}
    </div>
  );
}
