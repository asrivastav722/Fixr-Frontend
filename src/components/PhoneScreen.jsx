import React, { useState } from 'react';
import { Button, Input, Form, Typography } from 'antd';
import { auth } from '../firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from 'react-hot-toast';
import axios from 'axios';

const PhoneScreen = ({ onSendOTP, onSkip }) => {
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (values) => {
  setLoading(true);
  try {
    // Just a simple API call to your own server
    await axios.post('http://localhost:5000/api/auth/send-otp', { 
      phone: values.phone // format: +918081111867
    });
    toast.success("OTP Sent!");
    onSendOTP(values.phone);
  } catch (err) {
    toast.error("Error sending OTP");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="h-screen flex flex-col justify-center items-center p-6 bg-gray-50">
      <div id="recaptcha-container"></div>
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <Typography.Title level={2} className="text-center">Welcome</Typography.Title>
        <Form onFinish={handleSendOTP} layout="vertical" className="mt-8">
          <Form.Item name="phone" rules={[{ required: true, message: 'Enter number with country code' }]}>
            <Input size="large" placeholder="918081111867" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading} className="bg-blue-600">
            Get OTP
          </Button>
        </Form>
        <Button type="link" onClick={onSkip} block className="mt-4 text-gray-400">Skip for now</Button>
      </div>
    </div>
  );
};

export default PhoneScreen;