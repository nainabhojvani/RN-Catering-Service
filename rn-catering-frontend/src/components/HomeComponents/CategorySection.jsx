import { useState } from "react";
import e1 from "../../assets/images/Event_img/Event-1.svg";
import e1h from "../../assets/images/Event_img/Event-1-hover.svg";
import e2 from "../../assets/images/Event_img/Event-2.svg";
import e2h from "../../assets/images/Event_img/Event-2-hover.svg";
import e3 from "../../assets/images/Event_img/Event-3.svg";
import e3h from "../../assets/images/Event_img/Event-3-hover.svg";
import e4 from "../../assets/images/Event_img/Event-4.svg";
import e4h from "../../assets/images/Event_img/Event-4-hover.svg";
import e5 from "../../assets/images/Event_img/Event-5.svg";
import e5h from "../../assets/images/Event_img/Event-5-hover.svg";
import e6 from "../../assets/images/Event_img/Event-6.svg";
import e6h from "../../assets/images/Event_img/Event-6-hover.svg";
import e7 from "../../assets/images/Event_img/Event-7.svg";
import e7h from "../../assets/images/Event_img/Event-7-hover.svg";
import e8 from "../../assets/images/Event_img/Event-8.svg";
import e8h from "../../assets/images/Event_img/Event-8-hover.svg";
import e9 from "../../assets/images/Event_img/Event-9.svg";
import e9h from "../../assets/images/Event_img/Event-9-hover.svg";
import e10 from "../../assets/images/Event_img/Event-10.svg";
import e10h from "../../assets/images/Event_img/Event-10-hover.svg";
import { useNavigate } from "react-router-dom";

const events = [
  {
    title: "Wedding Catering",
    defaultImg: e1,
    hoverImg: e1h,
    desc: "Creating elegant wedding menus that delight every taste and tradition.",
  },
  {
    title: "Birthday Party Catering",
    defaultImg: e2,
    hoverImg: e2h,
    desc: "Joyful birthday spreads for all ages – from themed treats to classic comfort foods.",
  },
  {
    title: "Engagement Catering",
    defaultImg: e3,
    hoverImg: e3h,
    desc: "Celebrate your special moment with delightful appetizers and gourmet experiences.",
  },
  {
    title: "Social Function Catering",
    defaultImg: e4,
    hoverImg: e4h,
    desc: "From kitty parties to reunions, elevate every social gathering with delicious cuisine.",
  },
  {
    title: "School College Event Catering",
    defaultImg: e5,
    hoverImg: e5h,
    desc: "Nutritious, energetic and fun meals that fuel young minds and hearts.",
  },
  {
    title: "Indoor Catering",
    defaultImg: e6,
    hoverImg: e6h,
    desc: "Premium dining solutions perfectly suited for indoor spaces and private halls.",
  },
  {
    title: "Outdoor Gathering",
    defaultImg: e7,
    hoverImg: e7h,
    desc: "Fresh air, open skies and curated food experiences for outdoor festivities.",
  },
  {
    title: "Event Catering",
    defaultImg: e8,
    hoverImg: e8h,
    desc: "Seamless catering for corporate, cultural or seasonal events of any scale.",
  },
  {
    title: "Party Catering",
    defaultImg: e9,
    hoverImg: e9h,
    desc: "Lively party platters and creative menus to fuel your celebration mood.",
  },
  {
    title: "Home  Catering",
    defaultImg: e10,
    hoverImg: e10h,
    desc: "Bringing restaurant-quality meals to the comfort and warmth of your home.",
  },
];

export default function CategorySection() {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFlip = (index) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="px-6 md:px-16 py-10 bg-[#FFFDF3]">
      <h2 className="text-center text-4xl font-bold mb-10 font-['Dancing_Script',cursive] text-[#19522F]">
        Delightful Events We Cater . . . .
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="w-[240px] h-[320px] perspective cursor-pointer"
            onClick={() => toggleFlip(idx)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 ${
                flippedIndex === idx ? "transform rotate-y-180" : ""
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front */}
              <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-xl flex flex-col justify-center items-center p-4 text-center bg-[#FFFFFF]">
                <img
                  src={hoveredIndex === idx ? event.hoverImg : event.defaultImg}
                  alt={event.title}
                  className="w-16 h-16 mb-6 transition-transform duration-300"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                <h3 className="font-semibold text-lg mb-4 text-[#19522F]">
                  {event.title}
                </h3>

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlip(idx);
                  }}
                  className="text-[15px] font-medium cursor-pointer flex items-center gap-1 mt-4 relative text-[#306344] transition-all duration-300 after:content-[''] after:absolute after:w-0 after:h-[1.5px] after:left-0 after:-bottom-0.5 after:bg-[#D9E45A] hover:after:w-full"
                >
                  View Details <span>→</span>
                </span>
              </div>

              {/* Back */}
              <div className="absolute inset-0 rounded-2xl p-6 shadow-2xl flex flex-col justify-between transition-transform duration-700 ease-in-out backface-hidden transform rotate-y-180 bg-[#306344] text-[#FFFDF3]">
                <p className="text-2xl leading-relaxed text-center px-2 mt-6 font-['Dancing_Script',handwriting] text-[#FFFDF3]">
                  {event.desc}
                </p>
                <button
                  onClick={() =>
                    navigate("/menu", { state: { eventName: event.title } })
                  }
                  className="px-4 py-2 rounded-4xl bg-[#D9E45A] text-[#19522F] transition-colors hover:bg-[#19522F] hover:text-[#D9E45A]"
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
