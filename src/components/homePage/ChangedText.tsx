import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const variants = {
  leftToRight: {
    left: ["-150%", "150%"],
    transition: { duration: 1.5, ease: "easeIn" },
  },
  rightToLeft: {
    left: ["150%", "-150%"],
    transition: { duration: 1.5, ease: "easeIn" },
  },
};

function ChangedText() {
  const [index, setIndex] = useState(0);
  const controls = useAnimation();
  useEffect(() => {
    const interval = setInterval(() => {
      controls.start(index === 0 ? "leftToRight" : "rightToLeft");
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % 2);
      }, 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, [index, controls]);

  return (
    <div
      style={{
        position: "relative",
        height: 250,
      }}
    >
      {index == 0 ? (
        <>
          {" "}
          <img src="/logo-transparent.png" alt="logo" />
          <p>
            Welcome to JobSeeker, your ultimate companion in the quest for the
            perfect job! JobSeeker is a cutting-edge application designed to
            empower job seekers like you with all the essential tools and
            features needed to navigate the job market with confidence and
            efficiency.
          </p>
        </>
      ) : (
        <>
          <p>
            Our platform is tailored to meet your unique needs and streamline
            your job search process. Whether you're a recent graduate, an
            experienced professional looking for a career change, or someone
            seeking local job opportunities, JobSeeker has you covered.
          </p>
          <img src="/logo-transparent.png" alt="logo" />{" "}
        </>
      )}

      <motion.div
        variants={variants}
        animate={controls}
        style={{
          position: "absolute",
          top: 4,
          left: "-150%",
          bottom: 4,
          right: 0,
          background: "#ffcbcb",
          width: "150%",
          height: "100%",
          zIndex: 22,
        }}
      ></motion.div>
    </div>
  );
}

export default ChangedText;
