import React from "react";
import g1 from "../../assets/images/Gallery/G-1.jpg";
import g2 from "../../assets/images/Gallery/G-2.avif";
import g3 from "../../assets/images/Gallery/G-3.avif";
import g4 from "../../assets/images/Gallery/G-4.jpg";
import g5 from "../../assets/images/Gallery/G-5.jpg";
import g6 from "../../assets/images/Gallery/G-6.jpg";
import g7 from "../../assets/images/Gallery/G-7.jpg";
import g8 from "../../assets/images/Gallery/G-8.png";
import logo from "../../assets/images/RN_logo.png";

export default function Gallery() {
  return (
    <section className="text-center bg-white py-16 px-4">
      <h2 className="text-[2.75rem] font-semibold mb-12 text-[#19522F] font-['Dancing_Script',cursive]">
        Our Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
        {[g1, g2, g3, g4].map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Dish ${idx + 1}`}
            className="w-full h-[200px] object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          />
        ))}

        <img
          src={logo}
          alt="Logo"
          className="w-full h-[200px] object-contain rounded-xl border-[2px] border-purple-800 bg-white p-5 shadow-xl"
        />

        {[g5, g6, g7, g8].map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Dish ${idx + 5}`}
            className="w-full h-[200px] object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          />
        ))}
      </div>
    </section>
  );
}
