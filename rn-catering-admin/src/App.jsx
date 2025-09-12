// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ManageEvents from "./pages/ManageEvents";
import UserInquiry from "./pages/UserInquiry";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  // counts for draft bookings & pending inquiries
  const [bookingsCount, setBookingsCount] = useState(0);
  const [inquiriesCount, setInquiriesCount] = useState(0);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const bookingsRes = await axios.get(`${API_URL}/api/admin/bookings`);
      const inquiriesRes = await axios.get(`${API_URL}/api/inquiries/contacts`);

      setBookings(bookingsRes.data);
      setInquiries(inquiriesRes.data);

      // ✅ also set counts right here
      setBookingsCount(
        bookingsRes.data.filter((b) => (b.status || "Draft") === "Draft").length
      );
      setInquiriesCount(
        inquiriesRes.data.filter((i) => (i.status || "Pending") === "Pending").length
      );
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };
  fetchData();
}, []);

  return (
    <Router>
      <div className="flex min-h-screen bg-[#fef8e0]">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  totalEvents={bookingsCount}     // controlled by ManageEvents
                  totalInquiries={inquiriesCount} // controlled by UserInquiry
                />
              }
            />
            <Route
              path="/events"
              element={<ManageEvents setBookingsCount={setBookingsCount} />}
            />
            <Route
              path="/inquiries"
              element={<UserInquiry setInquiriesCount={setInquiriesCount} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
