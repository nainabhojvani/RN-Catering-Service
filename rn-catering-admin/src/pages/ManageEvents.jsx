import { useState, useEffect } from "react";
import axios from "axios";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [expanded, setExpanded] = useState({
    Draft: [],
    Active: [],
    Completed: [],
  });

  // Fetch bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  const toggleExpand = (section, idx) => {
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

  const updateEventField = async (id, field, value) => {
    try {
      // Update backend
      await axios.patch(`http://localhost:5000/api/bookings/${id}`, {
        [field]: value,
      });
      // Update local state
      setEvents((prev) =>
        prev.map((ev) => (ev._id === id ? { ...ev, [field]: value } : ev))
      );
    } catch (err) {
      console.error("Failed to update event:", err);
    }
  };

  const isExpanded = (section, idx) => expanded[section]?.includes(idx);
  const sections = ["Draft", "Active", "Completed"];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Manage Events</h1>
      </div>

      <div className="flex flex-wrap gap-6 items-start justify-center">
        {sections.map((section) => {
          const sectionIcon =
            section === "Draft" ? "📝" : section === "Active" ? "✅" : "🏆";
          const sectionBg =
            section === "Draft"
              ? "bg-yellow-50"
              : section === "Active"
              ? "bg-green-50"
              : "bg-gray-100";

          const filteredEvents = events.filter((e) => e.status === section);

          return (
            <div
              key={section}
              className={`flex-1 min-w-[280px] max-w-[400px] p-5 rounded-3xl ${sectionBg}`}
            >
              {/* Section Header */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-opacity-50 mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sectionIcon}</span>
                  <h2 className="text-2xl font-semibold">{section} Events</h2>
                </div>
                <span
                  className={`px-4 py-1 rounded-full font-semibold text-sm ${
                    section === "Draft"
                      ? "bg-yellow-200 text-yellow-800"
                      : section === "Active"
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {filteredEvents.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-4">
                {filteredEvents.map((event, idx) => (
                  <div
                    key={`${section}-${idx}`}
                    className="rounded-2xl overflow-hidden border border-gray-200 cursor-pointer bg-white"
                  >
                    {/* Card Header */}
                    <div
                      onClick={() => toggleExpand(section, idx)}
                      className={`p-5 flex justify-between items-center ${
                        section === "Draft"
                          ? "bg-yellow-100"
                          : section === "Active"
                          ? "bg-green-100"
                          : "bg-gray-200"
                      }`}
                    >
                      <span className="font-bold text-gray-900 text-lg md:text-xl">
                        {event.event}
                      </span>
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          section === "Draft"
                            ? "bg-yellow-200 text-yellow-800"
                            : section === "Active"
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-300 text-gray-700"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>

                    {/* Card Details */}
                    <div
                      className={`overflow-hidden transition-all duration-500 px-5 border-t border-gray-200 ${
                        isExpanded(section, idx)
                          ? "max-h-[1000px] opacity-100 py-4"
                          : "max-h-0 opacity-0 py-0"
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 font-medium">Date</p>
                          <p className="text-gray-900">{new Date(event.date).toDateString()}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 font-medium">Venue</p>
                          <p className="text-gray-900">{event.venue}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 font-medium">No. of Guests</p>
                          <input
                            type="number"
                            value={event.noOfGuests || ""}
                            onChange={(e) =>
                              updateEventField(event._id, "noOfGuests", parseInt(e.target.value))
                            }
                            className="mt-1 w-full border rounded px-2 py-1"
                          />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 font-medium">Final Price</p>
                          <input
                            type="number"
                            value={event.finalPrice || ""}
                            onChange={(e) =>
                              updateEventField(event._id, "finalPrice", parseInt(e.target.value))
                            }
                            className="mt-1 w-full border rounded px-2 py-1"
                          />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 font-medium">Payment Status</p>
                          <select
                            value={event.paymentStatus}
                            onChange={(e) =>
                              updateEventField(event._id, "paymentStatus", e.target.value)
                            }
                            className="mt-1 w-full border rounded px-2 py-1"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Paid">Paid</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageEvents;
