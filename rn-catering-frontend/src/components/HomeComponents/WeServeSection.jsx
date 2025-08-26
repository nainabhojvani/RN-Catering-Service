import React from "react";
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
      <h2 className="text-3xl md:text-5xl font-bold text-[#19522F] mb-12 font-['Dancing_Script',cursive]">
        We Serve Variety
      </h2>

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {serveItems.map((item, idx) => (
          <div
            key={idx}
            className="relative h-[220px] overflow-hidden rounded-xl shadow-md cursor-pointer group"
          >
            <img
              src={item.img}
              alt={item.label}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold text-lg transition-opacity duration-300 group-hover:opacity-0">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
