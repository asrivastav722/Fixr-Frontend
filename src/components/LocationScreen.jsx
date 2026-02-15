import React, { useEffect } from 'react';
import { Spin, Typography } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const LocationScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const phone = state?.isGuest ? null : localStorage.getItem('userPhone');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { longitude: lng, latitude: lat } = pos.coords;
        try {
          await axios.post('http://localhost:5000/api/auth/update-location', { phone, lng, lat });
          navigate('/app', { state: { lng, lat } });
        } catch (e) {
          navigate('/app');
        }
      },
      () => {
        toast.error("Location denied. Entering guest mode.");
        navigate('/app');
      }
    );
  }, [phone, navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Spin size="large" />
      <Typography.Title level={4} className="mt-4">Fetching Nearby Pros...</Typography.Title>
    </div>
  );
};

export default LocationScreen;