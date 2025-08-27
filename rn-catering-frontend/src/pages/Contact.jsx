import { useState } from "react";
import contactBanner from "../assets/images/contact.png";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaPhoneAlt,
} from "react-icons/fa";

import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function ContactPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const contactDetails = [
    {
      icon: <FaMapMarkerAlt />,
      label: "Address:",
      text: "RN Catering Services, Ahmedabad, Gujarat, India",
    },
    { icon: <FaPhoneAlt />, label: "Phone:", text: "+91-12345-67890" },
    { icon: <FaEnvelope />, label: "Email:", text: "info@rncatering.com" },
    {
      icon: <FaClock />,
      label: "Working Hours:",
      text: "Mon – Sat, 9AM – 8PM",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventName: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on typing
  };

  // ✅ Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.message.trim())
      newErrors.message = "Please enter your message";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ run validation before API call
    if (!validateForm()) return;

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully 🎉");
        setFormData({
          name: "",
          email: "",
          eventName: "",
          phone: "",
          message: "",
        });
        setErrors({});
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
      console.error("Error submitting contact form:", err);
    }
  };

  return (
    <div>
      {/* Header Banner */}
      <div className="relative w-full h-[400px] opacity-80">
        <img
          src={contactBanner}
          alt="Contact Header"
          className="w-full h-full object-cover"
        />
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#19522F] font-bold text-6xl font-['Dancing_Script',cursive]"
        >
          Contact us
        </motion.h1>
      </div>

      {/* Contact Section */}
      <section className="flex flex-col md:flex-row gap-12 px-5 py-16 max-w-7xl mx-auto">
        {/* Left Contact Info */}
        <div className="flex-1 flex flex-col gap-6">
          {contactDetails.map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 bg-[#FFFDF3] rounded-xl p-6 shadow-md"
            >
              <div className="bg-[#19522F] p-4 rounded-lg text-white text-2xl flex items-center justify-center">
                {info.icon}
              </div>
              <div>
                <p className="text-sm text-[#19522F] font-medium">
                  {info.label}
                </p>
                <p className="text-base text-[#19522F]">{info.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Form */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 bg-[#FFFDF3] rounded-2xl shadow-md p-8"
        >
          <h2 className="text-3xl font-semibold text-center text-[#19522F] mb-6">
            Get in Touch With Us
          </h2>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex  text-2xl font-bold text-[#19522F]  overflow-hidden">
              Contact form
            </div>
          </div>

          {/* Form Fields */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div>
              <label className="block text-sm text-[#19522F] mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter Name"
                onChange={handleChange}
                className={`w-full border-b ${
                  errors.name ? "border-red-500" : "border-gray-400"
                } focus:outline-none transition-all duration-300 py-2 text-[#19522F]`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Event Name */}
            <div>
              <label className="block text-sm text-[#19522F] mb-1">
                Event Name
              </label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                placeholder="Birthday"
                onChange={handleChange}
                className="w-full border-b border-gray-400 focus:outline-none transition-all duration-300 py-2 text-[#19522F]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-[#19522F] mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="catering@gmail.com"
                className={`w-full border-b ${
                  errors.email ? "border-red-500" : "border-gray-400"
                } focus:outline-none transition-all duration-300 py-2 text-[#19522F]`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-[#19522F] mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(+91) 12345 67890"
                className={`w-full border-b ${
                  errors.phone ? "border-red-500" : "border-gray-400"
                } focus:outline-none transition-all duration-300 py-2 text-[#19522F]`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="block text-sm text-[#19522F] mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="How can we help you? feel free to ask us!"
                className={`w-full border-b ${
                  errors.message ? "border-red-500" : "border-gray-400"
                } focus:outline-none transition-all duration-300 py-2 text-[#19522F]`}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <div className="md:col-span-2 text-center">
              <button type="submit" className="btn hover:scale-110">
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#19522F] pb-12"
      >
        <h1 className="text-[#FEF8E0] text-center pt-6 text-[45px] font-dancing sm:text-[28px]">
          Address map
        </h1>
        <iframe
          src="https://www.google.com/maps?q=Indus+University,+Ahmedabad,+Gujarat,+India&output=embed"
          allowFullScreen=""
          loading="lazy"
          className="w-[80%] h-[300px] mx-auto mt-8 block border-0 sm:w-[90%]"
        ></iframe>
      </motion.div>
    </div>
  );
}
