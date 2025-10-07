import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    if (role === "customer") navigate("/c/signup?role=customer");
    else navigate("/t/signup?role=technician");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
      <Card className="shadow-xl rounded-2xl text-center p-10 w-96">
        <h1 className="text-3xl font-bold mb-6">Welcome to Fixr!</h1>
        <p className="text-gray-700 mb-8">Are you a customer looking for services or a technician looking for jobs?</p>
        <div className="flex flex-col space-y-4">
          <Button type="primary" size="large" block onClick={() => handleSelect("customer")}>
            I am a Customer
          </Button>
          <Button type="default" size="large" block onClick={() => handleSelect("technician")}>
            I am a Technician
          </Button>
        </div>
      </Card>
    </div>
  );
}
