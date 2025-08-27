import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import AnimateOnScroll from "../AnimateSection";


// 🔽 Import images
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

const events = [
  { title: "Wedding Catering", defaultImg: e1, hoverImg: e1h, desc: "Creating elegant wedding menus that delight every taste and tradition." },
  { title: "Birthday Party Catering", defaultImg: e2, hoverImg: e2h, desc: "Joyful birthday spreads for all ages – from themed treats to classic comfort foods." },
  { title: "Engagement Catering", defaultImg: e3, hoverImg: e3h, desc: "Celebrate your special moment with delightful appetizers and gourmet experiences." },
  { title: "Social Function Catering", defaultImg: e4, hoverImg: e4h, desc: "From kitty parties to reunions, elevate every social gathering with delicious cuisine." },
  { title: "School College Event Catering", defaultImg: e5, hoverImg: e5h, desc: "Nutritious, energetic and fun meals that fuel young minds and hearts." },
  { title: "Indoor Catering", defaultImg: e6, hoverImg: e6h, desc: "Premium dining solutions perfectly suited for indoor spaces and private halls." },
  { title: "Outdoor Gathering", defaultImg: e7, hoverImg: e7h, desc: "Fresh air, open skies and curated food experiences for outdoor festivities." },
  { title: "Event Catering", defaultImg: e8, hoverImg: e8h, desc: "Seamless catering for corporate, cultural or seasonal events of any scale." },
  { title: "Party Catering", defaultImg: e9, hoverImg: e9h, desc: "Lively party platters and creative menus to fuel your celebration mood." },
  { title: "Home Catering", defaultImg: e10, hoverImg: e10h, desc: "Bringing restaurant-quality meals to the comfort and warmth of your home." },
];

export default function CategorySection() {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFlip = (index) => setFlippedIndex((prev) => (prev === index ? null : index));

  return (
    <div className="px-6 md:px-16 py-16 bg-[#FFFDF3]">
      {/* Title Animation */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }}
        className="text-center text-4xl md:text-5xl font-bold mb-12 font-['Dancing_Script',cursive] text-[#19522F]"
        style={{
          textShadow:
            "0 0 10px #759782, 0 0 20px #759782, 0 0 30px #759782",
        }}
      >
        Delightful Events We Cater . . .
      </motion.h2>

      {/* Cards Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card
              event={event}
              index={idx}
              flipped={flippedIndex === idx}
              toggleFlip={() => toggleFlip(idx)}
              navigate={navigate}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function Card({ event, index, flipped, toggleFlip, navigate }) {
  // For 3D tilt effect on hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [15, -15]);
  const rotateY = useTransform(x, [-50, 50], [-15, 15]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: index * 0.1, type: "spring", stiffness: 120 }}
      viewport={{ once: false }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="w-[240px] h-[320px] cursor-pointer"
      onClick={toggleFlip}

    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ${flipped ? "rotate-y-180" : ""}`}
        style={{ transformStyle: "preserve-3d ", borderRadius: "16px", boxShadow: "0 4px 10px rgba(0,0,0,0.2), 0 8px 20px rgba(117,152,130,0.25), 0 12px 30px rgba(25,82,47,0.3)" }}
      >
        {/* Front */}
        <div className="absolute w-full h-full rounded-2xl shadow-lg flex flex-col justify-center items-center p-5 text-center bg-white backface-hidden">
          <motion.img
            src={event.defaultImg}
            alt={event.title}
            className="w-16 h-16 mb-6"
            whileHover={{ scale: 1.2 }}
          />
          <h3 className="font-semibold text-lg mb-4 text-[#19522F]">{event.title}</h3>
          <span
            onClick={(e) => {
              e.stopPropagation();
              toggleFlip();
            }}
            className="text-sm font-medium text-[#306344] mt-4 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-[#D9E45A] hover:after:w-full transition-all"
          >
            View Details →
          </span>
        </div>

        {/* Back */}
        <motion.div
          className="absolute inset-0 rounded-2xl shadow-2xl p-6 flex flex-col justify-between backface-hidden rotate-y-180 bg-[#306344] text-[#FFFDF3]"
          initial={{ opacity: 0 }}
          animate={{ opacity: flipped ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-2xl leading-relaxed text-center px-2 mt-6 font-['Dancing_Script',cursive]">{event.desc}</p>
          <button
            onClick={() => navigate("/menu", { state: { eventName: event.title } })}
            className="px-4 py-2 rounded-full bg-[#D9E45A] text-[#19522F] font-semibold transition hover:bg-[#19522F] hover:text-[#D9E45A]"
          >
            Choose Menu
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
