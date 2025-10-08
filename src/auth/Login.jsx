import { Form, Input, Button } from "antd";
import { loginCustomer } from "../api/customer";
import { loginTechnician } from "../api/technician";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Login() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role"); // returns 'technician' or 'customer'
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleStartOver = () => {
    navigate("/");
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let data;
      if (role === "customer") {
        data = (await loginCustomer(values)).data;
        localStorage.setItem("token", data.token);
        setUser({ ...data, role: "customer" });
        navigate("/profile?role=customer");
      } else {
        data = (await loginTechnician(values)).data;
        localStorage.setItem("techToken", data.token);
        setUser({ ...data, role: "technician" });
        navigate("/profile?=technician");
      }
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (values) => {
    // Custom validation instead of Ant Design built-in
    if (!values.email) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(values.email))
      return toast.error("Please enter a valid email address");
    if (!values.password) return toast.error("Password is required");

    onFinish(values);
  };

  return (
    
      <div className="bg-white backdrop-blur-md shadow-2xl rounded-2xl px-6 py-6 w-[90%] max-w-md text-center">
        <p className="text-left roboto font-medium text-lg text-black mb-4">
          {role === "customer" ? "Customer Login" : "Technician Login"}
        </p>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          className="m-0 p-0 flex flex-col gap-4"
          // disable built-in validation visuals
          requiredMark={false}
          validateTrigger={false}
        >
          <Form.Item label="Email" name="email" className="m-0 p-0">
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Password" name="password" className="m-0 p-0">
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <div className="flex flex-col gap-3">
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="roboto h-11 text-white bg-black"
            >
              {loading ? "Logging In" : "Login"}
            </Button>

            <p className="text-sm text-center text-black roboto m-0 p-0">
              New here?{" "}
              <a
                href={role === "customer" ? "/signup?role=customer" : "/signup?role=technician"}
                className="text-blue-900 hover:underline"
              >
                Sign Up
              </a>
            </p>

            <button
              type="button"
              onClick={handleStartOver}
              className="text-black roboto m-0 p-0 pt-3 h-fit hover:underline"
            >
              Go Back
            </button>
          </div>
        </Form>
      </div>

  );
}
