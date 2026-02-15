import React, { useState } from 'react';
import { Button, Input, Form, Typography } from 'antd';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const OTPScreen = () => {
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.phone) return <Navigate to="/login" />;

  const handleVerify = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        phone: state.phone,
        otp: values.otp
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userPhone', state.phone);
      toast.success("Login Successful!");
      navigate('/location');
    } catch (err) {
      toast.error("Wrong OTP. Try 123456");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center p-6">
      <Typography.Title level={3}>Verify OTP</Typography.Title>
      <Typography.Text className="mb-6 text-gray-400 text-center">
        Enter the code sent to {state.phone}
      </Typography.Text>
      <Form onFinish={handleVerify} className="w-full max-w-xs">
        <Form.Item name="otp" rules={[{ required: true, len: 6 }]}>
          <Input size="large" placeholder="123456" className="text-center tracking-widest font-bold font-mono" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block size="large" loading={loading} className="bg-blue-600">
          Verify
        </Button>
      </Form>
    </div>
  );
};

export default OTPScreen;