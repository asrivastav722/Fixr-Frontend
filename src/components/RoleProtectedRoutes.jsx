import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spin } from "antd";


export default function RoleProtectedRoute({ role, children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center min-h-screen">
      <Spin size="large" />
    </div>; // Or a loader

  if (!user) {
    return <Navigate to={role === "customer" ? "/login?role=customer" : "/login?role=technician"} replace />;
  }

  if (user.role !== role) {
    return <Navigate to={role === "customer" ? "/login?role=customer" : "/login?role=technician"} replace />;
  }

  return children;
}
