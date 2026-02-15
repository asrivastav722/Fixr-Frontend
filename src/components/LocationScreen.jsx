import React, { useEffect } from 'react';
import { Spin, Typography } from 'antd';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const LocationScreen = ({ phone, onFinished }) => {
  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        toast.error("Geolocation not supported");
        onFinished(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lng: position.coords.longitude,
            lat: position.coords.latitude
          };

          try {
            // Sync with backend if user is logged in
            await axios.post('http://localhost:5000/api/auth/update-location', {
              phone,
              ...coords
            });
            onFinished(coords);
          } catch (err) {
            onFinished(coords); // Still move to app even if DB sync fails
          }
        },
        (error) => {
          toast.error("Location access denied");
          onFinished(null);
        }
      );
    };

    getLocation();
  }, [phone, onFinished]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-blue-50">
      <Spin size="large" />
      <Typography.Title level={4} className="mt-6 text-blue-600">
        Finding Pros Near You
      </Typography.Title>
      <Typography.Text type="secondary">Updating your service area...</Typography.Text>
    </div>
  );
};

export default LocationScreen;