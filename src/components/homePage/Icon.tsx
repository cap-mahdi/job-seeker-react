import { motion, useInView, useAnimation } from "framer-motion";
import styles from "./Icon.module.css";
import { useEffect, useRef } from "react";

interface Props {
  contact: {
    image: string;
    link?: string;
    copy?: string;
  };
}

const variants = {
  hidden: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 },
};
function Icon({ contact }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.a
      ref={ref}
      variants={variants}
      animate={controls}
      initial="hidden"
      href={contact.link}
      target="_blank"
    >
      <img
        src={`/assets/social/${contact.image}`}
        alt={contact.image.split(".")[0]}
        className={styles.social}
      />
    </motion.a>
  );
}

export default Icon;
