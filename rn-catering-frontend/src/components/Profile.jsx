import React, { useState, useEffect } from "react";
import useAuth from "../context/useAuth";
import {
  Calendar,
  MapPin,
  Utensils,
  Phone,
  Mail,
  UserCircle2,
  Lock,
  Trash2,
  LogOut,
  PartyPopper,
} from "lucide-react";
import personImg from "../assets/images/person.png";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { user, setUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedBooking, setExpandedBooking] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        const res = await fetch(`${API_URL}/api/bookings/my`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  const toggleBookingDetails = (id) => {
    setExpandedBooking(expandedBooking === id ? null : id);
  };

  if (!user) {
    return (
      <p className="text-center mt-20 text-gray-500 text-lg font-semibold">
        Please login to view your profile.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Left Sidebar with profile and buttons */}
          <div className="bg-white p-8 rounded-tl-3xl rounded-bl-3xl flex flex-col items-center shadow-sm border border-gray-200">
            <img
              src={personImg}
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-gray-300 shadow-md object-cover"
            />
            <h2 className="mt-6 text-3xl font-extrabold tracking-wide flex items-center gap-3 text-gray-900">
              Name: {" " + user.fullName}
            </h2>
            <p className="text-gray-500 mt-1 flex items-center gap-2 text-sm">
              Email:
              {" " + user.email}
            </p>
            {user.phone && (
              <p className="text-gray-500 mt-1 flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                {user.phone}
              </p>
            )}

            <div className="mt-10 w-full space-y-4">
              <button
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 text-gray-700 font-semibold shadow-sm hover:shadow-md transition"
                aria-label="Edit Profile"
              >
                <UserCircle2 className="w-5 h-5" />
                Edit Profile
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 text-gray-700 font-semibold shadow-sm hover:shadow-md transition">
                <Lock className="w-5 h-5" />
                Change Password
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 text-red-600 font-semibold shadow-sm hover:shadow-md transition">
                <Trash2 className="w-5 h-5" />
                Delete Account
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 text-gray-800 font-semibold shadow-sm hover:shadow-md transition"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>

          {/* Right Main Content: Bookings with toggle details */}
          <div className="md:col-span-3 p-8">
            <h3 className="text-3xl font-bold mb-8 text-gray-900 border-b pb-3">
              My Bookings
            </h3>

            {loading ? (
              <p className="text-gray-600">Loading bookings...</p>
            ) : bookings.length === 0 ? (
              <p className="text-gray-600">No bookings yet.</p>
            ) : (
              <div className="space-y-6">
                {bookings.map((b) => {
                  const isExpanded = expandedBooking === b._id;
                  return (
                    <div
                      key={b._id}
                      className="p-6 rounded-xl shadow border border-gray-300 bg-white hover:shadow-md transition"
                    >
                      {/* Summary info with toggle */}
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="flex items-center text-lg font-semibold gap-2 text-gray-800 ">
                            <PartyPopper className="w-4 h-4" />{" "}
                            {b.event || "N/A"}
                          </p>
                          <p className="flex items-center text-sm text-gray-500 gap-2 mt-1">
                            <Calendar className="w-5 h-5 text-gray-600" />
                            {new Date(b.date).toLocaleDateString()}
                          </p>
                          <p className="flex items-center text-sm text-gray-500 gap-2 mt-1">
                            <MapPin className="w-4 h-4" /> {b.venue || "N/A"}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleBookingDetails(b._id)}
                          className="text-indigo-600 hover:text-indigo-800 font-semibold"
                        >
                          {isExpanded ? "Hide Details" : "View Booking"}
                        </button>
                      </div>

                      {/* Expanded detailed info */}
                      {isExpanded && (
                        <>
                          {/* Meal Plan */}
                          <div className="mb-3">
                            <p className="font-semibold text-indigo-700 flex items-center gap-2">
                              <Utensils className="w-5 h-5" />
                              Meal Plan:
                            </p>
                            {Object.entries(b.mealPlan).map(
                              ([mealType, categories]) => (
                                <div key={mealType} className="ml-6 mt-1">
                                  <strong className="text-indigo-600">
                                    {mealType}:
                                  </strong>
                                  <ul className="list-disc list-inside text-gray-600 text-sm">
                                    {Object.entries(categories).map(
                                      ([category, items]) =>
                                        items.length > 0 ? (
                                          <li key={category}>
                                            {category}:{" "}
                                            {items
                                              .map((item) => item.name)
                                              .join(", ")}
                                          </li>
                                        ) : null,
                                    )}
                                  </ul>
                                </div>
                              ),
                            )}
                          </div>

                          {/* Contact Info */}
                          <div className="flex flex-col gap-1 text-gray-600 text-sm">
                            <p className="flex items-center gap-2">
                              <Phone className="w-4 h-4" /> {b.phone}
                            </p>
                            {b.email && (
                              <p className="flex items-center gap-2">
                                <Mail className="w-4 h-4" /> {b.email}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
