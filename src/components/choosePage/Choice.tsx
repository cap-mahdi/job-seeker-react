import styles from "./Choice.module.css";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
};
const titleVariants = {
  onHover: {
    y: -50,
    transition,
    fontSize: "3rem",
  },
  onHoverEnd: {
    y: 0,
    transition,
    fontSize: "2rem",
  },
};

const sloganVariants = {
  onHover: {
    opacity: 1,
    y: -50,
    transition,
  },
  onHoverEnd: {
    opacity: 0,
    y: 0,
    transition,
  },
};

interface Props {
  title: string;
  slogan: string;
  backgroundColor: string;
  color: string;
  link: string;
}
function Choice({
  title,
  slogan,
  backgroundColor,
  color = "white",
  link,
}: Props) {
  const titleControls = useAnimation();
  const sloganControls = useAnimation();
  return (
    <Link
      to={link}
      className={styles.container}
      style={{ backgroundColor, color, textDecoration: "none" }}
      onMouseEnter={() => {
        titleControls.start("onHover");
        sloganControls.start("onHover");
      }}
      onMouseLeave={() => {
        titleControls.start("onHoverEnd");
        sloganControls.start("onHoverEnd");
      }}
    >
      <motion.h2
        className={styles.title}
        animate={titleControls}
        variants={titleVariants}
        initial="onHoverEnd"
      >
        {title}
      </motion.h2>
      <motion.p
        className={styles.slogan}
        animate={sloganControls}
        variants={sloganVariants}
        initial="onHoverEnd"
      >
        {slogan}
      </motion.p>
    </Link>
  );
}

export default Choice;
