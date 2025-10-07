import { Form, Input, Button, Card, message, Select, InputNumber } from "antd";
import { registerCustomer } from "../api/customer";
import { registerTechnician } from "../api/technician";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

const { Option } = Select;

export default function Signup({ role }) {
  const navigate = useNavigate();
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
      toast.success("Signup successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };
 
  return (
    <div className="flex justify-center items-center min-h-screen animated-gradient">
      <div className="bg-white backdrop-blur-md shadow-2xl rounded-2xl px-4 py-4 w-[90%] max-w-md text-center" >
        <p className="text-left roboto font-medium text-lg text-bl ">{role === "customer" ? "Customer Signup" : "Technician Signup"} </p>

        <Form layout="vertical" onFinish={onFinish} className="m-0 p-0 d-flex flex-col gap-3">

          <Form.Item label="Full Name" name="name" rules={[{ required: true }]} className="m-0 p-0">
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            className="m-0 p-0"
            rules={[{ required: true }, { type: "email", message: "Invalid email" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Phone" name="phone" className="m-0 p-0">
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item label="Password" className="m-0 p-0" name="password" rules={[{ required: true, min: 6 }]}>
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {role === "technician" && (
            <>
              <Form.Item label="Skills" name="skillset" rules={[{ required: true }]}  className="m-0 p-0">
                <Select mode="tags" placeholder=" Enter your skills">
                  <Option value="Electrician">Electrician</Option>
                  <Option value="Plumber">Plumber</Option>
                  <Option value="Carpenter">Carpenter</Option>
                  <Option value="AC Repair">AC Repair</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Experience (Years)" name="experienceYears"  className="m-0 p-0" rules={[{ required: true }]}>
                <InputNumber placeholder="How many Years of Experience do you have" min={0} max={50} className="w-full" />
              </Form.Item>
            </>
          )}

          <div className="d-flex flex-col gap-2 ">
            <Button type="primary" htmlType="submit" className="roboto h-11 text-white bg-black my-2">
            Sign Up
          </Button>
             
          <p className="text-sm text-center text-black roboto m-0 p-0 "> Already have an account?{" "}
            <a href={role === "customer" ? "/c/login" : "/t/login"} className="text-blue-900 hover:underline ">Login</a>
          </p>

          <button onClick={() => navigate("/")} className="text-black roboto m-0 p-0 h-fit">Go Back </button>

          </div>
         
        </Form>
      </div>
    </div>
  );
}
