import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ManageEvents from "./pages/ManageEvents";
import UserInquiry from "./pages/UserInquiry";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/events" element={<ManageEvents />} />
            <Route path="/inquiries" element={<UserInquiry />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
