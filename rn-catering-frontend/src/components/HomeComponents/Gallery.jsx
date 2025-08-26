import React from "react";
import { motion } from "framer-motion";

import g1 from "../../assets/images/Gallery/G-1.jpg";
import g2 from "../../assets/images/Gallery/G-2.avif";
import g3 from "../../assets/images/Gallery/G-3.avif";
import g4 from "../../assets/images/Gallery/G-4.jpg";
import g5 from "../../assets/images/Gallery/G-5.jpg";
import g6 from "../../assets/images/Gallery/G-6.jpg";
import g7 from "../../assets/images/Gallery/G-7.jpg";
import g8 from "../../assets/images/Gallery/G-8.png";
import logo from "../../assets/images/RN_logo(1).png";

const galleryItems = [g1, g2, g3, g4, g5, g6, g7, g8];

export default function Gallery() {
  const radius = 250; // keep radius same
  return (
    <section className="relative w-full h-[800px] flex flex-col items-center bg-[#fef8e0] pt-10">
      {/* Heading */}
      <motion.h2
        className="fade-in text-[3rem] font-semibold mb-30 text-[#19522F] font-['Dancing_Script',cursive]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
      Moments We Capture..
      </motion.h2>

      <div className="relative w-full h-[500px] flex justify-center items-center">
        {/* Center Logo */}
        <motion.img
          src={logo}
          alt="Logo"
          className="absolute w-[200px] h-[200px] object-contain rounded-full border-4 border-purple-800 bg-white p-2 shadow-lg z-10"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120, damping: 12 }}
        />

        {/* Circular Images */}
        {galleryItems.map((img, idx) => {
          const angle = (idx / galleryItems.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <motion.img
  key={idx}
  src={img}
  alt={`Dish ${idx + 1}`}
  className="absolute w-[180px] h-[180px] rounded-full object-cover shadow-lg"
  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
  whileInView={{ x, y, opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{
    duration: 1,
    type: "spring",
    stiffness: 120,
    damping: 12,
    delay: idx * 0.15, // only for entrance animation
  }}
  whileHover={{
    scale: 1.2,
    rotate: 10,
    borderRadius: "50%",
    transition: { type: "spring", stiffness: 300, damping: 20 } // immediate hover
  }}
/>
          );
        })}
      </div>
    </section>
  );
}
