import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://fixr-backend-9u8z.onrender.com/health')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error('Error:', err));
  }, []);




  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Fixr Frontend</h1>
      <p>V 1.0</p>
      <p>{message ? message : 'Connecting to backend...'}</p>
    </div>
  );
}

export default App;
