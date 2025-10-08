import { useState } from "react";
import Landing from "./Landing";
import Signup from "./Signup";
import Login from "./Login";
import "./authSlide.css"; // We'll define CSS transitions here

const slides = ["landing", "signup", "login"];

const AuthRoute = () => {
  const [role, setRole] = useState("customer");
  const [current, setCurrent] = useState(0);

  const goTo = (target) => {
    const index = slides.indexOf(target);
    if (index !== -1) setCurrent(index);
  };

  const getComponent = (index) => {
    switch (slides[index]) {
      case "landing":
        return <Landing setRoute={goTo} role={role} setRole={setRole} />;
      case "signup":
        return <Signup setRoute={goTo} role={role} setRole={setRole} />;
      case "login":
        return <Login setRoute={goTo} role={role} setRole={setRole} />;
      default:
        return <Landing setRoute={goTo} role={role} setRole={setRole} />;
    }
  };

  return (
    <div className="auth-container">
      <div
        className="slides-wrapper"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((_, idx) => (
          <div className="slide" key={idx}>
            {getComponent(idx)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthRoute;
