import { useState } from "react";
import venueHeader from "../assets/images/venue.png";
import venue1 from "../assets/images/vanue1.jpg";
import venue2 from "../assets/images/vanue2.jpg";
import venue3 from "../assets/images/vanue3.jpg";
import venue4 from "../assets/images/vanue4.jpg";
import venue5 from "../assets/images/vanue5.jpg";
import venue6 from "../assets/images/vanue6.jpg";

const venues = [
  {
    img: venue1,
    title: "Grand Palace Banquet",
    location: "SG Highway, Ahmedabad",
    capacity: "Up to 500 Guests",
    bestFor: "Weddings, Receptions, Corporate Events",
  },
  {
    img: venue2,
    title: "Sunshine Garden Lawn",
    location: "Bopal, Ahmedabad",
    capacity: "Up to 300 Guests",
    bestFor: "Birthdays, Outdoor Events, Engagements",
  },
  {
    img: venue3,
    title: "City Banquet Hall",
    location: "Maninagar, Ahmedabad",
    capacity: "Up to 200 Guests",
    bestFor: "Corporate Meetups, Private Parties",
  },
  {
    img: venue4,
    title: "Royal Orchid Resort",
    location: "Sola, Ahmedabad",
    capacity: "350 Guests",
    bestFor: "Receptions, Engagements",
  },
  {
    img: venue5,
    title: "Elegant House",
    location: "Satellite, Ahmedabad",
    capacity: "150 Guests",
    bestFor: "Kitty Parties, Family Dinners",
  },
  {
    img: venue6,
    title: "Green Leaf Banquet",
    location: "Chandkheda, Ahmedabad",
    capacity: "250 Guests",
    bestFor: "Anniversaries, Cultural Events",
  },
];

const faqs = [
  {
    q: "How do I book a venue?",
    a: "You can book through our website or contact us directly via the contact page.",
  },
  {
    q: "Can I visit the venue before booking?",
    a: "Yes, we offer venue tours. Contact us to schedule a visit.",
  },
  {
    q: "Is there parking available?",
    a: "Yes, all our venues offer dedicated parking for guests.",
  },
  {
    q: "Do you offer decoration services?",
    a: "Absolutely! We provide complete decoration packages based on your theme.",
  },
  {
    q: "Are outside vendors allowed?",
    a: "Yes, with prior approval. We also offer in-house vendor options.",
  },
  {
    q: "Can I cancel or reschedule my booking?",
    a: "Yes, check our cancellation policy or contact support for help.",
  },
  {
    q: "What are the payment options?",
    a: "We accept UPI, net banking, cards, and cash.",
  },
  {
    q: "Do you provide catering at all venues?",
    a: "Yes, RN Catering is available at all listed venues.",
  },
  {
    q: "Is the venue air-conditioned?",
    a: "Yes, all indoor venues are air-conditioned for your comfort.",
  },
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 1–2 months in advance, especially during peak season.",
  },
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#FFFD F3] rounded-lg border border-[#D1DCD5] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-5 py-4 font-semibold relative bg-[#FEF8E0] text-[#19522F]"
      >
        {question}
        <span className="absolute right-5 text-xl">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="px-5 py-3 bg-[#fff] text-[#19522F] text-sm border-t border-[#D1DCD5]">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function VenuePage() {
  return (
    <div>
      <div className="text-center">
        <img
          src={venueHeader}
          alt="Venue Header"
          className="w-full h-[400px] object-cover"
        />
        <h1 className="text-4xl mt-4 font-dancing text-[#19522F]">
          Our Venues
        </h1>
        <p className="text-lg mt-2 text-[#306344]">
          Discover exceptional venues where RN Catering delivers unforgettable
          experiences for every occasion.
        </p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-[1200px] mx-auto px-5">
        {venues.map((venue, i) => (
          <div
            key={i}
            className="bg-[#FEF8E0] rounded-lg shadow-md p-5 text-center overflow-hidden border border-[#D1DCD5]"
          >
            <img
              src={venue.img}
              alt={venue.title}
              className="w-full h-[180px] object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-[#19522F]">
              {venue.title}
            </h2>
            <p className="text-[#306344]">
              <strong>Location:</strong> {venue.location}
            </p>
            <p className="text-[#306344]">
              <strong>Capacity:</strong> {venue.capacity}
            </p>
            <p className="text-[#306344]">
              <strong>Best for:</strong> {venue.bestFor}
            </p>
          </div>
        ))}
      </section>

      <section className="py-16 max-w-[1200px] mx-auto px-5">
        <h2 className="text-3xl text-center mb-10 font-semibold text-[#19522F]">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-6">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      <section className="text-center max-w-[1200px] bg-[#19522F] text-[#FEF8E0] py-12 rounded-xl mx-auto my-12">
        <h2 className="text-2xl font-semibold">Ready to Host Your Event?</h2>
        <p className="text-lg mt-3 mb-6">
          Contact RN Catering today and let's plan your perfect celebration.
        </p>
        <a
          href="/contact"
          className="inline-block bg-[#fef8e0] text-[#19522f] font-bold py-3 px-6 rounded-lg hover:scale-105 transition-transform"
        >
          Get in Touch
        </a>
      </section>
    </div>
  );
}
