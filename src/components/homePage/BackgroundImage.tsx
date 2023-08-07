import { motion } from "framer-motion";
interface BackgroundImageProps {
  index: number;
  className?: string;
}
const variants = {
  hidden: { filter: "blur(5px)" },
  visible: { filter: "blur(0px)" },
};
function BackgroundImage({
  index,
  className,
}: BackgroundImageProps): JSX.Element {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1 }}
      style={{ backgroundImage: `url(/assets/home/${index}.jpg) ` }}
      className={className}
    ></motion.div>
  );
}

export default BackgroundImage;
