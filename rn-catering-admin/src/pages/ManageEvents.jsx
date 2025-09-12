import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

function ManageEvents({ setBookingsCount }) {
  const statuses = ["Draft", "Active", "Complete"];
  const [bookings, setBookings] = useState([]);
  const [editData, setEditData] = useState({});
  const [draftDataMap, setDraftDataMap] = useState({});
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [activeTab, setActiveTab] = useState("Draft");
  const [localStatusMap, setLocalStatusMap] = useState(() => {
    const saved = localStorage.getItem("bookingStatusMap");
    return saved ? JSON.parse(saved) : {};
  });

  // Fetch bookings and initialize edit data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/bookings`);
        const bookingsWithStatus = res.data.map((b) => ({
          ...b,
          status: localStatusMap[b._id] || "Draft",
        }));

        setBookings(bookingsWithStatus);

        // Initialize editData only if empty (first load)
        setEditData((prev) => {
          if (Object.keys(prev).length === 0) {
            const initialData = {};
            bookingsWithStatus.forEach((booking) => {
              initialData[booking._id] = {
                finalPrice: "",
                guests: "",
                paymentStatus: "Pending",
                eventStatus: "Pending",
              };
            });
            return initialData;
          }
          return prev;
        });
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // Update draft count
  useEffect(() => {
    const draftCount = bookings.filter((b) => (b.status || "Draft") === "Draft").length;
    setBookingsCount(draftCount);
  }, [bookings, setBookingsCount]);

  // Prefill Active tab when bookings move from Draft → Active
  useEffect(() => {
    if (activeTab === "Active") {
      const newEditData = { ...editData };
      bookings
        .filter((b) => b.status === "Active")
        .forEach((b) => {
          if (draftDataMap[b._id]) {
            newEditData[b._id] = {
              finalPrice: draftDataMap[b._id].finalPrice,
              guests: draftDataMap[b._id].guests,
              paymentStatus:
                editData[b._id]?.paymentStatus || draftDataMap[b._id].paymentStatus,
              eventStatus: "Confirm",
            };
          }
        });
      setEditData(newEditData);
    }
  }, [activeTab, bookings, draftDataMap]);

  const handleInputChange = (id, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const saveChanges = (id) => {
    const bookingIndex = bookings.findIndex((b) => b._id === id);
    if (bookingIndex === -1) return;

    const booking = bookings[bookingIndex];
    const edits = editData[id] || {};
    const currentStatus = booking.status || "Draft";

    let newStatus = currentStatus;

    // Draft → Active
    if (edits.eventStatus === "Confirm" && edits.finalPrice && edits.guests) {
      newStatus = "Active";
    }
    // Active → Complete
    else if (edits.eventStatus === "Completed" && edits.paymentStatus === "Paid") {
      newStatus = "Complete";
    }

    // Compute updated draft map
    const newDraftMap = {
      ...draftDataMap,
      [id]: {
        finalPrice: edits.finalPrice,
        guests: edits.guests,
        paymentStatus: edits.paymentStatus || "Pending",
        // Force eventStatus to "Confirm" when moving to Active
        eventStatus: newStatus === "Active" ? "Confirm" : edits.eventStatus || "Pending",
      },
    };

    // Update draftDataMap state
    setDraftDataMap(newDraftMap);

    // Prefill Active using the computed newDraftMap
    if (newStatus === "Active") {
      setEditData((prevEdit) => ({
        ...prevEdit,
        [id]: {
          finalPrice: newDraftMap[id].finalPrice,
          guests: newDraftMap[id].guests,
          paymentStatus: edits.paymentStatus || newDraftMap[id].paymentStatus,
          eventStatus: "Confirm",
        },
      }));
    } else {
      // Save edits normally for Draft/Complete
      setEditData((prevEdit) => ({
        ...prevEdit,
        [id]: {
          ...prevEdit[id],
          ...edits,
        },
      }));
    }

    // Update bookings state
    const updatedBooking = { ...booking, ...edits, status: newStatus };
    setBookings((prev) => {
      const newBookings = [...prev];
      newBookings[bookingIndex] = updatedBooking;
      return newBookings;
    });

    // Update localStorage
    setLocalStatusMap((prev) => {
      const updatedMap = { ...prev, [id]: newStatus };
      localStorage.setItem("bookingStatusMap", JSON.stringify(updatedMap));
      return updatedMap;
    });

    // Collapse if moved to another tab
    if (currentStatus !== newStatus) {
      setExpandedBookingId(null);

    }
  }

  const deleteBooking = async (id) => {
    try {
      // Call backend API to delete booking
      await axios.delete(`${API_URL}/api/bookings/${id}`);

      // Remove booking from frontend state immediately
      setBookings((prev) => prev.filter((b) => b._id !== id));

      // Remove from draft map & editData to avoid stale state
      setDraftDataMap((prev) => {
        const newMap = { ...prev };
        delete newMap[id];
        return newMap;
      });
      setEditData((prev) => {
        const newEdit = { ...prev };
        delete newEdit[id];
        return newEdit;
      });

      // Collapse right panel if deleted booking was expanded
      if (expandedBookingId === id) {
        setExpandedBookingId(null);
      }

      console.log("Event deleted successfully!");
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedBookingId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-8 min-h-screen bg-[#fef8e0]">
      <h2 className="text-3xl font-bold text-[#19522f] mb-6 text-center">Manage Events</h2>
      {/* Tabs as Progress Bar */}
      <div className="flex justify-between mb-6">
        {statuses.map((status, i) => (
          <div
            key={status}
            className={`flex-1 text-center py-2 rounded mx-1 cursor-pointer transition-all duration-300
        ${activeTab === status
                ? "bg-[#19522f] text-[#fef8e0] font-bold"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            onClick={() => setActiveTab(status)}
          >
            {status} ({bookings.filter((b) => (b.status || "Draft") === status).length})
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Left Panel */}
        <div className="w-1/3 bg-[#fffdf3] rounded-lg shadow p-4 max-h-[80vh] overflow-y-auto space-y-3">
          {bookings
            .filter((b) => (b.status || "Draft") === activeTab)
            .map((b) => {
              const isExpanded = expandedBookingId === b._id;
              return (
                <motion.div
                  key={b._id}
                  layout
                  initial={{ borderRadius: 10 }}
                  className="border bg-[#fef8e0] border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer"
                >
                  <div
                    onClick={() => toggleExpand(b._id)}
                    className={`p-3 flex justify-between items-center cursor-pointer ${isExpanded ? "bg-[#fef8e0] border-[#19522f]" : ""}`}
                  >
                    <p className="font-semibold">{b.customerName || "No Name"}</p>
                    <span className="bg-[#19522f] text-[#fef8e0] px-3 py-1 rounded-full text-sm">
                      {b.event || "Unknown Event"}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isExpanded && activeTab !== "Complete" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="p-3 space-y-3 bg-[#fef8e0] border-t border-gray-500 rounded-b-lg"
                      >
                        <div className="grid grid-cols-2 gap-6">
                          {/* Final Price */}
                          <div className="flex flex-col">
                            <label className="text-gray-600 text-sm mb-1">Final Price</label>
                            <input
                              type="number"
                              placeholder="Enter Final Price"
                              value={editData[b._id]?.finalPrice || ""}
                              disabled={b.status === "Active"}
                              onChange={(e) => handleInputChange(b._id, "finalPrice", e.target.value)}
                              className={`w-full border-b border-gray-400 focus:outline-none transition-all duration-300 py-2 text-[#19522F]`}
                            />
                          </div>

                          {/* Guests */}
                          <div className="flex flex-col">
                            <label className="text-gray-600 text-sm mb-1">Guests</label>
                            <input
                              type="number"
                              placeholder="Enter Guests"
                              value={editData[b._id]?.guests || ""}
                              disabled={b.status === "Active"}
                              onChange={(e) => handleInputChange(b._id, "guests", e.target.value)}
                              className={`border-b border-gray-300 focus:border-[#19522f] focus:outline-none px-0 py-2 w-full bg-transparent placeholder-gray-400`}
                            />
                          </div>

                          {/* Payment Status */}
                          <div className="flex flex-col">
                            <label className="text-gray-600 text-sm mb-1">Payment Status</label>
                            <select
                              value={editData[b._id]?.paymentStatus || "Pending"}
                              onChange={(e) => handleInputChange(b._id, "paymentStatus", e.target.value)}
                              className="border-b border-gray-300 focus:border-[#19522f] focus:outline-none px-0 py-2 w-full bg-transparent"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Paid">Paid</option>
                              <option value="Failed">Failed</option>
                            </select>
                          </div>

                          {/* Event Status */}
                          <div className="flex flex-col">
                            <label className="text-gray-600 text-sm mb-1">Event Status</label>
                            <select
                              value={editData[b._id]?.eventStatus || "Pending"}
                              onChange={(e) => handleInputChange(b._id, "eventStatus", e.target.value)}
                              className="border-b border-gray-300 focus:border-[#19522f] focus:outline-none px-0 py-2 w-full bg-transparent"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirm">Confirm</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>

                          {/* Buttons */}
                          <div className="col-span-2 flex gap-2 justify-start mt-4">
                            <button
                              onClick={() => saveChanges(b._id)}
                              className="px-4 py-2 bg-[#19522f] text-white rounded-lg font-semibold hover:bg-[#143f17] w-full"
                            >
                              Save Changes
                            </button>
                            <button
                              onClick={() => deleteBooking(b._id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-800 w-full"
                            >
                              Delete Event
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
        </div>

        {/* Right Panel */}
        <div className="w-2/3 bg-[#fffdf3] rounded-lg shadow p-6 max-h-[80vh] overflow-y-auto">
          {expandedBookingId ? (
            (() => {
              const selectedBooking = bookings.find((b) => b._id === expandedBookingId);
              if (!selectedBooking) return null;

              return (
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedBooking)
                    .filter(
                      ([key, value]) =>
                        value &&
                        !["_id", "status", "finalPrice", "guests", "paymentStatus", "eventStatus", "user", "createdAt", "updatedAt"].includes(key)
                    )
                    .map(([key, value]) => {
                      if (key === "mealPlan") {
                        return (
                          <div key={key} className="col-span-2 bg-[#fef8e0] p-3 rounded-lg shadow-sm">
                            <p className="text-[#19522f] font-medium mb-2">Meal Plan</p>
                            {Object.entries(value).map(([mealTime, categories]) => (
                              <div key={mealTime} className="mb-3">
                                {Object.entries(categories)
                                  .filter(([, items]) => items.length > 0)
                                  .map(([category, items]) => (
                                    <div key={category} className="ml-4 mb-2">
                                      <p className="font-medium">{category}</p>
                                      <ul className="list-disc list-inside text-[#19522f]">
                                        {items.map((item) => (
                                          <li key={item.id}>{item.name}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return (
                        <div key={key} className="bg-[#fef8e0] p-3 rounded-lg shadow-sm">
                          <p className="text-[#19522f] font-medium capitalize">
                            {key === "date" ? "Date" : key}
                          </p>
                          <p className="text-[#19522f]">
                            {key === "date" ? new Date(value).toLocaleDateString("en-GB") : value}
                          </p>
                        </div>
                      );
                    })}
                </div>
              );
            })()
          ) : (
            <p className="text-[#19522f] text-center mt-20">
              Select a booking from the left to view details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageEvents;
