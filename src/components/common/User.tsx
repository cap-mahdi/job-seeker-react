import { Link } from "react-router-dom";
import styles from "./User.module.css";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";

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
    right: "-12%",
    transition,
  },
};

interface props {
  link: string;
  mode: string;
}
function User({ link, mode }: props) {
  const [isHover, setIsHover] = useState(false);
  const controls = useAnimation();
  const { user } = useAuth();
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
      <img src={`/assets/users/${user && user.image}`} alt="user" />
      <div className={styles.userMode}>
        <div className={styles.info}>
          <h1>
            {user && user.first_name} {user && user.last_name}
          </h1>
          <h3>{user && user.email}</h3>
        </div>
        <Link to={link} className={styles.mode}>
          MODE {mode.toUpperCase()}
        </Link>
      </div>
    </motion.div>
  );
}

export default User;
