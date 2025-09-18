import servicesBanner from "../assets/images/ourservice.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TextSlider from "../components/TextSlider";
import { useNavigate } from "react-router-dom";

import e1 from "../assets/images/Event_img/Event-1.svg";
import e2 from "../assets/images/Event_img/Event-2.svg";
import e3 from "../assets/images/Event_img/Event-3.svg";
import e4 from "../assets/images/Event_img/Event-4.svg";
import e5 from "../assets/images/Event_img/Event-5.svg";
import e6 from "../assets/images/Event_img/Event-6.svg";
import e7 from "../assets/images/Event_img/Event-7.svg";
import e8 from "../assets/images/Event_img/Event-8.svg";
import e9 from "../assets/images/Event_img/Event-9.svg";
import e10 from "../assets/images/Event_img/Event-10.svg";

const events = [
  {
    title: "Wedding Catering",
    image: e1,
    tag: "⭐ Most Booked",
    desc: "Celebrate your big day with a grand feast tailored to your love story. We blend traditional flavors with modern presentation for a luxurious dining experience. Our menus include multi-course meals, themed stations, and elegant desserts. We understand cultural customs and dietary preferences. Every dish is designed to impress both the heart and palate. Let us elevate your wedding with food that speaks of love, joy, and elegance.",
  },
  {
    title: "Birthday Party Catering",
    image: e2,
    desc: "Whether it's a first birthday or a 60th, we make celebrations tasty and fun. Choose from vibrant cakes, finger foods, and theme-based menus for all ages. Our party spreads are packed with flavor and flair, ensuring guests are wowed. We offer customized décor elements with food for added charm. Hygiene and freshness are guaranteed, especially for kids. Every dish is crafted to spark joy and celebration.",
  },
  {
    title: "Engagement Catering",
    image: e3,
    desc: "Mark the start of forever with food that impresses from the first bite. Our engagement catering includes elegant starters, continental fusions, and handcrafted desserts. We focus on creating a romantic ambiance through flavor and presentation. Perfect for cocktail evenings or traditional ring ceremonies. From floral-themed canapés to live food counters, we curate it all. Let your pre-wedding event shine with gourmet excellence.",
  },
  {
    title: "Social Function Catering",
    image: e4,
    desc: "Bring people together over food that everyone loves. We cater to kitty parties, reunions, baby showers, and anniversaries. Choose from homely bites to luxurious buffets. Our chefs specialize in comfort foods with a gourmet twist. Enjoy regional or global cuisines tailored to your event. We handle the food while you enjoy time with your guests, worry-free.",
  },
  {
    title: "School & College Event Catering",
    image: e5,
    desc: "Serve smart and energetic meals that fuel young minds. We provide tasty yet balanced menus for fests, farewells, sports days, and seminars. Kids and teens enjoy vibrant options like wraps, juices, and mini treats. Fresh ingredients and strict hygiene ensure safety. Eco-friendly packaging options are also available. We combine nutrition, taste, and fun in every meal.",
  },
  {
    title: "Indoor Catering",
    image: e6,
    desc: "Perfect for housewarming parties, anniversaries, or private events. Our indoor catering is warm, elegant, and adaptable to any space. We set up full-course meals or buffet counters without any mess. Expect personalized menus, professional staff, and aesthetic plating. Candlelight ambiance or floral table setups – we handle it all. Bring luxury dining to your living room effortlessly.",
  },
  {
    title: "Outdoor Gathering",
    image: e7,
    desc: "Create unforgettable moments under the open sky with curated outdoor menus. From rustic brunches to garden dinner parties, we bring flavor outside. Think barbeques, grills, and food trucks with a personal touch. We work with your outdoor space to make it festive and flavorful. Rain or shine, we’re prepared with mobile kitchens and shelter setups. Nature and food, in perfect harmony.",
  },
  {
    title: "Event Catering",
    image: e8,
    desc: "Big or small, your event deserves food that reflects professionalism and quality. We cater corporate events, exhibitions, cultural programs, and public gatherings. Expect punctual service, excellent coordination, and well-organized buffet systems. Choose from light refreshments to gourmet meals. Custom branding on menu stations is available. We add value, flavor, and efficiency to your occasion.",
  },
  {
    title: "Party Catering",
    image: e9,
    desc: "Add spark to your party with bold flavors and creative presentations. We serve finger foods, cocktails, and desserts that keep guests coming back for more. Choose vibrant themes and let the menu match the vibe. Our setups adapt to pool parties, rooftop lounges, or indoor celebrations. Live counters, interactive chefs, and high energy service – we bring it all. Your party, powered by flavor.",
  },
  {
    title: "Home Catering",
    image: e10,
    desc: "Host like a pro without lifting a finger. Our home catering brings restaurant-quality meals straight to your dining table. Ideal for intimate family dinners, weekend get-togethers, or religious functions. We arrive, set up, serve, and clean – you just enjoy. All food is prepared fresh with zero compromise on hygiene. Let your home be the coziest restaurant in town.",
  },
];

function OurServicesHero() {
  return (
    <div className="relative w-full h-[500px]">
      {/* Background Image */}
      <img
        loading="lazy"
        src={servicesBanner}
        alt="Our Services"
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#19522f]/70 via-[#306344]/40 to-[#759782]/20"></div>

      {/* Centered Text (motion only here) */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center  text-center px-4 z-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }} // 👈 re-animates every scroll into view
      >
        <h1
          className="font-['Dancing_Script',cursive] text-[50px] md:text-[42px] text-[#d9e45a] font-bold text-center text-2xl md:text-6xl "
          style={{
            textShadow: "0 0 10px #19522f, 0 0 20px #19522f, 0 0 30px #19522f",
          }}
        >
          Our Services
        </h1>
        <p
          className="text-2xl md:text-3xl mt-3 max-w-xl font-['Dancing_Script',cursive] text-[#d9e45a]"
          style={{
            textShadow: "0 0 10px #19522f, 0 0 20px #19522f, 0 0 30px #19522f",
          }}
        >
          We don’t just serve food, we create moments worth remembering.
        </p>

        <Link to="/menu" state={{ eventName: "" }} className="btn p-2 m-2">
          Explore Menu
        </Link>
      </motion.div>

      {/* Bottom Text Slider (no animation here) */}
      <div className="absolute bottom-0 left-0 w-full z-30">
        <TextSlider />
      </div>
    </div>
  );
}

const OurServicesScrollStory = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full">
      {events.map((event, index) => (
        <div key={event.title}>
          <div className="relative py-12 px-4">
            <div className="absolute inset-0  bg-white z-0"></div>
            <div
              className={`relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* ICON */}
              <motion.div
                className={`relative z-10 max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div
                  className="w-70 h-70  relative z-10 rounded-full bg-[#FFFDF3] flex items-center justify-center shadow-xl"
                  style={{
                    boxShadow:
                      "0 4px 10px rgba(0,0,0,0.2), 0 8px 20px rgba(117,152,130,0.25), 0 12px 30px rgba(25,82,47,0.3)",
                  }}
                >
                  <img
                    loading="lazy"
                    src={event.image}
                    alt={event.title}
                    className="w-40 h-40 object-contain"
                  />
                </div>
              </motion.div>

              {/* TEXT + BUTTON */}
              <motion.div
                className="w-full md:w-1/2 text-black mt-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className="relative z-10 text-4xl font-bold mb-4 items-center justify-center text-[#19522f] font-['Dancing_Script',cursive]"
                  style={{
                    textShadow:
                      "0 0 10px #759782, 0 0 20px #759782, 0 0 30px #759782",
                  }}
                >
                  {event.title}
                </h2>
                <p className="relative z-10 mb-6 text-lg leading-relaxed  items-center justify-center text-black">
                  {event.desc}
                </p>
                <motion.button
                  whileInView={{ scale: [0.8, 1], opacity: [0, 1] }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  onClick={() =>
                    navigate("/menu", { state: { eventName: event.title } })
                  }
                >
                  <span
                    className="relative z-10 mt-4 inline-block px-8 py-3 bg-[#19522f] text-[#d9e45a] text-lg font-semibold rounded-full shadow-lg hover:bg-[#d9e45a] hover:text-[#19522f] hover:scale-105 transition-transform
"
                  >
                    Book Now
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </div>
          {index < events.length - 1 && (
            <div className="border-t border-[#19522f] w-11/12 mx-auto my-6"></div>
          )}
        </div>
      ))}
    </section>
  );
};
export default function OurServicesPage() {
  return (
    <>
      <OurServicesHero />
      <OurServicesScrollStory />
    </>
  );
}
