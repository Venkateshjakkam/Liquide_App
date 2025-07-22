import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BrokerLogin from './BrokerLogin';
import { AppProvider } from '../context/AppContext';

jest.mock('../api/mockApi', () => ({
  getBrokers: () => Promise.resolve([
    { id: 'broker1', name: 'Broker One' },
    { id: 'broker2', name: 'Broker Two' },
  ]),
  mockLogin: jest.fn((brokerId) => {
    if (brokerId === 'broker2') {
      return Promise.resolve({ status: 400, message: 'Invalid credentials' });
    }
    return Promise.resolve({ status: 200, token: 'ok', user: { brokerId } });
  }),
}));

test('renders all brokers and shows error on invalid login', async () => {
  render(
    <AppProvider>
      <BrokerLogin />
    </AppProvider>
  );

  await waitFor(() => expect(screen.getByText('Broker Two')).toBeInTheDocument());

  fireEvent.click(screen.getByText('Broker One'));
  fireEvent.click(screen.getByText('Login'));

  await waitFor(() =>
    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument()
  );
});
