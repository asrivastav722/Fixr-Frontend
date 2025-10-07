import { Form, Input, Button, Card, message } from "antd";
import { loginCustomer } from "../api/customer";
import { loginTechnician } from "../api/technician";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

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
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleStartOver = () => {
    navigate("/"); // Go back to UserTypeSelection
  };

  return (
    <div className="flex justify-center items-center min-h-screen animated-gradient">
  <div className="bg-white backdrop-blur-md shadow-2xl rounded-2xl px-6 py-6 w-[90%] max-w-md text-center">
    <p className="text-left roboto font-medium text-lg text-black mb-4">
      {role === "customer" ? "Customer Login" : "Technician Login"}
    </p>

    <Form layout="vertical" onFinish={onFinish} className="m-0 p-0 flex flex-col gap-4">
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true }, { type: "email", message: "Invalid email" }]}
        className="m-0 p-0"
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true }]}
        className="m-0 p-0"
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <div className="flex flex-col gap-3">
        <Button type="primary" htmlType="submit" className="roboto h-11 text-white bg-black">
          Login
        </Button>        

        <p className="text-sm text-center text-black roboto m-0 p-0 ">
          New here?{" "}
          <a
            href={role === "customer" ? "/c/signup" : "/t/signup"}
            className="text-blue-900 hover:underline"
          >
            Sign Up
          </a>
        </p>
        <button onClick={handleStartOver} className="text-black roboto m-0 p-0 pt-3 h-fit">Go Back </button>

      </div>
    </Form>
  </div>
</div>

  );
}
