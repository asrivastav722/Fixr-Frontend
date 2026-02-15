import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // REMOVED BrowserRouter
import { Toaster } from 'react-hot-toast';
import PhoneScreen from './components/OnBoardingScreen.jsx';
import LocationScreen from './components/LocationScreen.jsx';
import MainApp from './components/MainApp.jsx';

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<PhoneScreen />} />
        <Route path="/login/:id" element={<PhoneScreen />} />
        <Route path="/location" element={<LocationScreen />} />
        <Route path="/app" element={<MainApp />} />
        
        {/* Redirect to login if path doesn't exist */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;