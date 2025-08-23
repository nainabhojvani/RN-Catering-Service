import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ManageEvents from "./pages/ManageEvents";
import UserInquiry from "./pages/UserInquiry";

function App() {
  // Initialize counts from localStorage or 0
  const [bookingsCount, setBookingsCount] = useState(() => {
    const saved = localStorage.getItem("bookingsCount");
    return saved ? Number(saved) : 0;
  });

  const [inquiriesCount, setInquiriesCount] = useState(() => {
    const saved = localStorage.getItem("inquiriesCount");
    return saved ? Number(saved) : 0;
  });

  // Persist bookingsCount to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("bookingsCount", bookingsCount);
  }, [bookingsCount]);

  // Persist inquiriesCount to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("inquiriesCount", inquiriesCount);
  }, [inquiriesCount]);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  totalEvents={bookingsCount}
                  totalInquiries={inquiriesCount}
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
