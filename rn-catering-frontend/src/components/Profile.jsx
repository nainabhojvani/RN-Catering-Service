const API_URL = import.meta.env.VITE_API_URL;

import React, { useState, useEffect } from "react";
import useAuth from "../context/useAuth";
import personImg from "../assets/images/person.png";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        const res = await fetch(`${API_URL}/api/bookings/my-bookings`, {
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

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Please login to view profile.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-12 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left: Sidebar */}
        <div className="md:w-1/3 bg-gradient-to-b from-blue-100 to-white p-6 flex flex-col items-center border-r">
          <img
            src={personImg}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {user.fullName}
          </h2>
          <p className="text-gray-500">{user.email}</p>
          <button className="mt-6 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition">
            Edit Profile
          </button>
        </div>

        {/* Right: Content */}
        <div className="md:w-2/3 p-8">
          {/* Bookings */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">
              My Bookings
            </h3>
            {loading ? (
              <p className="text-gray-500">Loading bookings...</p>
            ) : bookings.length === 0 ? (
              <p className="text-gray-500">No bookings yet.</p>
            ) : (
              <ul className="space-y-4">
                {bookings.map((b) => (
                  <li
                    key={b._id}
                    className="p-4 border rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        Event: {b.event}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Date: {new Date(b.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Venue: {b.venue || "N/A"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Meal Plan:{" "}
                        {b.mealPlan && typeof b.mealPlan === "object"
                          ? Object.values(b.mealPlan).join(", ")
                          : "N/A"}
                      </p>
                      <p className="text-gray-500 text-sm">Phone: {b.phone}</p>
                      {b.email && (
                        <p className="text-gray-500 text-sm">
                          Email: {b.email}
                        </p>
                      )}
                    </div>
                    <span className="mt-2 md:mt-0 px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                      Confirmed
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Account Settings */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Account Settings
            </h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                Change Password
              </button>
              <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Delete Account
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
