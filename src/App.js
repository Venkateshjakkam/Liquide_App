import { AppProvider, useAppContext } from './context/AppContext';
import BrokerLogin from './components/BrokerLogin';
import BottomNav from './components/BottomNav';
import HoldingsScreen from './components/HoldingsScreen';
import OrderbookScreen from './components/OrderbookScreen';
import PositionsScreen from './components/PositionsScreen';
import OrderPad from './components/OrderPad';
import FloatingActionButton from './components/FloatingActionButton';

function MainApp() {
  const { user, activeScreen } = useAppContext();

  if (!user) return <BrokerLogin />;

  let ScreenComp = null;
  if (activeScreen === 'Holdings') ScreenComp = HoldingsScreen;
  else if (activeScreen === 'Orderbook') ScreenComp = OrderbookScreen;
  else if (activeScreen === 'Positions') ScreenComp = PositionsScreen;

  return (
    <div>
      <ScreenComp />
      <OrderPad />
      <BottomNav />
      <FloatingActionButton />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
