import { useScroll, useTransform, motion } from "framer-motion";

export default function ParallaxWrapper({ children, speed = 0.3, className = "" }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -1000 * speed]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
