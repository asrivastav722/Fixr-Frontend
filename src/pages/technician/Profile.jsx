import { Card, Button, Tag, Spin } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Spin className="flex justify-center items-center min-h-screen" size="large" />;

  const handleLogout = () => {
    logout();
    if (user.role === "customer") navigate("/login?role=customer");
    else navigate("/login?role=technician");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card title={`${user.role === "customer" ? "Customer" : "Technician"} Profile`} className="w-96 shadow-lg rounded-2xl text-center">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
        {user.role === "technician" && (
          <>
            <p><strong>Skills:</strong> {user.skillset?.map(skill => <Tag key={skill}>{skill}</Tag>)}</p>
            <p><strong>Experience:</strong> {user.experienceYears} years</p>
            <p><strong>Verified:</strong> {user.verified ? "✅" : "❌"}</p>
          </>
        )}
        <Button type="primary" danger block className="mt-4" onClick={handleLogout}>
          Logout
        </Button>
      </Card>
    </div>
  );
}
