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
  const radius = 250;

  return (
    <section className="relative w-full min-h-[800px] flex flex-col items-center bg-[#fef8e0] ">
      {/* Heading */}
      <motion.h2
        className="fade-in text-[2rem] md:text-[3rem] font-semibold mb-12 pb-10 text-[#19522F] font-['Dancing_Script',cursive]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        style={{
          textShadow:
            "0 0 10px #759782, 0 0 20px #759782, 0 0 30px #759782",
        }}
      >
        Moments We Capture..
      </motion.h2>

      {/* Desktop Circular Layout */}
      <div className="hidden md:flex pt-10 relative w-full h-[500px] justify-center items-center">
        {/* Center Logo */}
        <motion.img
          src={logo}
          alt="Logo"
          className="absolute w-[200px] h-[200px] object-contain rounded-full border-4 border-[#19522f] bg-white p-2 shadow-lg z-10"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 120,
            damping: 12,
          }}
          style={{
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.2), 0 8px 20px rgba(117,152,130,0.25), 0 12px 30px rgba(25,82,47,0.3)",
          }}
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
              viewport={{ once: false }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 120,
                damping: 12,
                delay: idx * 0.15,
              }}
              whileHover={{
                scale: 1.2,
                rotate: 10,
                borderRadius: "50%",
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              style={{
                boxShadow:
                  "0 4px 10px rgba(0,0,0,0.2), 0 8px 20px rgba(117,152,130,0.25), 0 12px 30px rgba(25,82,47,0.3)",
              }}
            />
          );
        })}
      </div>

      {/* Mobile Grid Layout */}
      <div className="grid grid-cols-2 gap-4 px-6 md:hidden">
        {galleryItems.map((img, idx) => (
          <motion.div
            key={idx}
            className="relative w-full h-[160px] overflow-hidden rounded-xl shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              delay: idx * 0.1,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              src={img}
              alt={`Dish ${idx + 1}`}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1, filter: "brightness(75%)" }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
