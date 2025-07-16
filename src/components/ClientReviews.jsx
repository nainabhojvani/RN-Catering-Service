
const reviews = [
  {
    text: "The catering was absolutely phenomenal — every dish was perfect and beautifully presented!",
    name: "Priya Sharma",
    type: "Wedding Catering",
  },
  {
    text: "Highly professional service and delicious food. Our guests couldn’t stop praising it!",
    name: "Rajesh Verma",
    type: "Birthday Party",
  },
  {
    text: "From planning to execution, RN Catering handled everything smoothly and tastefully.",
    name: "Aditya Desai",
    type: "Corporate Event",
  },
  {
    text: "Our engagement party was a hit thanks to RN Catering! The mocktails and live counters were a huge success.",
    name: "Megha Patel",
    type: "Engagement Catering",
  },
  {
    text: "We had them cater for our college event — budget-friendly, hygienic, and top-notch taste!",
    name: "Rohan Singh",
    type: "College Function",
  },
  {
    text: "Loved the desserts and presentation! The catering added charm to our home celebration.",
    name: "Nisha Mehta",
    type: "Home Catering",
  },
];

export default function ClientReviews() {
  return (
    <section className="bg-white py-14 px-5 text-center -mt-8">
      <h2 className="text-[2.5rem] font-bold font-['Dancing_Script',cursive] text-purple-800 mb-12">
        What Our Clients Say....
      </h2>

      <div className="flex flex-wrap justify-center gap-10">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="max-w-sm text-center relative pb-5 hover:-translate-y-2 transition duration-300"
          >
            {/* Bubble */}
            <div className="relative bg-white border-[2px] border-orange-400 px-6 pt-10 pb-7 rounded-[18px] shadow-md mb-8">
              <span className="absolute top-4 left-4 text-[2.5rem] font-bold text-orange-400 leading-none font-serif">
                “
              </span>
              <p className="text-base text-gray-700 leading-relaxed font-['Poppins',sans-serif] relative z-10">
                {review.text}
              </p>
              <span className="absolute -bottom-3 right-[40px] w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-orange-400"></span>
            </div>

            {/* Client Info */}
            <div className="-mt-3">
              <h4 className="text-base text-right font-semibold text-[#3d2e2e] font-['Poppins',sans-serif] mb-1">
                {review.name}
              </h4>
              <p className="text-sm text-right italic text-gray-500">{review.type}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
