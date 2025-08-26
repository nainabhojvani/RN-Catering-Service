import { motion } from "framer-motion";
import React from "react"; 
export default function AnimateSection({ children, staggerChildren = 0.15, delay = 0, hoverEffect }) {
  const hover = hoverEffect || {};
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren } }
      }}
    >
      {React.Children.map(children, (child, idx) =>
        React.cloneElement(child, {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: idx * 0.1 + delay, ease: "easeOut" },
          whileHover: hover,
          style: { transformOrigin: "center" },
          viewport: { once: true, amount: 0.2 }
        })
      )}
    </motion.div>
  );
}
