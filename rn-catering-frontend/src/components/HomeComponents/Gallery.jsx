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

const galleryItems = [g1, g2, g3, g4, logo, g5, g6, g7, g8];

export default function Gallery() {
  return (
    <section className="text-center bg-white py-16 px-4">
      <motion.h2
        className="text-[2.75rem] font-semibold mb-12 text-[#19522F] font-['Dancing_Script',cursive]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Our Gallery
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {galleryItems.map((img, idx) => (
          <motion.img
            key={idx}
            src={img}
            alt={idx === 4 ? "Logo" : `Dish ${idx + 1}`}
            className={`w-full h-[200px] object-cover rounded-xl shadow-lg ${
              idx === 4 ? "object-contain border-[2px] border-purple-800 bg-white p-5" : ""
            }`}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </motion.div>
    </section>
  );
}
