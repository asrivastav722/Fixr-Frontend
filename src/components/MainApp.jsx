import React from 'react';

const MainApp = ({ isGuest, userPhone }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to TechConnect</h1>
      <p className="mt-2 text-gray-600">
        {isGuest ? "Browsing as Guest" : `Logged in as: ${userPhone}`}
      </p>
      {/* Technician list code goes here */}
    </div>
  );
};

export default MainApp;