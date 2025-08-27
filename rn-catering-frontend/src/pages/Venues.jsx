import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
    testimonial: "\"Our wedding at Grand Palace was flawless—superb service and unforgettable food!\" – Priya & Rahul"
  },
  {
    img: venue2,
    title: "Sunshine Garden Lawn",
    location: "Bopal, Ahmedabad",
    capacity: "Up to 300 Guests",
    bestFor: "Birthdays, Outdoor Events, Engagements",
    testimonial: "\"Had the most beautiful outdoor party. RN Catering made everything smooth and delicious!\" – Kavita J."
  },
  {
    img: venue3,
    title: "City Banquet Hall",
    location: "Maninagar, Ahmedabad",
    capacity: "Up to 200 Guests",
    bestFor: "Corporate Meetups, Private Parties",
    testimonial: "\"Perfect space for our corporate seminar. Everyone loved the refreshments!\" – Mr. Patel, ABC Corp"
  },
  {
    img: venue4,
    title: "Royal Orchid Resort",
    location: "Sola, Ahmedabad",
    capacity: "350 Guests",
    bestFor: "Receptions, Engagements",
    testimonial: "\"Engagement party at Royal Orchid was magical. Highly recommended!\" – Sneha & Anand"
  },
  {
    img: venue5,
    title: "Elegant House",
    location: "Satellite, Ahmedabad",
    capacity: "150 Guests",
    bestFor: "Kitty Parties, Family Dinners",
    testimonial: "\"Cosy and beautiful venue for our family dinner. Will book again!\" – Mehul S."
  },
  {
    img: venue6,
    title: "Green Leaf Banquet",
    location: "Chandkheda, Ahmedabad",
    capacity: "250 Guests",
    bestFor: "Anniversaries, Cultural Events",
    testimonial: "\"Loved the cultural fest here. Great amenities and support throughout the event.\" – Poonam L."
  },
];

const faqs = [
  { q: "How do I book a venue?", a: "You can book through our website or contact us directly via the contact page." },
  { q: "Can I visit the venue before booking?", a: "Yes, we offer venue tours. Contact us to schedule a visit." },
  { q: "Is there parking available?", a: "Yes, all our venues offer dedicated parking for guests." },
  { q: "Do you offer decoration services?", a: "Absolutely! We provide complete decoration packages based on your theme." },
  { q: "Are outside vendors allowed?", a: "Yes, with prior approval. We also offer in-house vendor options." },
  { q: "Can I cancel or reschedule my booking?", a: "Yes, check our cancellation policy or contact support for help." },
  { q: "What are the payment options?", a: "We accept UPI, net banking, cards, and cash." },
  { q: "Do you provide catering at all venues?", a: "Yes, RN Catering is available at all listed venues." },
  { q: "Is the venue air-conditioned?", a: "Yes, all indoor venues are air-conditioned for your comfort." },
  { q: "How far in advance should I book?", a: "We recommend booking at least 1–2 months in advance, especially during peak season." },
];

function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, delay: index * 0.2, ease: "easeOut" },
      });
    } else {
      controls.start({ opacity: 0, x: index % 2 === 0 ? -100 : 100 });
    }
  }, [controls, inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={controls}
      className="bg-[#FEF8E0] rounded-lg shadow-md overflow-hidden border border-[#D1DCD5]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-5 py-4 font-semibold relative flex justify-between items-center bg-[#FEF8E0] text-[#19522F] hover:bg-[#f0f0d5] transition"
      >
        {question}
        <span className="text-2xl">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="px-5 py-3 bg-white text-[#19522F] text-sm border-t border-[#D1DCD5]">
          {answer}
        </div>
      )}
    </motion.div>
  );
}

export default function VenuePage() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <motion.div className="relative w-full h-[500px]">
        <motion.img
          src={venueHeader}
          alt="Venue Banner"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#19522f]/70 via-[#306344]/40 to-[#759782]/20"></div>
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center  text-center px-4 z-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }} // 👈 re-animates every scroll into view

        >
          <h1 className="text-2xl md:text-6xl font-bold leading-snug md:leading-[1.2]
              font-['Dancing_Script',cursive]
              text-[#d9e45a]
              bg-[length:200%_200%] animate-gradient-x
              transition-all duration-1000" style={{ textShadow: "0 0 10px #19522f, 0 0 20px #19522f, 0 0 30px #19522f" }}>
            Our Premium Venues
          </h1>
          <p className="text-7xl md:text-2xl mt-3 max-w-xl font-['Dancing_Script',cursive] text-[#d9e45a]" style={{ textShadow: "0 0 10px #19522f, 0 0 20px #19522f, 0 0 30px #19522f" }}>
            Where RN Catering turns events into memories
          </p>
        </motion.div>
      </motion.div>

      {/* Venue Grid */}
      <motion.section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mt-12 hover: max-w-[1200px] mx-auto px-5">
        {venues.map((venue, i) => {
          // Initial position logic (left, right, bottom)
          let initialPos;
          if (i === 0) initialPos = { opacity: 0, x: -100, y: 0, scale: 0.9 };
          else if (i === 1 || i === 2) initialPos = { opacity: 0, x: 100, y: 0, scale: 0.9 };
          else initialPos = { opacity: 0, x: 0, y: 100, scale: 0.9 };

          return (
            <motion.div
              key={i}
              initial={initialPos}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className={`relative group bg-[#FEF8E0] rounded-xl overflow-hidden border border-[#D1DCD5] shadow-lg transition-transform hover:scale-105 hover:shadow-2xl ${i === 0 ? "sm:col-span-2 lg:col-span-4 lg:row-span-2" : "lg:col-span-2"
                }`} style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.2), 0 8px 20px rgba(117,152,130,0.25), 0 12px 30px rgba(25,82,47,0.3)" }}
            >
              <motion.div className="overflow-hidden relative rounded-t-xl">
                <motion.img
                  src={venue.img}
                  alt={venue.title}
                  className={`w-full object-cover ${i === 0 ? "h-[562px]" : "h-[180px]"} transition-transform`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />


              </motion.div>

              {/* Venue Info - fades out on hover */}
              <motion.div
                className="p-5 text-center"
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h2 className="text-2xl font-semibold text-[#19522F]">{venue.title}</h2>
                <p className="text-[#306344] mt-2"><strong>Location:</strong> {venue.location}</p>
                <p className="text-[#306344]"><strong>Capacity:</strong> {venue.capacity}</p>
                <p className="text-[#306344]"><strong>Best for:</strong> {venue.bestFor}</p>
              </motion.div>
              {/* Testimonial overlay - full cover, visible on hover */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-[#19522f]/90 p-6"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.div
                  className="text-[#d9e45a] text-center max-w-xs"
                  style={{ textShadow: "0 0 10px #19522f, 0 0 20px #19522f, 0 0 30px #19522f" }}
                >
                  <span className="italic font-medium">{venue.testimonial}</span>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-10 mt-10 max-w-[1200px] mx-auto px-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="fade-in text-3xl md:text-5xl text-center font-bold text-[#19522F] mb-12 font-['Dancing_Script',cursive]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }} style={{ textShadow: "0 0 10px #759782, 0 0 20px #759782, 0 0 30px #759782" }}
        >
          Frequently Asked Quetions
        </motion.h2>
        <div className="grid gap-6">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="text-center max-w-[1200px] bg-gradient-to-r from-[#19522F] to-[#306344] text-[#FEF8E0] py-16 rounded-xl mx-auto my-12 px-5 relative overflow-hidden cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ y: -10, scale: 1.02 }}  // subtle bounce and scale up on hover
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">
          Ready to Host Your Event?
        </h2>
        <p className="text-lg md:text-xl mb-6 drop-shadow-sm">
          Contact RN Catering today and let's plan your perfect celebration.
        </p>
        <motion.a
          href="/contact"
          className="inline-block bg-[#FEF8E0] text-[#19522F] font-bold py-4 px-8 rounded-full shadow-lg"
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 15px 5px rgba(255,255,255,0.6)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Get in Touch
        </motion.a>
      </motion.section>
    </div>
  );
}
