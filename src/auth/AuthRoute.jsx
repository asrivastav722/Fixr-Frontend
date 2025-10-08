import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Landing from "./Landing";
import Signup from "./Signup";
import Login from "./Login";

const slideVariants = {
  initial: {
    x: "100%",
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    x: "-100%",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const AuthRoute = () => {
  const { id } = useParams();

  const getComponent = () => {
    if (id === "signup") return <Signup />;
    if (id === "login") return <Login />;
    return <Landing />;
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex justify-center items-center animated-gradient">
      <AnimatePresence mode="wait">
        <motion.div
          key={id || "landing"}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
        >
          {getComponent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthRoute;
