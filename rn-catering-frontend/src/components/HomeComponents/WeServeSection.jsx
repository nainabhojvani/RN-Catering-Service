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
        className="fade-in text-3xl md:text-5xl font-bold text-[#19522F] mb-12 font-['Dancing_Script',cursive]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }} style={{ textShadow: "0 0 10px #759782, 0 0 20px #759782, 0 0 30px #759782" }}
      >
        We Serve Variety...
      </motion.h2>

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {serveItems.map((item, idx) => (
          <motion.div
            key={idx}
            className="relative h-[220px] overflow-hidden rounded-xl shadow-md cursor-pointer "
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              delay: idx * 0.15,
            }}
            whileHover="hover"
          >
            {/* Image dims & zooms on hover */}
            <motion.img
              src={item.img}
              alt={item.label}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              variants={{
                hover: {
                  scale: 1.1, filter: "brightness(70%)", background:
                    "linear-gradient(to top, rgba(25,82,47,1), rgba(48,99,68,1), rgba(117,152,130,1))",
                }
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Label slides diagonally with glowing underline */}
            <motion.div
              className="absolute bottom-4 left-4 text-[#d9e45a] font-semibold text-lg" style={{
                textShadow:
                  "0 0 10px #759782, 0 0 20px #759782, 0 0 30px #759782",
              }}
              initial={{ x: -50, y: 50, opacity: 0 }}
              variants={{
                hover: { x: 0, y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {item.label}
              <motion.div
                className="h-[2px] bg-[#d9e45a] mt-1 rounded-lg shadow-[0_0_10px_#d9e45a]"
                initial={{ width: 0 }}
                variants={{
                  hover: { width: "100%" },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
