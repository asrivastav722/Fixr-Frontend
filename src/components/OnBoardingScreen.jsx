import React, { useState } from 'react';
import { Button, Input, Form, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import OTPScreen from './OTPScreen.jsx';

const PhoneScreen = () => {
  const {id}= useParams()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (values) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/send-otp', { phone: values.phone });
      toast.success("OTP Sent! Check your server terminal.");
      // Move to verify and pass the phone number in the navigation state
      navigate('verify', { state: { phone: values.phone } });
    } catch (err) {
      toast.error("Backend error. Is your server running?");
    } finally {
      setLoading(false);
    }
  };

  if (id === "verify") {
    return <OTPScreen />;
  }

  return (
    <div className="h-screen w-screen bg-white p-3">
        <h5 className="text-center">Welcome</h5>
        <Form onFinish={handleSendOTP} layout="vertical" className="mt-8">
          <Form.Item name="phone" rules={[{ required: true, message: 'Required' }]}>
            <Input size="large" placeholder="918081111867" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading} className="bg-blue-600">
            Get OTP
          </Button>
        </Form>
        <Button 
          type="link" 
          onClick={() => navigate('/location', { state: { isGuest: true } })} 
          block className="mt-4 text-gray-400"
        >
          Skip for now
        </Button>
    </div>
  );
};

export default PhoneScreen;