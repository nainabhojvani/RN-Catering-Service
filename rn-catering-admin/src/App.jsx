import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ManageEvents from "./pages/ManageEvents";
import UserInquiry from "./pages/UserInquiry";

function App() {
  const [bookingsCount, setBookingsCount] = useState(0);
  const [inquiriesCount, setInquiriesCount] = useState(0);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<Dashboard totalEvents={bookingsCount} totalInquiries={inquiriesCount} />}
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
