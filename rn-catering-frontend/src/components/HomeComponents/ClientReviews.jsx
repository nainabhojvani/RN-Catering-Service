import React, { useState, useEffect } from "react";

export default function ClientReviews() {
  const API_URL = import.meta.env.VITE_API_URL;
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
    <section className="bg-white py-14 px-5 text-center -mt-8">
      <h2 className="text-[2.5rem] font-bold font-['Dancing_Script',cursive] text-purple-800 mb-12">
        What Our Clients Say....
      </h2>

      {/* Reviews */}
      <div className="flex flex-wrap justify-center gap-10">
        {reviews.slice(0, visibleCount).map((review, idx) => (
          <div
            key={review._id || idx}
            className="max-w-sm text-center relative pb-5 hover:-translate-y-2 transition duration-300"
          >
            <div className="relative bg-white border-[2px] border-orange-400 px-6 pt-10 pb-7 rounded-[18px] shadow-md mb-8">
              <span className="absolute top-4 left-4 text-[2.5rem] font-bold text-orange-400 leading-none font-serif">
                “
              </span>
              <p className="text-base text-gray-700 leading-relaxed font-['Poppins',sans-serif] relative z-10">
                {review.text}
              </p>
              <span className="absolute -bottom-3 right-[40px] w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-orange-400"></span>
            </div>
            <div className="-mt-3">
              <h4 className="text-base text-right font-semibold text-[#3d2e2e] font-['Poppins',sans-serif] mb-1">
                {review.name}
              </h4>
              <p className="text-sm text-right italic text-gray-500">
                {review.type}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {visibleCount < reviews.length && (
        <button
          className="inline-block px-9 py-3 text-lg font-semibold bg-purple-800 text-white rounded-full shadow-md hover:bg-purple-900 hover:scale-105 transition"
          onClick={() => setVisibleCount((c) => c + 3)}
        >
          View More Reviews
        </button>
      )}

      {/* Review Form */}
      <div className="mt-12 max-w-xl mx-auto">
        <h3 className="text-[2.5rem] font-bold font-['Dancing_Script',cursive] text-purple-800 mb-12">
          Add Your Review
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border border-gray-400 px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Event Type (e.g., Wedding, Birthday)"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="border border-gray-400 px-4 py-2 rounded"
          />
          <textarea
            placeholder="Write your review here..."
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="border border-gray-400 px-4 py-2 rounded"
            rows="4"
          />
          <button
            type="submit"
            className="inline-block px-9 py-3 text-lg font-semibold bg-purple-800 text-white rounded-full shadow-md hover:bg-purple-900 transition"
          >
            Submit Review
          </button>
        </form>

        {successMsg && (
          <div className="bg-green-800 text-left text-white border px-4 py-3 rounded m-4 transition duration-300">
            Thank you for your valuable feedback!
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-600 text-left text-white border px-4 py-3 rounded m-4 transition duration-300">
            {errorMsg}
          </div>
        )}
      </div>
    </section>
  );
}
