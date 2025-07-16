import React, { useState } from "react";
import e1 from "../assets/images/Event_img/Event-1.svg";
import e1h from "../assets/images/Event_img/Event-1-hover.svg";
import e2 from "../assets/images/Event_img/Event-2.svg";
import e2h from "../assets/images/Event_img/Event-2-hover.svg";
import e3 from "../assets/images/Event_img/Event-3.svg";
import e3h from "../assets/images/Event_img/Event-3-hover.svg";
import e4 from "../assets/images/Event_img/Event-4.svg";
import e4h from "../assets/images/Event_img/Event-4-hover.svg";
import e5 from "../assets/images/Event_img/Event-5.svg";
import e5h from "../assets/images/Event_img/Event-5-hover.svg";
import e6 from "../assets/images/Event_img/Event-6.svg";
import e6h from "../assets/images/Event_img/Event-6-hover.svg";
import e7 from "../assets/images/Event_img/Event-7.svg";
import e7h from "../assets/images/Event_img/Event-7-hover.svg";
import e8 from "../assets/images/Event_img/Event-8.svg";
import e8h from "../assets/images/Event_img/Event-8-hover.svg";
import e9 from "../assets/images/Event_img/Event-9.svg";
import e9h from "../assets/images/Event_img/Event-9-hover.svg";
import e10 from "../assets/images/Event_img/Event-10.svg";
import e10h from "../assets/images/Event_img/Event-10-hover.svg";

const categories = [
  { title: "Birthday Party Catering", defaultImg: e1, hoverImg: e1h },
  { title: "Corporate Catering", defaultImg: e2, hoverImg: e2h },
  { title: "Engagement Catering", defaultImg: e3, hoverImg: e3h },
  { title: "Wedding Catering", defaultImg: e4, hoverImg: e4h },
  { title: "Baby Shower Catering", defaultImg: e5, hoverImg: e5h },
  { title: "Event Catering", defaultImg: e6, hoverImg: e6h },
  { title: "Family Gathering", defaultImg: e7, hoverImg: e7h },
  { title: "Festival Catering", defaultImg: e8, hoverImg: e8h },
  { title: "School Event Catering", defaultImg: e9, hoverImg: e9h },
  { title: "Office Party Catering", defaultImg: e10, hoverImg: e10h },
];

export default function CategorySection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-16 bg-[#f9f9f9] text-center px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-purple-800 mb-10 font-['Dancing_Script',cursive]">
        Delightful Events We Cater
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {categories.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
           
          >
            <div className="w-[100px] h-[100px] rounded-full shadow-md bg-white flex items-center justify-center mb-3">
              <img
                src={hoveredIndex === index ? item.hoverImg : item.defaultImg}
                alt={item.title}
                className="w-[60px] h-[60px] transition-transform duration-300 transform hover:scale-110 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </div>
            <p className="text-gray-700 text-sm font-semibold">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
