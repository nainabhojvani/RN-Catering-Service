// Sidebar.jsx
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
    <div className="w-64 min-h-screen bg-gray-900 text-gray-200 flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-6 flex flex-col items-center border-b border-gray-700">
  <div className="h-32 w-32 rounded-full flex items-center justify-center bg-white shadow-lg mb-3">
    <img 
      src={logo} 
      alt="Logo" 
      className="h-24 w-24 object-contain"
    />
  </div>
  <h1 className="text-xl font-bold text-white tracking-wide">RN Catering</h1>
</div>


      {/* Menu */}
      <nav className="flex-1 p-4 space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
              ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md"
                  : "hover:bg-gray-800"
              }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
