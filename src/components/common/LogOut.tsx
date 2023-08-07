import styles from "./LogOut.module.css";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router";

const transition = {
  duration: 0.5,
  ease: "easeInOut",
};
const variants = {
  onHover: {
    scale: 1.1,
    right: "0%",
    transition,
  },
  offHover: {
    scale: 1,
    right: "-4%",
    transition,
  },
};

function LogOut() {
  const [isHover, setIsHover] = useState(false);
  const controls = useAnimation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <motion.div
      animate={controls}
      variants={variants}
      initial="offHover"
      className={styles.container}
      onMouseEnter={() => {
        setIsHover(true);
        controls.start("onHover");
      }}
      onMouseLeave={() => {
        setIsHover(false);
        controls.start("offHover");
      }}
    >
      <div className={styles.arrow}>{isHover ? "➡️" : "⬅️"}</div>
      <button
        onClick={() => {
          navigate("/");
          logout();
        }}
      >
        LOGOUT
      </button>
    </motion.div>
  );
}

export default LogOut;
