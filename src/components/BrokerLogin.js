import React, { useState } from 'react';
import { brokers, mockLogin } from '../api/mockApi';
import { useAppContext } from '../context/AppContext';

export default function BrokerLogin() {
  const { setUser } = useAppContext();
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setMsg('');
    const response = await mockLogin(selectedBroker, { username: 'user', password: 'pass' });
    setLoading(false);

    if (response.status === 200) {
      setUser({ brokerId: selectedBroker, token: response.token });
    } else if (response.status === 400) {
      setMsg(response.message);
    } else if (response.status === 500) {
      setMsg('Server error, try again.');
    }
  };

  return (
    <div style={{ maxWidth: 340, margin: '60px auto', border: '1px solid #dedede', padding: 32, borderRadius: 8 }}>
      <h2>Choose Broker</h2>
      <div>
        {brokers.map(broker => (
          <button
            key={broker.id}
            style={{
              padding: 10, margin: 6, borderRadius: 4,
              background: selectedBroker === broker.id ? '#0D6EFD' : '#fff', color: selectedBroker === broker.id ? '#fff' : '#000'
            }}
            onClick={() => setSelectedBroker(broker.id)}
          >
            {broker.name}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <button
          disabled={!selectedBroker || loading}
          onClick={handleLogin}
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </div>
      <div style={{ color: 'red', marginTop: 16 }}>{msg}</div>
    </div>
  );
}
