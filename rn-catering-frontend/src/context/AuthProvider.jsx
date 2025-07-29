import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // 🔐 persist user
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // 🔐 clear on logout
    localStorage.removeItem("token");
  };

  useEffect(() => {
    // If needed: sync user with token or backend here
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
