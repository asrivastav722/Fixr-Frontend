import { useState, useEffect } from "react";
import Landing from "./Landing";
import Signup from "./Signup";
import Login from "./Login";
import "./authSlide.css";

const slides = ["landing", "signup", "login"];

const AuthRoute = () => {
  const [role, setRole] = useState("customer");
  const [current, setCurrent] = useState(0);

  // Sync slide with history
  useEffect(() => {
    // Push initial state
    window.history.replaceState({ slide: current }, "");

    const handlePopState = (event) => {
      if (event.state?.slide !== undefined) {
        setCurrent(event.state.slide);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const goTo = (target) => {
    const index = slides.indexOf(target);
    if (index !== -1) {
      setCurrent(index);
      window.history.pushState({ slide: index }, ""); // Push new state
    }
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
