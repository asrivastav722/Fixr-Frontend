import { Layout, Menu } from "antd";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (user.role === "customer") navigate("/login");
    else navigate("/t/login");
  };

  // Define role-specific menu items
  const customerMenu = [
    { key: "profile", label: <Link to="/c/profile">Profile</Link> },
    { key: "book", label: <Link to="/c/book-service">Book Service</Link> },
    { key: "history", label: <Link to="/c/service-history">Service History</Link> },
    { key: "logout", label: <span onClick={handleLogout}>Logout</span> },
  ];

  const technicianMenu = [
    { key: "profile", label: <Link to="/t/profile">Profile</Link> },
    { key: "jobs", label: <Link to="/t/jobs">Assigned Jobs</Link> },
    { key: "earnings", label: <Link to="/t/earnings">Earnings</Link> },
    { key: "logout", label: <span onClick={handleLogout}>Logout</span> },
  ];

  const menuItems = user.role === "customer" ? customerMenu : technicianMenu;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo text-white text-xl font-bold p-4">Fixr</div>
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: 0, textAlign: "center" }}>
          <h2>{user.role === "customer" ? "Customer Dashboard" : "Technician Dashboard"}</h2>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
