import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./TopHome.module.css";
import ShakedButton from "./ShakedButton";
import BackgroundImage from "./BackGroundImage";
import { useNavigate } from "react-router";

const numberOfImages: number = 5;
interface Props {
  scrollToFeatures: () => void;
}

function TopHome({ scrollToFeatures }: Props) {
  const [imageIndex, setImageIndex] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageIndex((i) => (i % numberOfImages) + 1);
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, [imageIndex]);

  return (
    <>
      <header className={styles.container}>
        <BackgroundImage
          key={imageIndex}
          index={imageIndex}
          className={styles.bg}
        />
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.25 }}
          className={styles.text}
        >
          <p>Find your dream job by a simple click.</p>
          <div className={styles.bottom}>
            <ShakedButton onClick={() => navigate("/login")}>
              Get Started
            </ShakedButton>
            <span onClick={() => scrollToFeatures()}>Why choosing us ?</span>
            <span onClick={() => navigate("/aboutus")}>About us</span>
          </div>
        </motion.div>
      </header>
    </>
  );
}

export default TopHome;
