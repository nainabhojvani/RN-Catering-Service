import React from "react";
import bgImg from "../assets/images/bg.jpg";
import img19 from "../assets/images/image (19).png";
import img8 from "../assets/images/image (8).png";
import img11 from "../assets/images/image (11).png";
import personImg from "../assets/images/person.png";

function AboutHero() {
  return (
    <div className="relative w-full">
      <img src={bgImg} alt="Delicious food" className="w-full h-auto" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-2xl md:text-6xl  font-['Dancing_Script',cursive]">
        Welcome to RN Catering
      </div>
    </div>
  );
}

function AboutSection({ title, paragraphs, image, reverse }) {
  return (
    <section className={`flex flex-wrap items-center justify-center gap-10 px-6 py-12 ${reverse ? "flex-row-reverse" : ""}`}>
      {image && (
        <div className="max-w-sm w-full">
          <img src={image} alt={title} className="w-full" />
        </div>
      )}
      <div className="max-w-xl text-left">
        <h2 className="text-3xl mb-4 font-['Dancing_Script',cursive]">{title}</h2>
        {paragraphs.map((para, idx) => (
          <p key={idx} className="text-base leading-relaxed mb-4">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}

function Founders() {
  const people = [
    {
      name: "Rutva Jadav",
      desc:
        "Rutva Jadav, co-founder of RN Catering, brings a deep passion for culinary arts and a strong commitment to quality service. Her eye for detail and creative approach to event catering has helped shape RN Catering into a trusted brand for memorable occasions."
    },
    {
      name: "Naina Bhojvani",
      desc:
        "Naina Bhojvani, co-founder of RN Catering, blends her love for hospitality with innovative thinking. She focuses on customer satisfaction, modern trends, and smooth coordination, ensuring that every client enjoys a flawless and flavorful experience."
    }
  ];
  return (
    <>
      <h2 className="text-3xl md:text-4xl text-center px-6 font-['Dancing_Script',cursive] mb-4">Meet the Founders</h2>
      {people.map((person, idx) => (
        <section
          key={idx}
          className="flex flex-wrap items-center justify-center gap-8 px-6 py-8"
        >
          <img src={personImg} alt={person.name} className="h-52" />
          <div className="max-w-2xl">
            <h2 className="text-2xl mb-3 font-bold font-['Dancing_Script',cursive]">{person.name}</h2>
            <p className="text-base leading-relaxed">{person.desc}</p>
          </div>
        </section>
      ))}
    </>
  );
}

function PromiseSection() {
  const items = [
    "✔ Fresh, locally sourced ingredients",
    "✔ Hygiene and safety standards",
    "✔ Custom menus for every occasion",
    "✔ On-time delivery and setup"
  ];
  return (
    <section className="bg-purple-800 text-white px-10 py-12">
      <h2 className="text-3xl md:text-4xl font-['Dancing_Script',cursive] mb-8 text-center">
        What makes RN Catering special?
      </h2>
      <ul className="space-y-6 max-w-3xl mx-auto">
        {items.map((text, idx) => (
          <li
            key={idx}
            className={`text-xl px-6 py-4 rounded-full text-center ${
              idx % 2 === 0 ? "bg-emerald-500" : "bg-gray-100 text-black"
            }`}
          >
            {text}
          </li>
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
    { label: "Waiters", count: "1000+" }
  ];
  return (
    <section className="py-16 px-6 text-center">
      <h2 className="text-4xl mb-10 font-['Dancing_Script',cursive]">Our Strength</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="w-48 shadow-lg rounded-xl p-6 transition-transform hover:scale-105"
          >
            <h3 className="text-3xl text-purple-800 font-bold mb-2">{item.count}</h3>
            <p className="text-base font-semibold text-[#2a2b3f]">{item.label}</p>
          </div>
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
          "RN Catering began with a simple idea: to serve food that brings people together. What started as a small home-based service has now grown into a full-fledged catering company, known for quality and care."
        ]}
      />
      <AboutSection
        title="About RN Catering"
        paragraphs={[
          "At RN Catering, we turn events into unforgettable culinary experiences. From intimate family gatherings to large corporate events, we deliver food that not only satisfies hunger but also creates memories.",
          "With a team of passionate chefs and dedicated service staff, we ensure that every dish served reflects quality, creativity, and love.",
          "Let us bring flavor, style, and excellence to your special day."
        ]}
        image={img19}
      />
      <AboutSection
        title="Our Services"
        paragraphs={[
          "RN Catering offers a wide range of catering solutions, from lavish wedding banquets and festive celebrations to intimate home gatherings and professional corporate events.",
          "Whether it's a buffet, sit-down meal, or live cooking station, we bring custom menus, elegant presentation, and top-notch service to the table.",
          "Your vision, our execution — perfectly served every time."
        ]}
        image={img8}
        reverse
      />
      <AboutSection
        title="Our Commitment"
        paragraphs={[
          "We believe great food begins with great care — from choosing fresh ingredients to presenting it beautifully on your plate.",
          "RN Catering is committed to maintaining the highest standards in taste, hygiene, and client satisfaction.",
          "We don’t just serve food — we serve trust, reliability, and excellence in every bite."
        ]}
        image={img11}
      />
      <Founders />
      <PromiseSection />
      <TeamStats />
    </>
  );
}
