import { Form, Input, Button, Card, message } from "antd";
import { loginCustomer } from "../api/customer";
import { loginTechnician } from "../api/technician";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login({ role }) {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onFinish = async (values) => {
    try {
      let data;
      if (role === "customer") {
        data = (await loginCustomer(values)).data;
        localStorage.setItem("token", data.token);
        setUser({ ...data, role: "customer" });
        navigate("/c/profile");
      } else if (role === "technician") {
        data = (await loginTechnician(values)).data;
        localStorage.setItem("techToken", data.token);
        setUser({ ...data, role: "technician" });
        navigate("/t/profile");
      }
      message.success("Login successful!");
    } catch (err) {
      message.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleStartOver = () => {
    navigate("/"); // Go back to UserTypeSelection
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card title={role === "customer" ? "Customer Login" : "Technician Login"} className="w-96 shadow-lg rounded-2xl">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true }, { type: "email" }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>

          <Button type="link" block onClick={handleStartOver} className="mt-2">
            Click here if you selected the wrong role
          </Button>

          <p className="text-sm text-center mt-3">
            New here?{" "}
            <a href={role === "customer" ? "/c/signup" : "/t/signup"} className="text-blue-600">
              Sign Up
            </a>
          </p>
        </Form>
      </Card>
    </div>
  );
}
