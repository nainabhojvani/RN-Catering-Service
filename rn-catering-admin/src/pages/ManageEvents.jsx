import { useState, useEffect } from "react";
import axios from "axios";

function ManageEvents() {
  const [bookings, setBookings] = useState([]);
  const [expanded, setExpanded] = useState({}); // track expanded cards dynamically

  // Toggle expand/collapse for a card
  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Fetch bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/bookings");
         console.log("Bookings fetched:", res.data);
        setBookings(res.data);
        console.log("Bookings fetched:", res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  // Get unique statuses from bookings
  const statuses = [...new Set(bookings.map((b) => b.status || "Unknown"))];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Manage Bookings</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {statuses.map((status) => {
          const filtered = bookings.filter((b) => (b.status || "Unknown") === status);

          return (
            <div
              key={status}
              className="flex-1 min-w-[280px] max-w-[400px] p-5 rounded-3xl bg-gray-100"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold">{status}</h2>
                <span className="px-4 py-1 rounded-full bg-gray-200 text-gray-800 font-semibold text-sm">
                  {filtered.length}
                </span>
              </div>

              <div className="space-y-4">
                {filtered.map((booking) => {
                  const id = booking._id;
                  return (
                    <div
                      key={id}
                      className="rounded-2xl shadow-md border border-gray-200 bg-white overflow-hidden cursor-pointer transition-all hover:scale-105"
                    >
                      <div
                        onClick={() => toggleExpand(id)}
                        className="p-5 flex justify-between items-center bg-gray-200"
                      >
                        <span className="font-bold">{booking.name || "No Name"}</span>
                        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-gray-300">
                          {booking.status || "Unknown"}
                        </span>
                      </div>

                      <div
                        className={`transition-all duration-500 px-5 border-t border-gray-200 overflow-hidden ${
                          expanded[id] ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
                        }`}
                      >
                        {Object.entries(booking).map(([key, value]) => {
                          if (key === "_id" || key === "status") return null; // skip internal fields
                          return (
                            <div
                              key={key}
                              className="bg-gray-50 p-3 rounded-lg shadow-sm mb-2"
                            >
                              <p className="text-gray-700 font-medium">{key}</p>
                              <p className="text-gray-900">{value?.toString()}</p>
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
        })}
      </div>
    </div>
  );
}

export default ManageEvents;
