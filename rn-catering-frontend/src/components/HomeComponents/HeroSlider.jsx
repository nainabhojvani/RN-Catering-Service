import React, { useEffect, useState } from "react";
import slide1 from "../../assets/images/images(20).jpg";
import slide2 from "../../assets/images/images(21).png";
import slide3 from "../../assets/images/image (19).png";

const slides = [
  {
    image: slide1,
    text: "Presentation That Matches the Taste",
  },
  {
    image: slide2,
    text: "Crafting Moments as Beautiful as the Meals",
  },
  {
    image: slide3,
    text: "Delicious Details, Beautifully Served",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 6000); // ⏳ slower change
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="relative w-full h-[33em] overflow-hidden bg-[#fef8e0]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-[2500ms] ease-in-out
            ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <img
            loading="lazy"
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover scale-105 animate-slowZoom"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#19522f]/70 via-[#306344]/40 to-[#759782]/20"></div>

          {/* Text Container */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-6 md:px-12">
            <h1
              className={`text-2xl md:text-6xl font-bold leading-snug md:leading-[1.2]
              font-['Dancing_Script',cursive]
              text-[#d9e45a]
              bg-[length:200%_200%] animate-gradient-x
              transition-all duration-1000
              ${
                index === current
                  ? "opacity-100 translate-y-0 animate-fadeSlideUp"
                  : "opacity-0 translate-y-6 animate-fadeSlideOut"
              }`}
              style={{
                textShadow:
                  "0 0 10px #19522f, 0 0 20px #19522f, 0 0 30px #19522f",
              }}
            >
              {slide.text}
            </h1>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-[#d9e45a] scale-125"
                : "bg-[#d1dcd5] hover:bg-[#759782]"
            }`}
          ></button>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrent((current - 1 + total) % total)}
        className="absolute top-1/2 left-4 -translate-y-1/2 p-3 rounded-md cursor-pointer text-white text-4xl z-20 hover:text-[#d9e45a] transition-colors"
      >
        &lsaquo;
      </button>
      <button
        onClick={() => setCurrent((current + 1) % total)}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-4xl z-20 hover:text-[#d9e45a] transition-colors p-3 rounded-md cursor-pointer"
      >
        ›
      </button>
    </div>
  );
}
