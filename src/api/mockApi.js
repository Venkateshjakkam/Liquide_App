export const brokers = [
  { id: 'broker1', name: 'Broker One' },
  { id: 'broker2', name: 'Broker Two' },
  { id: 'broker3', name: 'Broker Three' },
];

export function mockLogin(brokerId, credentials) {
  // Simulate backend status: randomly 200, 400, 500
  const random = Math.random();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (random < 0.7) {
        resolve({ status: 200, token: 'mock-jwt-token', user: { brokerId } });
      } else if (random < 0.85) {
        resolve({ status: 400, message: 'Invalid credentials' });
      } else {
        resolve({ status: 500, message: 'Server error' });
      }
    }, 1000);
  });
}

export function getMockHoldings() {
  return Promise.resolve([
    { symbol: 'AMIORG', qty: 100, avgPrice: 1550 },
    { symbol: 'SJS', qty: 20, avgPrice: 2700 },
    { symbol: 'JIOFINC', qty: 150, avgPrice: 350 },
  ]);
}

export function getMockOrderbook() {
  return Promise.resolve({
    orders: [
      { id: 1, symbol: 'AMIORG', side: 'buy', qty: 5, price: 150, status: 'executed' },
      { id: 2, symbol: 'JIOFINC', side: 'sell', qty: 2, price: 700, status: 'executed' },
    ],
    realizedPNL: 500,
    unrealizedPNL: 120,
  });
}

export function getMockPositions() {
  return Promise.resolve([
    { symbol: 'AMIORG', qty: 5, pnl: 120 },
    { symbol: 'JIOFINC', qty: 3, pnl: -45 },
  ]);
}
