import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "antd";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (user.role === "customer") navigate("/c/login");
    else navigate("/t/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to={user ? (user.role === "customer" ? "/c/profile" : "/t/profile") : "/"}>
        <h1 className="text-xl font-bold text-blue-600">Fixr</h1>
      </Link>

      <div className="flex items-center space-x-4">
        {!user && (
          <>
            <Link to="/c/login" className="text-gray-700 hover:text-blue-600">Customer Login</Link>
            <Link to="/c/signup" className="text-gray-700 hover:text-blue-600">Customer Signup</Link>
            <Link to="/t/login" className="text-gray-700 hover:text-blue-600">Technician Login</Link>
            <Link to="/t/signup" className="text-gray-700 hover:text-blue-600">Technician Signup</Link>
          </>
        )}

        {user && user.role === "customer" && (
          <>
            <Link to="/c/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
            <Button type="primary" danger size="small" onClick={handleLogout}>Logout</Button>
          </>
        )}

        {user && user.role === "technician" && (
          <>
            <Link to="/t/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
            <Button type="primary" danger size="small" onClick={handleLogout}>Logout</Button>
          </>
        )}
      </div>
    </nav>
  );
}
