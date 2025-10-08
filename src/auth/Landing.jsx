import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Landing({ setRoute, role, setRole }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // ✅ FIX: If logged in, go to correct dashboard instead of login
  useEffect(() => {
    if (!loading && user) {
      const path =
        user.role === "customer" ? "/c/profile" : "/t/profile";
      navigate(path, { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white backdrop-blur-md shadow-2xl rounded-2xl px-10 py-12 w-[90%] max-w-md text-center transform transition-all duration-500 hover:scale-[1.02]">
      {/* Logo */}
      <div className="mb-6">
        <img
          src="/logo192.png"
          alt="Fixr Logo"
          className="mx-auto w-20 h-20 rounded-full shadow-md ring-2 ring-yellow-400"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl text-black mb-2 font-bold roboto">
        Welcome to Fixr
      </h1>
      <p className="text-black poppins text-xs mb-8 font-thin">
        Connecting skilled professionals with customers — choose your role to get started.
      </p>

      {/* Buttons */}
      <div className="space-y-4">
        <button
          onClick={() => {
            setRoute("signup");
            setRole("customer");
          }}
          className="w-full py-3 font-medium roboto rounded-md border-violet-950 border-2 hover:bg-violet-950 text-violet-950 hover:text-white tracking-wide shadow-md 
            transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          I’m a Customer
        </button>

        <button
          onClick={() => {
            setRoute("signup");
            setRole("technician");
          }}
          className="w-full py-3 font-medium roboto rounded-md border-gray-950 border-2 hover:bg-gray-950 text-gray-950 hover:text-white tracking-wide 
            shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          I’m a Technician
        </button>
      </div>
    </div>
  );
}
