import { Form, Input, Button, Select, InputNumber } from "antd";
import { registerCustomer } from "../api/customer";
import { registerTechnician } from "../api/technician";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const { Option } = Select;

export default function Signup({setRoute, role, setRole}) {
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

  const handleSubmit = (values) => {
    // manual validation using toast
    if (!values.name) return toast.error("Full name is required");
    if (!values.email) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(values.email))
      return toast.error("Please enter a valid email address");
    if (!values.phone) return toast.error("Phone number is required");
    if (!values.password) return toast.error("Password is required");
    if (values.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    if (role === "technician") {
      if (!values.skillset || values.skillset.length === 0)
        return toast.error("Please enter at least one skill");
      if (
        values.experienceYears === undefined ||
        values.experienceYears === null
      )
        return toast.error("Please enter your experience in years");
    }

    onFinish(values);
  };

  return (
      <div className="bg-white backdrop-blur-md shadow-2xl rounded-2xl px-4 py-4 w-full max-w-md text-center">
        <p className="text-left roboto font-medium text-lg text-black mb-4">
          {role === "customer" ? "Customer Signup" : "Technician Signup"}
        </p>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          className="m-0 p-0 flex flex-col gap-3"
          requiredMark={false}
          validateTrigger={false}
        >
          <Form.Item label="Full Name" name="name" className="m-0 p-0">
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item label="Email" name="email" className="m-0 p-0">
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Phone" name="phone" className="m-0 p-0">
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item label="Password" name="password" className="m-0 p-0">
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {role === "technician" && (
            <>
              <Form.Item label="Skills" name="skillset" className="m-0 p-0">
                <Select mode="tags" placeholder="Enter your skills">
                  <Option value="Electrician">Electrician</Option>
                  <Option value="Plumber">Plumber</Option>
                  <Option value="Carpenter">Carpenter</Option>
                  <Option value="AC Repair">AC Repair</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Experience (Years)"
                name="experienceYears"
                className="m-0 p-0"
              >
                <InputNumber
                  placeholder="How many years of experience do you have?"
                  min={0}
                  max={50}
                  className="w-full"
                />
              </Form.Item>
            </>
          )}

          <div className="flex flex-col gap-3">
            <Button
              type="primary"
              htmlType="submit"
              className="roboto h-11 text-white bg-black"
            >
              Sign Up
            </Button>

            <p className="text-sm text-center text-black roboto m-0 p-0">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setRoute("login")}
                className="text-blue-900 hover:underline bg-transparent border-none cursor-pointer"
              >
                Login
              </button>
            </p>


            <button
              type="button"
              onClick={() => setRoute("landing")}
              className="text-black roboto m-0 p-0 h-fit hover:underline"
            >
              Go Back
            </button>
          </div>
        </Form>
      </div>
  );
}
