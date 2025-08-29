const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useAuth from "../context/useAuth";
import CenteredMessageBox from "./centerMsgbox";

function BookingForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedEvent, mealPlan } = location.state || {};
  const [eventType, setEventType] = useState(selectedEvent || "");

  const [formData, setFormData] = useState({
    customerName: user?.fullName || "",
    phone: "",
    email: user?.email || "",
    date: "",
    venue: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }
    if (!eventType.trim()) {
      newErrors.eventType = "Event type is required";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    } else {
      const today = new Date().setHours(0, 0, 0, 0);
      const selected = new Date(formData.date).setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }

    if (!formData.venue.trim()) {
      newErrors.venue = "Venue is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = async () => {
    if (!validateForm()) return;

    try {
      await axios.post(
        `${API_URL}/api/bookings`,
        {
          ...formData,
          event: eventType,
          mealPlan,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setMessage(
        "Booking successful! We will contact you soon. You can check your booking in your profile.",
      );
    } catch (err) {
      alert("Failed to submit booking");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center  justify-center min-h-screen">
      <div className="bg-[#FFFDF3] m-20 p-10 rounded-3xl shadow-lg w-full max-w-2xl border border-[#f5f2dd] relative">
        {/* Heading */}
        <h2 className="text-3xl font-serif text-green-900 text-center mb-1 font-normal">
          Reserve Your Catering Service Today!
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mt-5 mb-10 gap-2">
          <button
            type="button"
            className="px-8 py-2 text-3xl   text-green-800 font-medium focus:outline-none cursor-pointer"
            disabled
          >
            Booking Form
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleBookingSubmit();
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
          autoComplete="off"
        >
          {/* --- Name --- */}
          <div>
            <label className="block text-base text-green-900 mb-1 font-serif font-light">
              Full Name
            </label>
            <input
              type="text"
              disabled
              value={formData.customerName}
              className="w-full bg-[#fafdde] border-b border-[#d7e0c5] py-2 px-3 rounded-none focus:outline-none text-green-800 font-normal font-serif cursor-not-allowed"
            />
          </div>

          {/* --- Email --- */}
          <div>
            <label className="block text-base text-green-900 mb-1 font-serif font-light">
              Email
            </label>
            <input
              type="email"
              disabled
              value={formData.email}
              className="w-full bg-[#fafdde] border-b border-[#d7e0c5] py-2 px-3 rounded-none focus:outline-none text-green-800 font-normal font-serif cursor-not-allowed"
            />
          </div>
          {/* --- Phone --- */}
          <div>
            <label className="block text-base text-green-900 mb-1 font-serif font-light">
              Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Enter 10-digit phone number"
              className={`w-full  border-b py-2 px-3 rounded-none focus:outline-none text-green-900  ${
                errors.phone
                  ? "border-red-400 focus:ring-red-200"
                  : "border-[#d7e0c5] focus:ring-green-100"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
          {/* --- Event Type (if any, demo) --- */}
          <div>
            <label className="block text-base text-green-900 mb-1 font-serif font-light">
              Event Type
            </label>
            <input
              type="text"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              placeholder="e.g. Birthday"
              className="w-full  border-b border-[#d7e0c5] py-2 px-3 rounded-none focus:outline-none text-green-800 font-normal font-serif "
            />
            {errors.eventType && (
              <p className="text-red-500 text-sm">{errors.eventType}</p>
            )}
          </div>
          {/* --- Event Date --- */}
          <div>
            <label className="block text-base text-green-900 mb-1 font-serif font-light">
              Event Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className={`w-full  border-b py-2 px-3 rounded-none focus:outline-none text-green-900 font-serif font-normal ${
                errors.date
                  ? "border-red-400 focus:ring-red-200"
                  : "border-[#d7e0c5] focus:ring-green-100"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          {/* --- Venue --- */}
          <div>
            <label className="block text-base text-green-900 mb-1 font-serif font-light">
              Event Location
            </label>
            <input
              type="text"
              value={formData.venue}
              onChange={(e) =>
                setFormData({ ...formData, venue: e.target.value })
              }
              placeholder="Enter venue"
              className={`w-full  border-b py-2 px-3 rounded-none focus:outline-none text-green-900 font-serif font-normal ${
                errors.venue
                  ? "border-red-400 focus:ring-red-200"
                  : "border-[#d7e0c5] focus:ring-green-100"
              }`}
            />
            {errors.venue && (
              <p className="text-red-500 text-xs mt-1">{errors.venue}</p>
            )}
          </div>
        </form>

        {/* Book now button */}
        <div className="w-full flex justify-center mt-8">
          <button onClick={handleBookingSubmit} className="btn">
            Book now
          </button>
        </div>
      </div>
      <CenteredMessageBox
        message={message}
        onClose={() => {
          setMessage(""); // hide box

          navigate(`/profile/${user.username}`);
        }}
      />
    </div>
  );
}

export default BookingForm;
