import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface Props {
  children: React.ReactNode;
  everyScroll?: boolean;
  left?: boolean;
  color?: string;
  className?: string;
  width?: "fit-content" | "100%";
}

export const Reveal: React.FC<Props> = function ({
  children,
  width,
  className,
  color = "#f95959",
  left = true,
  everyScroll = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    } else if (everyScroll) {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls, everyScroll]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width,
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={mainControls}
        initial="hidden"
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className={className}
      >
        {children}
      </motion.div>
      <motion.div
        animate={slideControls}
        initial="hidden"
        variants={{
          hidden: left ? { left: "0" } : { right: "0" },
          visible: left ? { left: "100%" } : { right: "100%" },
        }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          left: 0,
          bottom: 4,
          right: 0,
          background: color,
          zIndex: 22,
        }}
      />
    </div>
  );
};
