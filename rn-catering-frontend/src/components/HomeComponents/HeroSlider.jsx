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
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="relative w-full h-[33em] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4">
            <h1 className="text-white text-3xl md:text-6xl font-bold animate-fade font-['Dancing_Script',cursive]">
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
            className={`h-3 w-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrent((current - 1 + total) % total)}
        className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-4xl z-20"
      >
        ‹
      </button>
      <button
        onClick={() => setCurrent((current + 1) % total)}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-4xl z-20"
      >
        ›
      </button>
    </div>
  );
}
