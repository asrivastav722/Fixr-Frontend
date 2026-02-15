import React, { useState } from 'react';
import { Button, Input, Form, Typography } from 'antd';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const OTPScreen = ({ phone, onVerified, onBack }) => {
  const [loading, setLoading] = useState(false);

  const handleVerify = async (values) => {
    setLoading(true);
    try {
      // 1. Verify with Firebase
      const result = await window.confirmationResult.confirm(values.otp);
      
      // 2. Sync with your MongoDB
      const res = await axios.post('http://localhost:5000/api/auth/firebase-sync', {
        phone: result.user.phoneNumber
      });

      toast.success("Verified!");
      onVerified(res.data); // result has token and user
    } catch (error) {
      toast.error("Invalid OTP code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center p-6">
      <Typography.Title level={3}>Verify OTP</Typography.Title>
      <p className="mb-6 text-gray-500">Sent to +{phone}</p>
      <Form onFinish={handleVerify} className="w-full max-w-xs">
        <Form.Item name="otp" rules={[{ required: true, len: 6 }]}>
          <Input size="large" placeholder="000000" className="text-center tracking-widest font-bold" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block size="large" loading={loading} className="bg-blue-600">
          Verify & Continue
        </Button>
        <Button type="link" onClick={onBack} block className="mt-2 text-gray-400">Change Number</Button>
      </Form>
    </div>
  );
};

export default OTPScreen;