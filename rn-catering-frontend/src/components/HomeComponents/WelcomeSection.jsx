import React from "react";
import { motion } from "framer-motion";
import ParallaxWrapper from "../ParallaxWrapper";

export default function WelcomeSection() {
  return (
    <ParallaxWrapper speed={0.15} className="py-32 text-center bg-hero bg-cover relative">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-[#19522F] mb-6 font-['Dancing_Script',cursive]">
          Welcome to RN Catering
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed m-10">
          Where flavor meets elegance and every meal becomes a celebration. At
          RN Catering, we’re passionate about creating memorable culinary
          experiences—crafted with care, beautifully served, and tailored to
          your unique occasion. Whether it’s an intimate gathering or a grand
          event, we bring you the perfect blend of taste, tradition, and
          hospitality.  
        </p>

        <motion.a
          href="/about"
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="btn"
        >
          Learn More
        </motion.a>
      </motion.div>
    </ParallaxWrapper>
  );
}


