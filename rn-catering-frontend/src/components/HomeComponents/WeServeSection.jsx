import React from "react";
import { motion } from "framer-motion";

import mocktails from "../../assets/images/mocktails.jpg";
import fastfood from "../../assets/images/fastfood.jpg";
import desserts from "../../assets/images/desserts.jpg";
import sweets from "../../assets/images/sweets.jpg";
import indian from "../../assets/images/indian-dishes.jpg";
import counter from "../../assets/images/counter.jpg";

const serveItems = [
  { img: mocktails, label: "100+ Mocktails" },
  { img: fastfood, label: "90+ Fast Foods" },
  { img: desserts, label: "80+ Desserts" },
  { img: sweets, label: "75+ Sweets" },
  { img: indian, label: "150+ Dishes" },
  { img: counter, label: "60+ Live Counters" },
];

export default function WeServeSection() {
  return (
    <section className="we-serve-section py-16 px-4 bg-white text-center">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-[#19522F] mb-12 font-['Dancing_Script',cursive]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        We Serve Variety
      </motion.h2>

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {serveItems.map((item, idx) => (
          <motion.div
            key={idx}
            className="relative h-[220px] overflow-hidden rounded-xl shadow-md cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              src={item.img}
              alt={item.label}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />

            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold text-lg"
              initial={{ opacity: 1 }}
              whileHover={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {item.label}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
