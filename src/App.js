import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RoleProtectedRoute from "./components/RoleProtectedRoutes";
import DashboardLayout from "./components/DashboardLayout";

import { publicRoutes, customerRoutes, technicianRoutes } from "./routes";
import Landing from "./auth/Landing";

function App() {
  return (
    <AuthProvider>
      <Routes>

        <Route path="/" element={<Landing />} />
        {/* Public Routes */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Customer Routes */}
        <Route element={<RoleProtectedRoute role="customer"><DashboardLayout /></RoleProtectedRoute>}>
          {customerRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Technician Routes */}
        <Route element={<RoleProtectedRoute role="technician"><DashboardLayout /></RoleProtectedRoute>}>
          {technicianRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;


