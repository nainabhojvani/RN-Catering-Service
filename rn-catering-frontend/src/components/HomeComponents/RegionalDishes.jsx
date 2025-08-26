import React, { useState } from "react";
import PBM from "../../assets/images/Popular/PBM.jpg";
import DM from "../../assets/images/Popular/DM.jpg";
import CB from "../../assets/images/Popular/CB.jpg";
import AT from "../../assets/images/Popular/AT.jpg";
import MD from "../../assets/images/Popular/MD.jpg";
import VU from "../../assets/images/Popular/VU.jpg";
import Avial from "../../assets/images/Popular/Avial.jpg";
import LR from "../../assets/images/Popular/LR.jpg";
import Shukto from "../../assets/images/Popular/Shukto.jpg";
import LWAD from "../../assets/images/Popular/LWAD.jpg";
import GN from "../../assets/images/Popular/GN.webp";
import CP from "../../assets/images/Popular/CP.webp";
import DH from "../../assets/images/Popular/DH.jpg";
import Undhiyu from "../../assets/images/Popular/Undhiyu.jpg";
import MP from "../../assets/images/Popular/MP.jpeg";
import SK from "../../assets/images/Popular/SK.jpg";
import { motion } from "framer-motion";

const regions = {
  north: [
    {
      title: "Paneer Butter Masala",
      best: true,
      rating: "★★★★★ (4.9)",
      desc: "A rich and creamy tomato-based curry with tender paneer cubes, served hot in weddings & grand events.",
      review: "A hit among all age groups!",
      img: PBM,
    },
    {
      title: "Dal Makhani",
      rating: "★★★★☆ (4.7)",
      desc: "Slow-cooked lentils with butter and cream. A staple in North Indian buffets and traditional functions.",
      review: "Rich in flavor and loved with naan!",
      img: DM,
    },
    {
      title: "Chole Bhature",
      rating: "★★★★☆ (4.6)",
      desc: "Spicy chickpeas paired with fluffy fried bread, often featured in festive catering and youth menus.",
      review: "Perfect for brunch-style events.",
      img: CB,
    },
    {
      title: "Aloo Tikki Chaat",
      rating: "★★★★☆ (4.5)",
      desc: "Crispy potato patties served with chutneys and yogurt — a favorite among starters and live counters.",
      review: "Adds fun to any event’s vibe!",
      img: AT,
    },
  ],
  south: [
    {
      title: "Masala Dosa",
      best: true,
      rating: "★★★★★ (4.9)",
      desc: "Thin crispy rice crepe filled with spicy mashed potatoes, a beloved dish at live counters & breakfast menus.",
      review: "Always a favorite at corporate brunch events.",
      img: MD,
    },
    {
      title: "Vegetable Upma",
      rating: "★★★★☆ (4.6)",
      desc: "Savory semolina porridge with vegetables and spices, ideal for light breakfasts and wellness-focused events.",
      review: "Healthy and loved by elder guests.",
      img: VU,
    },
    {
      title: "Avial",
      rating: "★★★★☆ (4.5)",
      desc: "A thick blend of vegetables in coconut and yogurt gravy — adds authenticity to traditional South Indian catering.",
      review: "Rich in South Indian essence.",
      img: Avial,
    },
    {
      title: "Lemon Rice",
      rating: "★★★★☆ (4.4)",
      desc: "Zesty and fragrant rice dish with mustard, curry leaves, and peanuts — light, fresh, and popular in buffets.",
      review: "A refreshing touch in any menu.",
      img: LR,
    },
  ],
  east: [
    {
      title: "Shukto",
      rating: "★★★★☆ (4.6)",
      desc: "A Bengali mix vegetable curry with bitter gourd and spices — known for balancing rich dishes in the menu.",
      review: "A must-have in traditional Bengali events.",
      img: Shukto,
    },
    {
      title: "Luchi with Aloo Dum",
      best: true,
      rating: "★★★★★ (4.9)",
      desc: "Fluffy deep-fried flatbreads served with spicy potato curry, especially popular at morning and evening functions.",
      review: "Every plate goes clean with this one!",
      img: LWAD,
    },
    {
      title: "Ghugni",
      rating: "★★★★☆ (4.5)",
      desc: "Spiced yellow peas curry garnished with onion and lemon — great as a starter or snack counter dish.",
      review: "East India's version of chaat!",
      img: GN,
    },
    {
      title: "Chhena Poda",
      rating: "★★★★☆ (4.3)",
      desc: "Smoky, caramelized paneer dessert from Odisha — a surprising hit at sweet counters.",
      review: "Dessert with a twist.",
      img: CP,
    },
  ],
  west: [
    {
      title: "Dhokla",
      best: true,
      rating: "★★★★★ (5.0)",
      desc: "Spongy steamed savory cake made from fermented batter — Gujarat’s favorite, loved across age groups.",
      review: "Soft, healthy, and high in demand.",
      img: DH,
    },
    {
      title: "Undhiyu",
      rating: "★★★★☆ (4.6)",
      desc: "Traditional winter dish made with mixed vegetables and fenugreek dumplings — flavorful and hearty.",
      review: "An iconic item in winter weddings.",
      img: Undhiyu,
    },
    {
      title: "Misal Pav",
      rating: "★★★★☆ (4.5)",
      desc: "Spicy curry of sprouts served with pav and toppings — vibrant and best for live counters or evening events.",
      review: "Great for fusion catering menus.",
      img: MP,
    },
    {
      title: "Sabudana Khichdi",
      rating: "★★★★☆ (4.3)",
      desc: "Maharashtrian favorite made of tapioca pearls — light, healthy, and popular for fasting-friendly menus.",
      review: "Simple yet so satisfying.",
      img: SK,
    },
  ],
};

export default function RegionalDishes() {
  const [active, setActive] = useState("north");

  return (
    <section className="bg-[#fef8e0] py-10 px-5 text-center">
      <motion.h2
        className="text-[2.5rem] mb-8 text-[#19522f] font-['Dancing_Script',cursive] font-bold"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Popular Vegetarian Dishes Across India
      </motion.h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {Object.keys(regions).map((region) => (
          <button
            key={region}
            className={`px-6 py-2 border-2 text-lg font-semibold rounded-full transition-all duration-300 font-['Poppins',sans-serif] ${
              active === region
                ? "bg-[#19522f] text-[#ffffff] border-[#19522f]"
                : "text-[#19522f] bg-[#fef8e0] border-[#19522f] hover:bg-[#19522f] hover:text-[#ffffff]"
            }`}
            onClick={() => setActive(region)}
          >
            {region.charAt(0).toUpperCase() + region.slice(1)}
          </button>
        ))}
      </div>

      {/* Dish Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {regions[active].map((dish, idx) => (
          <motion.div
            key={idx}
            className="flex rounded-[18px] shadow-lg overflow-hidden min-h-[300px] bg-[#ffffff]"
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Text */}
            <div className="flex flex-col justify-center w-[45%] px-6 py-8 text-left">
              <h3 className="text-xl font-bold text-[#306344] mb-2">
                {dish.title}{" "}
                {dish.best && (
                  <span className="bg-orange-400 text-[#ffffff] text-xs px-2 py-1 rounded ml-2 align-middle">
                    Best Seller
                  </span>
                )}
              </h3>
              <div className="text-orange-400 mb-2">{dish.rating}</div>
              <p className="text-[#759782] leading-relaxed mb-1 text-sm">
                {dish.desc}
              </p>
              <p className="italic text-[#a0aea5] text-sm mt-2">“{dish.review}”</p>
            </div>

            {/* Image */}
            <div className="w-[55%] h-full overflow-hidden">
              <img
                src={dish.img}
                alt={dish.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View Menu Button */}
      <div className="mt-16">
        <a
          href="/menu"
          className="btn"
        >
          View Full Menu
        </a>
      </div>
    </section>
  );
}
