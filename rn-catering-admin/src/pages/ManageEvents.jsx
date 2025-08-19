import { useState, useEffect } from "react";
import axios from "axios";

function ManageEvents() {
  const [bookings, setBookings] = useState([]);
  const [expanded, setExpanded] = useState({
    Draft: [],
    Active: [],
    Complete: [],
  });
  const [editData, setEditData] = useState({}); // Track editable fields

  // Expansion toggle logic exactly as per UserInquiry example
  const toggleExpand = (section, idx) => {
    console.log("Toggle expand", section, idx);
    setExpanded((prev) => {
      const sectionExpanded = prev[section] || [];
      const isAlreadyExpanded = sectionExpanded.includes(idx);
      return {
        ...prev,
        [section]: isAlreadyExpanded
          ? sectionExpanded.filter((i) => i !== idx)
          : [...sectionExpanded, idx],
      };
    });
  };

  // Check if a card at idx for section is expanded
  const isExpanded = (section, idx) => expanded[section]?.includes(idx);

  // Fetch bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/bookings");
        setBookings(res.data);

        const initialEditData = {};
        res.data.forEach((booking) => {
          initialEditData[booking._id] = {
            finalPrice: "",       // your starting empty value
            guests: "",           // your starting empty value
            paymentStatus: "Pending", // your default status
          };
        });
        setEditData(initialEditData);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, []);
  const handleInputChange = (id, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const statuses = ["Draft", "Active", "Complete"];

  // Colors consistent with your previous specification
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Manage Bookings
      </h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {statuses.map((status) => {
          const filtered = bookings.filter(
            (b) => (b.status || "Draft") === status
          );

          return (
            <div
              key={status}
              className={`flex-1 min-w-[280px] max-w-[400px] p-5 rounded-3xl ${status === "Draft"
                ? "bg-yellow-50"
                : status === "Active"
                  ? "bg-blue-50"
                  : "bg-green-50"
                }`}
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold text-gray-900">{status}</h2>
                <span className="px-4 py-1 rounded-full bg-gray-200 text-gray-800 font-semibold text-sm">
                  {filtered.length}
                </span>
              </div>

              <div className="space-y-4">
                {filtered.map((booking, idx) => {
                  const id = booking._id;
                  const edits = editData[id] || {};

                  return (
                    <div
                      key={id}
                      className="rounded-2xl shadow-md border border-gray-200 bg-white overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
                    >
                      {/* Card Header */}
                      <div
                        onClick={() => toggleExpand(status, idx)}
                        className={`${headerColors[status]} p-5 flex justify-between items-center rounded-t-2xl`}
                      >
                        <span className="font-bold text-gray-900 truncate max-w-[60%]">
                          {booking.customerName || "No Name"}
                        </span>
                        <span
                          className={`${badgeColors[status]} text-sm font-semibold px-3 py-1 rounded-full shadow-sm truncate max-w-[35%] text-center`}
                        >
                          {booking.event || "Unknown Event"}
                        </span>
                      </div>

                      {/* Expandable content */}
                      <div
                        className={`overflow-hidden transition-all duration-500 px-5 border-t border-gray-200 overflow-y-auto ${isExpanded(status, idx)
                          ? "max-h-64 py-4 opacity-100"
                          : "max-h-0 py-0 opacity-0"
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
                                    {key === "date" && value
                                      ? new Date(value).toLocaleDateString("en-GB")
                                      : value?.toString() || "-"}
                                  </p>
                                </div>
                              );
                            })}
                        </div>

                        {/* Editable Fields */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-700 font-medium">
                              Final Price
                            </label>
                            <input
                              type="number"
                              value={edits.finalPrice}
                              onChange={(e) => handleInputChange(id, "finalPrice", e.target.value)}
                              className="w-28 border rounded px-3 py-2"

                            />
                          </div>

                          <div>
                            <label className="block text-gray-700 font-medium">
                              Guests
                            </label>
                            <input
                              type="number"
                              value={edits.guests}
                              onChange={(e) => handleInputChange(id, "guests", e.target.value)}
                              className="w-28 border rounded px-3 py-2"
                            />
                          </div>

                          <div>
                            <label className="block text-gray-700 font-medium">
                              Payment Status
                            </label>
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
                        </div>

                        {/* Save Button */}
                        <button
                          onClick={() => saveChanges(id)}
                          className="mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Save Changes
                        </button>
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
