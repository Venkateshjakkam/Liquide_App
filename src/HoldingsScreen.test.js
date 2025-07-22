import { render, screen, waitFor } from '@testing-library/react';
import HoldingsScreen from './HoldingsScreen';
import { AppProvider } from '../context/AppContext';

jest.mock('../api/mockApi', () => ({
  getMockHoldings: jest.fn(() =>
    Promise.resolve([{ symbol: 'AMIORG', qty: 5, avgPrice: 150 }])
  ),
}));

test('shows loader then displays holding data', async () => {
  render(
    <AppProvider>
      <HoldingsScreen />
    </AppProvider>
  );

  expect(screen.getByText(/Loading holdings/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText('AMIORG')).toBeInTheDocument());
  expect(screen.getByText('5')).toBeInTheDocument();
  expect(screen.getByText('150')).toBeInTheDocument();
});
