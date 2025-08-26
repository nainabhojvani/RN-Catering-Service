import React, { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { motion } from "framer-motion";

export default function ClientReviews() {
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [formData, setFormData] = useState({ name: "", type: "", text: "" });
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 🔹 Fetch from backend
  useEffect(() => {
    fetch(`${API_URL}/api/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setErrorMsg("Failed to load reviews.");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name || !formData.type || !formData.text) {
      setErrorMsg("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || "Failed to submit review");
      }

      const created = await res.json();
      // Prepend new review to top (newest first)
      setReviews((prev) => [created, ...prev]);
      setFormData({ name: "", type: "", text: "" });
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong.");
    }
  };

  return (
     <section className="bg-[#fffdf3] py-14 px-5 text-center -mt-8">
      <motion.h2
        className="text-[2.5rem] font-bold font-['Dancing_Script',cursive] text-[#19522f] mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        What Our Clients Say....
      </motion.h2>

      {/* Reviews Grid */}
      <motion.div
        className="flex flex-wrap justify-center gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {reviews.slice(0, visibleCount).map((review, idx) => (
          <motion.div
            key={review._id || idx}
            className="max-w-sm text-center relative pb-5 hover:-translate-y-2 transition duration-300"
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-[#ffffff] border-[2px] border-[#d9e45a] px-6 pt-10 pb-7 rounded-[18px] shadow-md mb-8">
              <span className="absolute top-4 left-4 text-[2.5rem] font-bold text-[#d9e45a] leading-none font-serif">
                “
              </span>
              <p className="text-base text-[#306344] leading-relaxed font-['Poppins',sans-serif] relative z-10">
                {review.text}
              </p>
              <span className="-bottom-3 right-[40px] w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#d9e45a] absolute"></span>
            </div>
            <div className="-mt-3">
              <h4 className="text-base text-right font-semibold text-[#19522f] font-['Poppins',sans-serif] mb-1">
                {review.name}
              </h4>
              <p className="text-sm text-right italic text-[#759782]">
                {review.type}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View More */}
      {visibleCount < reviews.length && (
        <button
          className="inline-block px-9 py-3 text-lg font-semibold bg-[#19522f] text-[#ffffff] rounded-full shadow-md hover:bg-[#306344] hover:scale-105 transition mt-6"
          onClick={() => setVisibleCount((c) => c + 3)}
        >
          View More Reviews
        </button>
      )}

      {/* Review Form */}
      <div className="mt-12 max-w-xl mx-auto">
        <h3 className="text-[2.5rem] font-bold font-['Dancing_Script',cursive] text-[#19522f] mb-12">
          Add Your Review
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col text-[#19522f] gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border border-[#d1dcd5] px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Event Type (e.g., Wedding, Birthday)"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="border border-[#d1dcd5] px-4 py-2 rounded"
          />
          <textarea
            placeholder="Write your review here..."
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="border border-[#d1dcd5] px-4 py-2 rounded"
            rows="4"
          />
          <button
            type="submit"
            className="btn"
          >
            Submit Review
          </button>
        </form>

        {successMsg && (
          <div className="bg-[#759782] text-left text-[#ffffff] border px-4 py-3 rounded m-4 transition duration-300">
            Thank you for your valuable feedback!
          </div>
        )}
        {errorMsg && (
          <div className="bg-[#d9e45a] text-left text-[#19522f] border px-4 py-3 rounded m-4 transition duration-300">
            {errorMsg}
          </div>
        )}
      </div>
    </section>
  );
}
