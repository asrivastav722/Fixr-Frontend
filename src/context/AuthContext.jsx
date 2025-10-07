import { createContext, useContext, useState, useEffect } from "react";
import { getCustomerProfile } from "../api/customer";
import { getTechnicianProfile } from "../api/technician";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // will include role
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const customerToken = localStorage.getItem("token");
      const techToken = localStorage.getItem("techToken");

      if (!customerToken && !techToken) {
        setLoading(false);
        return;
      }

      try {
        if (customerToken) {
          const { data } = await getCustomerProfile();
          setUser({ ...data.customer, role: "customer" });
        } else if (techToken) {
          const { data } = await getTechnicianProfile();
          setUser({ ...data, role: "technician" });
        }
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("techToken");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
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
