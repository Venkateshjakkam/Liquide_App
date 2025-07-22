// src/components/BrokerLogin.js
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
    const response = await mockLogin(selectedBroker);
    setLoading(false);

    if (response.status === 200) {
      setUser({ brokerId: selectedBroker, token: response.token });
    } else if (response.status === 400) {
      setMsg(response.message);
    } else if (response.status === 500) {
      setMsg('Server error, please try again later.');
    }
  };

  return (
    <div className="broker-login-container">
      <h2>Choose Broker</h2>
      <div className="broker-buttons">
        {brokers.map((broker) => (
          <button
            key={broker.id}
            className={selectedBroker === broker.id ? 'selected' : ''}
            onClick={() => setSelectedBroker(broker.id)}
            type="button"
          >
            {broker.name}
          </button>
        ))}
      </div>
      <button
        className="login-btn"
        disabled={!selectedBroker || loading}
        onClick={handleLogin}
        type="button"
      >
        {loading ? 'Logging In...' : 'Login'}
      </button>
      <div className="login-error-msg">{msg}</div>
    </div>
  );
}
