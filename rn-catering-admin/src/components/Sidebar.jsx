import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, MessageSquare, LogOut } from "lucide-react";
import logo from "../assets/RN_logo.png";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <Home size={20} /> },
    { path: "/events", label: "Manage Events", icon: <Calendar size={20} /> },
    { path: "/inquiries", label: "User Inquiries", icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-gray-950 text-gray-100 flex flex-col shadow-2xl sticky top-0">
      {/* Logo Section */}
      <div className="p-6 flex flex-col items-center border-b border-gray-800 bg-gray-900/90">
        <div className="h-24 w-24 rounded-2xl flex items-center justify-center bg-white shadow-xl mb-4">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-20 w-20 object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-white">RN Catering</h1>
        <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
      </div>

      {/* Menu Section */}
      <nav className="flex-1 px-4 py-6 space-y-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base border transition-all duration-200 
                ${
                  isActive
                    ? "bg-gray-800 text-white border-gray-700 shadow-md"
                    : "bg-gray-900/70 text-gray-300 border-gray-800 hover:bg-gray-800 hover:text-white hover:border-gray-600"
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold shadow-md transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
