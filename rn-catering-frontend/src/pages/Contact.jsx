import { useState } from 'react';
import contactBanner from '../assets/images/contact.png';
import { FaMapMarkerAlt, FaEnvelope, FaClock, FaPhoneAlt } from "react-icons/fa";

export default function ContactPage() {
  const contactDetails = [
    { icon: <FaMapMarkerAlt />, label: "Address:", text: "RN Catering Services, Ahmedabad, Gujarat, India" },
    { icon: <FaPhoneAlt />, label: "Phone:", text: "+91-12345-67890" },
    { icon: <FaEnvelope />, label: "Email:", text: "info@rncatering.com" },
    { icon: <FaClock />, label: "Working Hours:", text: "Mon – Sat, 9AM – 8PM" },
  ];

  // 🔹 Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventName: '',
    phone: '',
    message: ''
  });

  const [success, setSuccess] = useState(false);

  // 🔹 Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', eventName: '', phone: '', message: '' });
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
    }
  };

  return (
    <div>
      {/* Header Banner */}
      <div className="relative w-full h-[400px] opacity-70">
        <img src={contactBanner} alt="Contact Header" className="w-full h-full object-cover" />
        <h1 className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-6xl font-['Dancing_Script',cursive]">
          Contact Us
        </h1>
      </div>

      {/* Contact Section */}
      <section className="flex flex-wrap gap-x-20 px-5 py-12 max-w-7xl mx-auto sm:flex-row">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 min-w-[300px] max-w-[600px]">
          <h1 className="text-4xl font-['Dancing_Script',cursive] font-semibold mt-10 ml-5">Get in Touch</h1>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full text-[25px] bg-[#bee0eb] text-gray-700 rounded-[35px] p-4 my-2 shadow"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full text-[25px] bg-[#bee0eb] text-gray-700 rounded-[35px] p-4 my-2 shadow"
          />
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            placeholder="Event Name"
            required
            className="w-full text-[25px] bg-[#bee0eb] text-gray-700 rounded-[35px] p-4 my-2 shadow"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone (optional)"
            className="w-full text-[25px] bg-[#bee0eb] text-gray-700 rounded-[35px] p-4 my-2 shadow"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
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

          {/* ✅ Optional success message */}
          {success && <p className="text-green-600 mt-4 text-xl font-medium">Message sent successfully!</p>}
        </form>

        {/* Contact Info */}
        <div className="flex-1 min-w-[300px] mt-[150px]">
          <h2 className="text-4xl font-bold font-['Dancing_Script',cursive] mb-6">Reach Us</h2>
          <div className="grid gap-6">
            {contactDetails.map((info, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#f3f3f3] rounded-xl p-4 shadow-md max-w-[400px]">
                <div className="text-purple-700 text-[28px] sm:text-[24px] flex items-center justify-center w-8 h-8">
                  {info.icon}
                </div>
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
