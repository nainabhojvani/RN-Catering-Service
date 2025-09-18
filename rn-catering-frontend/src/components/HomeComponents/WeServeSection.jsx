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
            className="relative h-[220px] overflow-hidden rounded-xl shadow-md cursor-pointer"
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
            {/* Image: mobile = dimmed always, desktop = bright then dims on hover */}
            <motion.img
              src={item.img}
              alt={item.label}
              className="w-full h-full object-cover"
              initial={{ scale: 1, filter: "brightness(100%)" }} // default bright
              variants={{
                hover: { scale: 1.1, filter: "brightness(70%)" }, // dims on hover
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Label: visible on mobile, hidden until hover on desktop */}
            <motion.div
              className="absolute bottom-4 left-4 text-[#d9e45a] font-semibold text-lg 
               opacity-100 md:opacity-0" // mobile always visible, desktop hidden until hover
              style={{
                textShadow:
                  "0 0 10px #759782, 0 0 20px #759782, 0 0 30px #759782",
              }}
              variants={{
                hover: { opacity: 1, x: 0, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {item.label}
              <motion.div
                className="h-[2px] bg-[#d9e45a] mt-1 rounded-lg shadow-[0_0_10px_#d9e45a] 
                 w-full md:w-0" // full width on mobile, animates on desktop
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
