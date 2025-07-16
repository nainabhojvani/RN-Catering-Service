import contactBanner from '../assets/images/contact.png';

export default function ContactPage() {
  return (
    <div>
      {/* Header Banner */}
      <div className="relative w-full h-[400px] opacity-70">
        <img src={contactBanner} alt="Contact Header" className="w-full h-full object-cover" />
        <h1 className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-[100px] sm:text-[40px] font-dancing">
          Contact Us
        </h1>
      </div>

      {/* Get in Touch Heading */}
      <h1 className="text-[50px] font-semibold mt-10 ml-5 font-dancing sm:text-[28px] sm:text-center">Get in Touch</h1>

      {/* Contact Section */}
      <section className="flex flex-wrap justify-between gap-x-20 px-5 py-12 max-w-7xl mx-auto sm:flex-row sm:items-center">
        {/* Form */}
        <form className="flex-1 min-w-[300px] max-w-[600px]" action="#" method="post">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full text-[25px] bg-[#bee0eb] text-gray-700 rounded-[35px] p-4 my-2 shadow"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full text-[25px] bg-[#bee0eb] text-gray-700 rounded-[35px] p-4 my-2 shadow"
          />
          <input
            type="text"
            name="event-name"
            placeholder="Event Name"
            required
            className="w-full text-[25px] bg-[#bee0eb] text-gray-700 rounded-[35px] p-4 my-2 shadow"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone (optional)"
            className="w-full text-[25px] bg-[#bee0eb] text-gray-700 rounded-[35px] p-4 my-2 shadow"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="w-full text-[25px] bg-[#bee0eb] text-gray-700 rounded-[35px] p-4 my-2 shadow"
          />
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 text-white text-[25px] py-3 px-10 rounded-full mt-5"
          >
            Submit
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex-1 min-w-[300px] mt-10 sm:mt-8">
          <h2 className="text-[40px] font-dancing mb-6">Reach Us</h2>
          <div className="grid gap-6">
            {[
              {
                icon: 'fas fa-map-marker-alt',
                label: 'Address:',
                text: 'RN Catering Services, Ahmedabad, Gujarat, India',
              },
              {
                icon: 'fas fa-phone',
                label: 'Phone:',
                text: '+91-12345-67890',
              },
              {
                icon: 'fas fa-envelope',
                label: 'Email:',
                text: 'info@rncatering.com',
              },
              {
                icon: 'fas fa-clock',
                label: 'Working Hours:',
                text: 'Mon – Sat, 9AM – 8PM',
              },
            ].map((info, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-[#f3f3f3] rounded-xl p-4 shadow-md max-w-[400px]"
              >
                <i className={`${info.icon} text-[28px] sm:text-[24px] text-purple-800 mt-1`}></i>
                <div>
                  <strong className="text-[20px] sm:text-[18px] block">{info.label}</strong>
                  <span className="text-[15px] sm:text-[14px]">{info.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <div className="bg-black pb-12">
        <h1 className="text-white text-center pt-6 text-[45px] font-dancing sm:text-[28px]">Address map</h1>
        <iframe
          src="https://www.google.com/maps?q=Indus+University,+Ahmedabad,+Gujarat,+India&output=embed"
          allowFullScreen=""
          loading="lazy"
          className="w-[80%] h-[300px] mx-auto mt-8 block border-0 sm:w-[90%]"
        ></iframe>
      </div>
    </div>
  );
}
