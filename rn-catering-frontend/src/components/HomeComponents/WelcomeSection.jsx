import React from "react";

export default function WelcomeSection() {
  return (
    <section className="py-16  text-center px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-[#19522F] mb-6 font-['Dancing_Script',cursive]">
          Welcome to RN Catering
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed m-10">
          Where flavor meets elegance and every meal becomes a celebration. At
          RN Catering, we’re passionate about creating memorable culinary
          experiences—crafted with care, beautifully served, and tailored to
          your unique occasion. Whether it’s an intimate gathering or a grand
          event, we bring you the perfect blend of taste, tradition, and
          hospitality.
        </p>
        <a href="/about" className="btn">
          Learn More
        </a>
      </div>
    </section>
  );
}
