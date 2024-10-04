// src/HomePage.js
import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [pressCount, setPressCount] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');

  const handleClick = () => {
    setPressCount(prevCount => prevCount + 1);
    
    if (pressCount + 1 === 3) {
      setStatusMsg('Emergency Triggered! Notifying nearby users...');
      triggerEmergency();
      setPressCount(0); // Reset after triggering emergency
    }
    
    setTimeout(() => {
      setPressCount(0); // Reset if no presses within 5 seconds
    }, 5000);
  };

  const triggerEmergency = () => {
    // Simulate an API call to notify nearby users
    fetch('/api/emergency', {
      method: 'POST',
      body: JSON.stringify({ userId: 'user123', location: { lat: 0, lng: 0 } }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => setStatusMsg(data.message))
    .catch(error => setStatusMsg('Error in triggering emergency.'));
  };

  return (
    <div className="home-page">
      <h1>Safety Alert System</h1>
      <h2>Press the Button if You’re in Danger</h2>
      <button onClick={handleClick} className="emergency-btn">Press 3 Times</button>
      <p>{statusMsg}</p>
    </div>
  );
};

export default HomePage;
