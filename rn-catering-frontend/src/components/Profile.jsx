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
import CenteredMessageBox from "./centerMsgbox";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { user, setUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedBooking, setExpandedBooking] = useState(null);

  // Edit Profile fields & visibility
  const [editVisible, setEditVisible] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editFullName, setEditFullName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // Change Password fields & visibility
  const [changePassVisible, setChangePassVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Delete Account feedback
  const [deleteAccountMsg, setDeleteAccountMsg] = useState("");

  // Centered modal message state (for success messages)
  const [centeredMsg, setCenteredMsg] = useState("");

  useEffect(() => {
    if (user) {
      setEditUsername(user.username || "");
      setEditFullName(user.fullName || "");
      setEditEmail(user.email || "");
    }
  }, [user]);

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

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  // Edit Profile submit
  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/user/edit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: editUsername,
          fullName: editFullName,
          email: editEmail,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setCenteredMsg("Profile updated successfully.");
        setEditVisible(false);
      } else {
        alert(data.message || "Error updating profile.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error updating profile.");
    }
  };

  // Change Password submit
  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/user/change-password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCenteredMsg("Password changed successfully.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setChangePassVisible(false);
      } else {
        alert(data.message || "Error changing password.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error changing password.");
    }
  };

  // Delete Account submit
  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    )
      return;

    setDeleteAccountMsg("");
    try {
      const res = await fetch(`${API_URL}/api/user/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setDeleteAccountMsg("Account deleted successfully.");
        localStorage.clear();
        setUser(null);
        window.location.href = "/";
      } else {
        setDeleteAccountMsg(data.message || "Error deleting account.");
      }
    } catch (err) {
      console.error(err);
      setDeleteAccountMsg("Server error deleting account.");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;
    try {
      const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        setBookings(bookings.filter((b) => b._id !== bookingId));
      } else {
        alert("Failed to delete booking.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting booking.");
    }
  };

  if (!user) {
    return (
      <p className="text-center mt-20 text-gray-500 text-lg font-semibold">
        Please login to view your profile.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#fef8e0] py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto bg-[#fffdf3] shadow-lg rounded-3xl overflow-hidden">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Left Sidebar with profile and buttons */}
          <div className="bg-white p-8 rounded-tl-3xl rounded-bl-3xl flex flex-col items-center shadow-sm border border-gray-200">
            <img
              loading="lazy"
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
                onClick={() => {
                  setEditVisible(!editVisible);
                  setChangePassVisible(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 text-gray-700 font-semibold shadow-sm hover:shadow-md transition"
                aria-label="Edit Profile"
              >
                <UserCircle2 className="w-5 h-5" />
                Edit Profile
              </button>
              <button
                onClick={() => {
                  setChangePassVisible(!changePassVisible);
                  setEditVisible(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 text-gray-700 font-semibold shadow-sm hover:shadow-md transition"
              >
                <Lock className="w-5 h-5" />
                Change Password
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 text-red-600 font-semibold shadow-sm hover:shadow-md transition"
              >
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

            {deleteAccountMsg && (
              <p className="mt-4 text-red-600 text-center">
                {deleteAccountMsg}
              </p>
            )}
          </div>

          {/* Right Main Content: Bookings and Forms */}
          <div className="md:col-span-3 p-8">
            {/* Edit Profile Form */}
            {editVisible && (
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-3">
                  Edit Profile
                </h3>
                <form
                  onSubmit={handleEditProfileSubmit}
                  className="flex text-[#19522f] flex-col gap-6 max-w-xl"
                >
                  <label className="flex flex-col">
                    Username:
                    <input
                      type="text"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      required
                      className="border rounded px-4 py-2 mt-2"
                    />
                  </label>
                  <label className="flex flex-col">
                    Full Name:
                    <input
                      type="text"
                      value={editFullName}
                      onChange={(e) => setEditFullName(e.target.value)}
                      className="border rounded px-4 py-2 mt-2"
                    />
                  </label>
                  <label className="flex flex-col">
                    Email:
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      required
                      className="border rounded px-4 py-2 mt-2"
                    />
                  </label>
                  <button
                    type="submit"
                    className="bg-[#19522f] hover:bg-green-700 text-[#fef8e0] font-semibold py-3 rounded"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Change Password Form */}
            {changePassVisible && (
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-3">
                  Change Password
                </h3>
                <form
                  onSubmit={handleChangePasswordSubmit}
                  className="flex flex-col text-[#19522f] gap-6 max-w-xl"
                >
                  <label className="flex flex-col">
                    Old Password:
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                      className="border rounded px-4 py-2 mt-2"
                    />
                  </label>
                  <label className="flex flex-col">
                    New Password:
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="border rounded px-4 py-2 mt-2"
                    />
                  </label>
                  <label className="flex flex-col">
                    Confirm New Password:
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="border rounded px-4 py-2 mt-2"
                    />
                  </label>
                  <button
                    type="submit"
                    className="bg-[#19522f] hover:bg-green-700 text-[#fef8e0] font-semibold py-3 rounded"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            )}

            {/* Bookings Section */}
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
                        <div className="flex items-center justify-between w-36">
                          <button
                            onClick={() => toggleBookingDetails(b._id)}
                            className="text-indigo-600 hover:text-indigo-800 font-semibold"
                          >
                            {isExpanded ? "Hide Details" : "View Booking"}
                          </button>
                          <button
                            onClick={() => handleDeleteBooking(b._id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete Booking"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
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
                              ([mealType, categories]) => {
                                // Flatten items inside this mealType
                                const allItems =
                                  Object.values(categories).flat();

                                // If no items in this mealType, don't render anything
                                if (allItems.length === 0) return null;

                                return (
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
                                );
                              },
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

      {/* Centered Modal Success Message */}
      <CenteredMessageBox
        message={centeredMsg}
        onClose={() => setCenteredMsg("")}
      />
    </div>
  );
};

export default Profile;
