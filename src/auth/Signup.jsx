import { Form, Input, Button, Card, message, Select, InputNumber } from "antd";
import { registerCustomer } from "../api/customer";
import { registerTechnician } from "../api/technician";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Option } = Select;

export default function Signup({ role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const onFinish = async (values) => {
    try {
      let data;
      if (role === "customer") {
        data = (await registerCustomer(values)).data;
        localStorage.setItem("token", data.token);
        setUser({ ...data, role: "customer" });
        navigate("/c/profile");
      } else if (role === "technician") {
        data = (await registerTechnician(values)).data;
        localStorage.setItem("techToken", data.token);
        setUser({ ...data, role: "technician" });
        navigate("/t/profile");
      }
      message.success("Signup successful!");
    } catch (err) {
      message.error(err.response?.data?.message || "Signup failed");
    }
  };

  const handleStartOver = () => {
    navigate("/"); // Go back to UserTypeSelection
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card title={role === "customer" ? "Customer Signup" : "Technician Signup"} className="w-96 shadow-lg rounded-2xl">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true }, { type: "email", message: "Invalid email" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, min: 6 }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          {role === "technician" && (
            <>
              <Form.Item label="Skills" name="skillset" rules={[{ required: true }]}>
                <Select mode="tags" placeholder="Add your skills">
                  <Option value="Electrician">Electrician</Option>
                  <Option value="Plumber">Plumber</Option>
                  <Option value="Carpenter">Carpenter</Option>
                  <Option value="AC Repair">AC Repair</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Experience (Years)" name="experienceYears" rules={[{ required: true }]}>
                <InputNumber min={0} max={50} style={{ width: "100%" }} />
              </Form.Item>
            </>
          )}

          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>

          <Button type="link" block onClick={handleStartOver} className="mt-2">
            Click here if you selected the wrong role
          </Button>

          <p className="text-sm text-center mt-3">
            Already have an account?{" "}
            <a href={role === "customer" ? "/c/login" : "/t/login"} className="text-blue-600">
              Login
            </a>
          </p>
        </Form>
      </Card>
    </div>
  );
}
