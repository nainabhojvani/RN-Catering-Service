import React from "react";
import { motion } from "framer-motion";

export default function WelcomeSection() {
  return (
    <section className="bg-hero bg-cover relative flex justify-center py-20">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl px-6"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-[#19522F] mb-4 font-['Dancing_Script',cursive] fade-in" style={{ textShadow: "0 0 10px #759782, 0 0 20px #759782, 0 0 30px #759782" }}>
          Welcome to RN Catering
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Where flavor meets elegance and every meal becomes a celebration. At RN Catering, we’re
          passionate about creating memorable culinary experiences—crafted with care, beautifully
          served, and tailored to your unique occasion. Whether it’s an intimate gathering or a
          grand event, we bring you the perfect blend of taste, tradition, and hospitality.
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
    </section>
  );
}
