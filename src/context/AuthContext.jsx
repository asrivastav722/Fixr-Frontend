import { createContext, useContext, useEffect, useState } from "react";
import { getCustomerProfile } from "../api/customer";
import { getTechnicianProfile } from "../api/technician";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const customerToken = localStorage.getItem("token");
        const techToken = localStorage.getItem("techToken");

        if (customerToken) {
          // Fetch customer profile
          const res = await getCustomerProfile();
          setUser({ ...res.data, role: "customer" });
        } else if (techToken) {
          // Fetch technician profile
          const res = await getTechnicianProfile();
          setUser({ ...res.data, role: "technician" });
        }
      } catch (err) {
        console.error("Auto-login failed:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("techToken");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("techToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
