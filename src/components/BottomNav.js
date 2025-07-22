import { useAppContext } from '../context/AppContext';

const screens = ['Holdings', 'Orderbook', 'Positions'];

export default function BottomNav() {
  const { activeScreen, setActiveScreen } = useAppContext();

  return (
    <nav className="bottom-nav" aria-label="Main Navigation">
      {screens.map((screen) => (
        <button
          key={screen}
          className={activeScreen === screen ? 'active' : ''}
          type="button"
          onClick={() => setActiveScreen(screen)}
          aria-current={activeScreen === screen ? 'page' : undefined}
        >
          {screen}
        </button>
      ))}
    </nav>
  );
}
