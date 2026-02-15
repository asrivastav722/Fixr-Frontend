import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import OTPScreen from '../components/OTPScreen.jsx';
import OnBoardingScreen from '../Screens/screen.onboarding.jsx';

const PhoneScreen = () => {
  const {id}= useParams()
  const [phone,setPhone]=useState("")
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
  return <OnBoardingScreen
            setPhone={setPhone}
            loading={loading}
            handleSendOTP={handleSendOTP}
            navigate={navigate}
            phone={phone}
  />
};

export default PhoneScreen;