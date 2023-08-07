import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

import styles from "./ShakedButton.module.css";

const getRandomTransformOrigin = (): {
  originX: number;
  originY: number;
} => {
  const value = (16 + 40 * Math.random()) / 100;
  const value2 = (15 + 36 * Math.random()) / 100;
  return {
    originX: value,
    originY: value2,
  };
};

const getRandomDelay = (): number => -(Math.random() * 0.7 + 0.05);

const randomDuration = (): number => Math.random() * 0.07 + 0.23;

const variants = {
  start: {
    rotate: [-5, 5, -3, 3, -2, 2, 0],
    transition: {
      delay: getRandomDelay(),
      repeat: Infinity,
      duration: randomDuration(),
    },
  },
  reset: {
    rotate: 0,
  },
};

interface ShakedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ShakedButton: React.FC<ShakedButtonProps> = function ({
  children,
  onClick = () => {},
}) {
  const controls = useAnimation();
  useEffect(() => {
    const startAnimation = () => {
      controls.start("start");
      setTimeout(() => {
        controls.start("reset");
      }, 300);
    };

    startAnimation();

    const interval = setInterval(() => {
      startAnimation();
    }, 2000);

    return () => clearInterval(interval);
  }, [controls]);
  return (
    <motion.button
      className={styles.button}
      style={{
        ...getRandomTransformOrigin(),
      }}
      variants={variants}
      animate={controls}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default ShakedButton;
