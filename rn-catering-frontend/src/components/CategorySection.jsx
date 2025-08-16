// import React, { useState } from "react";
// import e1 from "../assets/images/Event_img/Event-1.svg";
// import e1h from "../assets/images/Event_img/Event-1-hover.svg";
// import e2 from "../assets/images/Event_img/Event-2.svg";
// import e2h from "../assets/images/Event_img/Event-2-hover.svg";
// import e3 from "../assets/images/Event_img/Event-3.svg";
// import e3h from "../assets/images/Event_img/Event-3-hover.svg";
// import e4 from "../assets/images/Event_img/Event-4.svg";
// import e4h from "../assets/images/Event_img/Event-4-hover.svg";
// import e5 from "../assets/images/Event_img/Event-5.svg";
// import e5h from "../assets/images/Event_img/Event-5-hover.svg";
// import e6 from "../assets/images/Event_img/Event-6.svg";
// import e6h from "../assets/images/Event_img/Event-6-hover.svg";
// import e7 from "../assets/images/Event_img/Event-7.svg";
// import e7h from "../assets/images/Event_img/Event-7-hover.svg";
// import e8 from "../assets/images/Event_img/Event-8.svg";
// import e8h from "../assets/images/Event_img/Event-8-hover.svg";
// import e9 from "../assets/images/Event_img/Event-9.svg";
// import e9h from "../assets/images/Event_img/Event-9-hover.svg";
// import e10 from "../assets/images/Event_img/Event-10.svg";
// import e10h from "../assets/images/Event_img/Event-10-hover.svg";

// const categories = [
//   { title: "Wedding Catering", defaultImg: e1, hoverImg: e1h },
//   { title: "Birthday Party Catering", defaultImg: e2, hoverImg: e2h },
//   { title: "Engagement Catering", defaultImg: e3, hoverImg: e3h },
//   { title: "Social Function Catering", defaultImg: e4, hoverImg: e4h },
//   { title: "School College Event Catering", defaultImg: e5, hoverImg: e5h },
//   { title: "Indoor Catering", defaultImg: e6, hoverImg: e6h },
//   { title: "Outdoor Gathering", defaultImg: e7, hoverImg: e7h },
//   { title: "Event Catering", defaultImg: e8, hoverImg: e8h },
//   { title: "Party Catering", defaultImg: e9, hoverImg: e9h },
//   { title: "Home  Catering", defaultImg: e10, hoverImg: e10h },
// ];

// export default function CategorySection() {
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   return (
//     <section className="py-16 bg-[#f9f9f9] text-center px-4">
//       <h2 className="text-3xl md:text-5xl font-bold text-purple-800 mb-10 font-['Dancing_Script',cursive]">
//         Delightful Events We Cater
//       </h2>

//       <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
//         {categories.map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-col items-center"

//           >
//             <div className="w-[100px] h-[100px] rounded-full shadow-md bg-white flex items-center justify-center mb-3">
//               <img
//                 src={hoveredIndex === index ? item.hoverImg : item.defaultImg}
//                 alt={item.title}
//                 className="w-[60px] h-[60px] transition-transform duration-300 transform hover:scale-110 cursor-pointer"
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//               />
//             </div>
//             <p className="text-gray-700 text-sm font-semibold">{item.title}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const events = [
  { title: "Wedding Catering", defaultImg: e1, hoverImg: e1h, desc: "Crafting unforgettable wedding menus that blend elegance and flavor to suit every tradition and taste." },
  { title: "Birthday Party Catering", defaultImg: e2, hoverImg: e2h, desc: "Joyful birthday spreads for all ages – from themed treats to classic comfort foods." },
  { title: "Engagement Catering", defaultImg: e3, hoverImg: e3h, desc: "Celebrate your special moment with delightful appetizers and gourmet experiences." },
  { title: "Social Function Catering", defaultImg: e4, hoverImg: e4h, desc: "From kitty parties to reunions, elevate every social gathering with delicious cuisine." },
  { title: "School College Event Catering", defaultImg: e5, hoverImg: e5h, desc: "Nutritious, energetic and fun meals that fuel young minds and hearts." },
  { title: "Indoor Catering", defaultImg: e6, hoverImg: e6h, desc: "Premium dining solutions perfectly suited for indoor spaces and private halls." },
  { title: "Outdoor Gathering", defaultImg: e7, hoverImg: e7h, desc: "Fresh air, open skies and curated food experiences for outdoor festivities." },
  { title: "Event Catering", defaultImg: e8, hoverImg: e8h, desc: "Seamless catering for corporate, cultural or seasonal events of any scale." },
  { title: "Party Catering", defaultImg: e9, hoverImg: e9h, desc: "Lively party platters and creative menus to fuel your celebration mood." },
  { title: "Home  Catering", defaultImg: e10, hoverImg: e10h, desc: "Bringing restaurant-quality meals to the comfort and warmth of your home." }
];

export default function CategorySection() {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();


  const toggleFlip = (index) => {
    setFlippedIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="px-6 md:px-16 py-10 bg-gray-100">
      <h2 className="text-center text-4xl font-bold mb-10 font-['Dancing_Script',cursive] text-purple-800">Delightful Events We Cater . . . .</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="w-[240px] h-[320px] perspective cursor-pointer"
            onClick={() => toggleFlip(idx)}
          >
            <div className={`relative w-full h-full transition-transform duration-700 ${flippedIndex === idx ? "transform rotate-y-180" : ""}`} style={{ transformStyle: "preserve-3d" }}>

              {/* Front */}
              <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center p-4 text-center">
                <img
                  src={hoveredIndex === idx ? event.hoverImg : event.defaultImg}
                  alt={event.title}
                  className="w-16 h-16 mb-6 transition-transform duration-300"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                <h3 className="font-semibold text-lg mb-4 text-gray-800">{event.title}</h3>

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlip(idx);
                  }}
                  className="text-[15px] font-medium text-purple-500 cursor-pointer 
                              transition-all duration-300 hover:text-purple-700 
                              flex items-center gap-1 mt-4
                              relative after:content-[''] after:absolute after:w-0 after:h-[1.5px] after:left-0 after:-bottom-0.5 
                              after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full"
                >
                  View Details <span>→</span>
                </span>
              </div>

              {/* Back */}
              <div className="absolute inset-0 bg-purple-700 text-white rounded-2xl p-6 shadow-2xl flex flex-col justify-between transition-transform duration-700 ease-in-out backface-hidden transform rotate-y-180">
                <p className="text-2xl leading-relaxed text-white font-large text-center px-2 mt-6 font-['Dancing_Script',handwriting]">{event.desc}</p>
                <button
                  onClick={() => navigate("/menu", { state: { eventName: event.title } })}
                  className="px-4 py-2 bg-white text-purple-900 rounded-4xl transition-colors"
                >
                  Choose Menu
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}