// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ManageEvents from "./pages/ManageEvents";
import UserInquiry from "./pages/UserInquiry";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <Router>
      <div className={`relative min-h-screen bg-[#fef8e0] ${sidebarOpen ? 'overflow-hidden' : ''}`}>
        {/* Header (mobile) */}
        <Header
          className="fixed top-0 left-0 right-0 z-50"
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Desktop sidebar */}
        <div className="hidden md:block fixed left-0 top-0 h-full w-64 z-40">
          <Sidebar />
        </div>

        {/* Mobile overlay sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="fixed left-0 right-0 top-16 bottom-0 bg-black/60 z-40 md:hidden"
              onClick={toggleSidebar}
            />
            <div className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-[#19522f] text-[#fffdf3] flex flex-col z-50 shadow-2xl md:hidden">
              <Sidebar />
            </div>
          </>
        )}

        {/* Main Content */}
        <main className=" pt-16 md:ml-64 p-2 md:p-6 min-h-screen">
          <Routes>
            <Route
              path="/"
              element={<Dashboard totalEvents={bookingsCount} totalInquiries={inquiriesCount} />}
            />
            <Route path="/events" element={<ManageEvents setBookingsCount={setBookingsCount} />} />
            <Route path="/inquiries" element={<UserInquiry setInquiriesCount={setInquiriesCount} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
