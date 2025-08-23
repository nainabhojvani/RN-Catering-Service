import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function ManageEvents({ setBookingsCount }) {
  const statuses = ["Draft", "Active", "Complete"];

  // Load local status map from localStorage or start empty
  const [localStatusMap, setLocalStatusMap] = useState(() => {
    const saved = localStorage.getItem("bookingStatusMap");
    return saved ? JSON.parse(saved) : {};
  });

  const [bookings, setBookings] = useState([]);

  const [editData, setEditData] = useState({});

  const [expanded, setExpanded] = useState({
    Draft: [],
    Active: [],
    Complete: [],
  });

  const headerColors = {
    Draft: "bg-yellow-100",
    Active: "bg-blue-100",
    Complete: "bg-green-100",
  };
  const badgeColors = {
    Draft: "bg-yellow-200 text-yellow-800",
    Active: "bg-blue-200 text-blue-800",
    Complete: "bg-green-200 text-green-800",
  };

  // Fetch backend bookings and merge with local status on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/bookings`);
        const bookingsWithStatus = res.data.map((b) => ({
          ...b,
          status: localStatusMap[b._id] || "Draft",
        }));
        setBookings(bookingsWithStatus);

        const initialData = {};
        bookingsWithStatus.forEach((booking) => {
          initialData[booking._id] = {
            finalPrice: booking.finalPrice || "",
            guests: booking.guests || "",
            paymentStatus: booking.paymentStatus || "Pending",
          };
        });
        setEditData(initialData);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  // Save bookings status locally and persist
  const saveChanges = (id) => {
    const bookingIndex = bookings.findIndex((b) => b._id === id);
    if (bookingIndex === -1) return;

    const booking = bookings[bookingIndex];
    const edits = editData[id] || {};
    const currentStatus = booking.status || "Draft";

    if (
      currentStatus === "Draft" &&
      (edits.finalPrice === "" || edits.guests === "")
    ) {
      alert("Please fill Final Price and Guests to activate booking.");
      return;
    }

    let newStatus;
    if (currentStatus === "Draft") newStatus = "Active";
    else if (currentStatus === "Active" && edits.paymentStatus === "Paid")
      newStatus = "Complete";
    else newStatus = currentStatus;

    // Update localStatusMap and persist to localStorage
    setLocalStatusMap((prev) => {
      const updatedMap = { ...prev, [id]: newStatus };
      localStorage.setItem("bookingStatusMap", JSON.stringify(updatedMap));
      return updatedMap;
    });

    const updatedBooking = {
      ...booking,
      finalPrice: edits.finalPrice,
      guests: edits.guests,
      paymentStatus: edits.paymentStatus,
      status: newStatus,
    };

    setBookings((prev) => {
      const newBookings = [...prev];
      newBookings[bookingIndex] = updatedBooking;
      return newBookings;
    });

    if (newStatus === "Complete") {
      setEditData((prev) => {
        const newEditData = { ...prev };
        delete newEditData[id];
        return newEditData;
      });

      setExpanded({ Draft: [], Active: [], Complete: [] });
    }
  };
  useEffect(() => {
    const draftCount = bookings.filter((b) => (b.status || "Draft") === "Draft").length;
    setBookingsCount(draftCount);
  }, [bookings, setBookingsCount]);

  const toggleExpand = (section, id) => {
    setExpanded((prev) => {
      const sectionExpanded = prev[section] || [];
      const isAlreadyExpanded = sectionExpanded.includes(id);
      return {
        ...prev,
        [section]: isAlreadyExpanded
          ? sectionExpanded.filter((i) => i !== id)
          : [...sectionExpanded, id],
      };
    });
  };

  const isExpanded = (section, id) => expanded[section]?.includes(id);

  const handleInputChange = (id, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Manage Bookings</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {statuses.map((status) => {
          const filtered = bookings.filter((b) => (b.status || "Draft") === status);

          return (
            <div
              key={status}
              className={`flex-1 min-w-[280px] max-w-[400px] p-5 rounded-3xl shadow-lg min-h-[auto] ${status === "Draft"
                ? "bg-yellow-50"
                : status === "Active"
                  ? "bg-blue-50"
                  : "bg-green-50"
                } ${filtered.length === 0 ? "h-40" : "min-h-[400px]"}`}
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold text-gray-900">{status}</h2>
                <span className="px-4 py-1 rounded-full bg-gray-200 text-gray-800 font-semibold text-sm">{filtered.length}</span>
              </div>
              <div className="space-y-4">
                {filtered.length === 0 && <p className="text-center text-gray-600">No bookings here.</p>}
                {filtered.map((booking) => {
                  const id = booking._id;
                  const edits = editData[id] || {};
                  return (
                    <div
                      key={id}
                      className="rounded-2xl shadow-md border border-gray-200 bg-white overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
                    >
                      <div
                        onClick={() => toggleExpand(status, id)}
                        className={`${headerColors[status]} p-5 flex justify-between items-center rounded-t-2xl cursor-pointer`}
                      >
                        <span className="font-bold text-gray-900 truncate max-w-[60%]">{booking.customerName || "No Name"}</span>
                        <span
                          className={`${badgeColors[status]} text-sm font-semibold px-3 py-1 rounded-full shadow-sm truncate max-w-[35%] text-center`}
                        >
                          {booking.event || "Unknown Event"}
                        </span>
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-500 px-5 border-t border-gray-200 overflow-y-auto ${isExpanded(status, id) ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
                          }`}
                      >
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {Object.entries(booking)
                            .filter(([key]) =>
                              ["phone", "email", "venue", "date", "mealPlan"].includes(key)
                            )
                            .map(([key, value]) => {
                              if (key === "mealPlan" && value) {
                                return (
                                  <div key={key} className="bg-gray-50 p-3 rounded-lg shadow-sm col-span-2">
                                    <p className="text-gray-700 font-medium capitalize mb-2">Meal Plan</p>
                                    {Object.entries(value).map(([mealTime, categories]) => (
                                      <div key={mealTime} className="mb-3">
                                        <p className="font-semibold text-blue-700">{mealTime}</p>
                                        {Object.entries(categories).map(([category, items]) => (
                                          <div key={category} className="ml-4 mb-2">
                                            <p className="font-medium">{category}</p>
                                            {items.length > 0 ? (
                                              <ul className="list-disc list-inside text-gray-700">
                                                {items.map((item) => (
                                                  <li key={item.id}>{item.name}</li>
                                                ))}
                                              </ul>
                                            ) : (
                                              <p className="italic text-gray-500">No items</p>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    ))}
                                  </div>
                                );
                              }
                              return (
                                <div key={key} className="bg-gray-50 p-3 rounded-lg shadow-sm">
                                  <p className="text-gray-700 font-medium capitalize">
                                    {key === "date" ? "Date" : key.charAt(0).toUpperCase() + key.slice(1)}
                                  </p>
                                  <p className="text-gray-900">
                                    {key === "date" && value ? new Date(value).toLocaleDateString("en-GB") : value?.toString() || "-"}
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                        {status !== "Complete" && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-gray-700 font-medium">Final Price</label>
                              <input
                                type="number"
                                value={edits.finalPrice}
                                onChange={(e) => handleInputChange(id, "finalPrice", e.target.value)}
                                className="w-28 border rounded px-3 py-2"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 font-medium">Guests</label>
                              <input
                                type="number"
                                value={edits.guests}
                                onChange={(e) => handleInputChange(id, "guests", e.target.value)}
                                className="w-28 border rounded px-3 py-2"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 font-medium">Payment Status</label>
                              <select
                                value={edits.paymentStatus}
                                onChange={(e) => handleInputChange(id, "paymentStatus", e.target.value)}
                                className="w-28 border rounded px-3 py-2"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                                <option value="Failed">Failed</option>
                              </select>
                            </div>
                            <button
                              onClick={() => saveChanges(id)}
                              className="mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                            >
                              Save Changes
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageEvents;
