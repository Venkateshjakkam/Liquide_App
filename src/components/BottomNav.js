import { useAppContext } from '../context/AppContext';

const screens = [
  { label: 'Holdings' },
  { label: 'Orderbook' },
  { label: 'Positions' }
];

export default function BottomNav() {
  const { activeScreen, setActiveScreen } = useAppContext();

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      background: '#fafafa',
      borderTop: '1px solid #e0e0e0',
      zIndex: 10,
      padding: '8px 0'
    }}>
      {screens.map(s => (
        <button
          key={s.label}
          style={{
            border: 'none',
            background: activeScreen === s.label ? '#0D6EFD' : 'transparent',
            color: activeScreen === s.label ? '#fff' : '#333',
            fontWeight: activeScreen === s.label ? 'bold' : 'normal',
            padding: '6px 18px',
            borderRadius: 6,
            fontSize: 16,
            cursor: 'pointer',
          }}
          onClick={() => setActiveScreen(s.label)}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}
