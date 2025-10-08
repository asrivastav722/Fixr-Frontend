import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RoleProtectedRoute from "./components/RoleProtectedRoutes";
import DashboardLayout from "./components/DashboardLayout";

import {  customerRoutes, technicianRoutes } from "./routes";
import AuthRoute from "./auth/AuthRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthRoute />} />
        <Route path="/:id" element={<AuthRoute />} />


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


