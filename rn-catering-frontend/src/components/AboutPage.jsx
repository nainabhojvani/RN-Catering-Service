import React from "react";
import bgImg from "../assets/images/bg.jpg";
import img19 from "../assets/images/image (19).png";
import img8 from "../assets/images/image (8).png";
import img11 from "../assets/images/image (11).png";
import personImg from "../assets/images/person.png";
import { motion } from "framer-motion";

function AboutHero() {
  return (
    <div className="relative w-full">
      <img src={bgImg} alt="Delicious food" className="w-full h-auto" />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#19522f]/70 via-[#306344]/40 to-[#759782]/20"></div>
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#d9e45a] font-bold text-center text-2xl md:text-6xl font-['Dancing_Script',cursive]"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{ textShadow: "0 0 10px #19522f, 0 0 20px #19522f, 0 0 30px #19522f" }}
      >
        Welcome to RN Catering
      </motion.div>
    </div>
  );
}

function AboutSection({ title, paragraphs, image, reverse }) {
  return (
    <motion.section
      className={`flex flex-wrap items-center justify-center gap-10 px-6 py-12 ${reverse ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, x: reverse ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {image && (
        <motion.div
          className="max-w-sm w-full"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}

        >
          <img src={image} alt={title} className="w-full" style={{ borderRadius: "16px", boxShadow: "0 4px 10px rgba(0,0,0,0.2), 0 8px 20px rgba(117,152,130,0.25), 0 12px 30px rgba(25,82,47,0.3)" }} />
        </motion.div>
      )}
      <div className="max-w-xl text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-[#19522F] mb-4 font-['Dancing_Script',cursive] fade-in" style={{ textShadow: "0 0 10px #759782, 0 0 20px #759782, 0 0 30px #759782" }}>{title}</h2>
        {paragraphs.map((para, idx) => (
          <motion.p
            key={idx}
            className="text-base leading-relaxed mb-4 text-[#306344]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
          >
            {para}
          </motion.p>
        ))}
      </div>
    </motion.section>
  );
}

function Founders() {
  const people = [
    {
      name: "Rutva Jadav",
      desc: "Rutva Jadav, co-founder of RN Catering, brings a deep passion for culinary arts and a strong commitment to quality service. Her eye for detail and creative approach to event catering has helped shape RN Catering into a trusted brand for memorable occasions.",
    },
    {
      name: "Naina Bhojvani",
      desc: "Naina Bhojvani, co-founder of RN Catering, blends her love for hospitality with innovative thinking. She focuses on customer satisfaction, modern trends, and smooth coordination, ensuring that every client enjoys a flawless and flavorful experience.",
    },
  ];
  return (
    <>
      <motion.h2
        className="text-3xl md:text-5xl text-center font-bold text-[#19522F] mb-4 font-['Dancing_Script',cursive] fade-in" style={{ textShadow: "0 0 10px #759782, 0 0 20px #759782, 0 0 30px #759782" }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        Meet the Founders
      </motion.h2>
      {people.map((person, idx) => (
        <motion.section
          key={idx}
          className="flex flex-wrap items-center justify-center gap-8 px-6 py-8 bg-[#FEF8E0] rounded-xl"
          initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: idx * 0.2 }}

        >
          <img src={personImg} alt={person.name} className="h-52" />
          <div className="max-w-2xl">
            <h2 className="text-2xl mb-3 font-bold font-['Dancing_Script',cursive] text-[#19522F]" style={{ textShadow: "0 0 10px #759782, 0 0 20px #759782, 0 0 30px #759782" }}>
              {person.name}
            </h2>
            <p className="text-base leading-relaxed text-[#306344]">{person.desc}</p>
          </div>
        </motion.section>
      ))}
    </>
  );
}

function PromiseSection() {
  const items = [
    "✔ Fresh, locally sourced ingredients",
    "✔ Hygiene and safety standards",
    "✔ Custom menus for every occasion",
    "✔ On-time delivery and setup",
  ];

  return (
    <section className="bg-[#19522F] text-[#FEF8E0] px-10 py-12">
      <motion.h2
        className="text-3xl md:text-4xl font-['Dancing_Script',cursive] mb-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        What makes RN Catering special?
      </motion.h2>
      <ul className="space-y-6 max-w-3xl mx-auto">
        {items.map((text, idx) => (
          <motion.li
            key={idx}
            className={`text-xl px-6 py-4 rounded-full text-center ${idx % 2 === 0
                ? "bg-[#D9E45A] text-[#19522F]"
                : "bg-[#FFFDF3] text-[#306344]"
              }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: idx * 0.2, duration: 0.6, type: "spring" }}
          >
            {text}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

function TeamStats() {
  const stats = [
    { label: "Managers", count: "25+" },
    { label: "Professional Chefs", count: "100+" },
    { label: "Attendants", count: "200+" },
    { label: "Waiters", count: "1000+" },
  ];

  return (
    <section className="py-16 px-6 text-center bg-[#FEF8E0]">
      <motion.h2
        className="text-4xl mb-10 font-['Dancing_Script',cursive] text-[#19522F]"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        style={{ textShadow: "0 0 10px #759782, 0 0 20px #759782, 0 0 30px #759782" }}
      >
        Our Strength
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-6">
        {stats.map((item, idx) => (
          <motion.div
            key={idx}
            className="w-48 shadow-lg rounded-xl p-6 transition-transform hover:scale-105 bg-[#FFFDF3]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: idx * 0.2, duration: 0.6, type: "spring" }}
          >
            <h3 className="text-3xl text-[#19522F] font-bold mb-2">{item.count}</h3>
            <p className="text-base font-semibold text-[#306344]">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutSection
        title="Our Story"
        paragraphs={[
          "RN Catering began with a simple idea: to serve food that brings people together. What started as a small home-based service has now grown into a full-fledged catering company, known for quality and care.",
        ]}
      />
      <AboutSection
        title="About RN Catering"
        paragraphs={[
          "At RN Catering, we turn events into unforgettable culinary experiences. From intimate family gatherings to large corporate events, we deliver food that not only satisfies hunger but also creates memories.",
          "With a team of passionate chefs and dedicated service staff, we ensure that every dish served reflects quality, creativity, and love.",
          "Let us bring flavor, style, and excellence to your special day.",
        ]}
        image={img19}
      />
      <AboutSection
        title="Our Services"
        paragraphs={[
          "RN Catering offers a wide range of catering solutions, from lavish wedding banquets and festive celebrations to intimate home gatherings and professional corporate events.",
          "Whether it's a buffet, sit-down meal, or live cooking station, we bring custom menus, elegant presentation, and top-notch service to the table.",
          "Your vision, our execution — perfectly served every time.",
        ]}
        image={img8}
        reverse
      />
      <AboutSection
        title="Our Commitment"
        paragraphs={[
          "We believe great food begins with great care — from choosing fresh ingredients to presenting it beautifully on your plate.",
          "RN Catering is committed to maintaining the highest standards in taste, hygiene, and client satisfaction.",
          "We don’t just serve food — we serve trust, reliability, and excellence in every bite.",
        ]}
        image={img11}
      />
      <Founders />
      <PromiseSection />
      <TeamStats />
    </>
  );
}
