import React, { useState, useEffect } from 'react';
import PhoneScreen from './components/PhoneScreen.jsx';
import OTPScreen from './components/OTPScreen.jsx';
import LocationScreen from './components/LocationScreen.jsx';
import MainApp from './components/MainApp.jsx';

const App = () => {
  const [step, setStep] = useState('loading'); 
  const [phone, setPhone] = useState('');
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Check if user is already verified
    const token = localStorage.getItem('token');
    const savedPhone = localStorage.getItem('userPhone');

    if (token && savedPhone) {
      setPhone(savedPhone);
      setStep('location'); // Jump straight to location
    } else {
      setStep('phone');
    }
  }, []);

  const handleOTPVerified = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userPhone', data.user.phone);
    setStep('location');
  };

  if (step === 'loading') return <div className="h-screen flex items-center justify-center">Loading...</div>;

  switch (step) {
    case 'phone':
      return <PhoneScreen 
                onSkip={() => { setIsGuest(true); setStep('location'); }} 
                onSendOTP={(num) => { setPhone(num); setStep('otp'); }} 
              />;
    case 'otp':
      return <OTPScreen 
                phone={phone} 
                onVerified={handleOTPVerified} 
                onBack={() => setStep('phone')} 
              />;
    case 'location':
      return <LocationScreen 
                phone={isGuest ? null : phone} 
                onFinished={(coords) => {
                  // Pass the fetched coordinates into the app
                  setStep('app');
                }} 
              />;
    case 'app':
      return <MainApp isGuest={isGuest} userPhone={phone} />;
    default:
      return <PhoneScreen />;
  }
};

export default App;