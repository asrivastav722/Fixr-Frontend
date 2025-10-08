import { useState, useRef, useEffect } from "react";
import Landing from "./Landing";
import Signup from "./Signup";
import Login from "./Login";
import "./authSlide.css";

const ROUTE_ORDER = ["landing", "signup", "login"];

const AuthRoute = () => {
  const [route, setRoute] = useState("landing");
  const [role, setRole] = useState("customer");
  const [direction, setDirection] = useState(1);
  const prevRoute = useRef("landing");

  useEffect(() => {
    const prevIndex = ROUTE_ORDER.indexOf(prevRoute.current || "landing");
    const newIndex = ROUTE_ORDER.indexOf(route || "landing");

    setDirection(newIndex > prevIndex ? 1 : -1);
    prevRoute.current = route;
  }, [route]);

  const getComponent = () => {
    if (route === "signup")
      return <Signup setRoute={setRoute} role={role} setRole={setRole} />;
    if (route === "login")
      return <Login setRoute={setRoute} role={role} setRole={setRole} />;
    return <Landing setRoute={setRoute} role={role} setRole={setRole} />;
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex justify-center items-center animated-gradient">
      <div
        key={route}
        className={`absolute top-0 left-0 w-full h-full flex justify-center items-center slide-card ${
          direction === 1 ? "slide-left" : "slide-right"
        }`}
      >
        {getComponent()}
      </div>
    </div>
  );
};

export default AuthRoute;
