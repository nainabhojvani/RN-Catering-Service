const API_URL = import.meta.env.VITE_API_URL;

import React, { useState, useRef, useEffect } from "react";
import RNLogo from "../assets/images/RN_logo.png";
import { Link, useNavigate, NavLink } from "react-router-dom";
import personImg from "../assets/images/person.png";
import useAuth from "../context/useAuth"; // ✅ NEW: use context
import { toast } from "react-toastify";

export default function Header() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [authForm, setAuthForm] = useState("signin");

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, login, logout } = useAuth(); // ✅ use context
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMobile = () => setShowMobileNav(!showMobileNav);
  const toggleAuthForm = (form) => setAuthForm(form);

  const handleLogout = () => {
    logout(); // ✅ replaces localStorage + setUser
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        fullName,
        email,
        password,
        confirmPassword,
      }),
    });

    const data = await res.json();

    // Show toast instead of alert
    if (res.ok) {
      toast.success(data.message); // ✅ success toast
      setUsername("");
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowDropdown(false);
      setAuthForm("signin");
    } else {
      toast.error(data.message); // ❌ error toast
    }
  };

  const popupRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      <header className="flex flex-wrap items-center justify-between px-10 py-2 bg-white shadow-md sticky top-0 z-60">
        <div className="flex items-center">
          <Link to="/">
            <img src={RNLogo} alt="logo" className="h-[70px]" />
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-6 items-center list-none">
            {[
              { name: "Home", to: "/" },
              { name: "About", to: "/about" },
              { name: "Our Services", to: "/services" },
              { name: "Venues", to: "/venues" },
              { name: "Contact", to: "/contact" },
            ].map((link) => (
              <li key={link.name} className="relative">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `relative block px-5 py-2 font-semibold text-base rounded-lg transition-all duration-300 ease-in-out
   ${
     isActive
       ? "bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 text-white shadow-lg shadow-purple-500/50 scale-105 z-10"
       : "text-gray-800 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-400/40 hover:bg-gradient-to-r hover:from-purple-600 hover:via-purple-700 hover:to-purple-800"
   }
   
   /* UNDERLINE BELOW BOX WITH SPACE */
   after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-0 after:h-1 after:rounded-full after:transition-all after:duration-500 after:bg-gradient-to-r after:from-purple-500 after:via-purple-600 after:to-purple-700
   hover:after:w-3/4

   /* ACTIVE LINK UNDERLINE */
   ${isActive ? "after:w-full" : ""}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex items-center justify-end gap-4">
          {!user ? (
            <button
              onClick={toggleDropdown}
              className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition cursor-pointer"
            >
              Sign In
            </button>
          ) : (
            <>
              <Link to="/profile">
                <img
                  src={personImg}
                  className="w-8 h-8 rounded-full border-black border-1"
                  alt="Profile"
                />
              </Link>
              {/* <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button> */}
            </>
          )}
        </div>

        <div
          className="md:hidden text-3xl cursor-pointer ml-auto"
          onClick={toggleMobile}
        >
          ☰
        </div>
      </header>

      {showMobileNav && (
        <div className="flex flex-col md:hidden w-full bg-white text-gray-800 shadow-md px-4">
          <Link to="/" className="py-2 hover:bg-purple-700 hover:text-white">
            Home
          </Link>
          <Link
            to="/about"
            className="py-2 hover:bg-purple-700 hover:text-white"
          >
            About
          </Link>
          <Link
            to="/services"
            className="py-2 hover:bg-purple-700 hover:text-white"
          >
            Our Services
          </Link>
          <Link
            to="/venues"
            className="py-2 hover:bg-purple-700 hover:text-white"
          >
            Venues
          </Link>
          <Link
            to="/contact"
            className="py-2 hover:bg-purple-700 hover:text-white"
          >
            Contact
          </Link>
          {!user ? (
            <button
              onClick={toggleDropdown}
              className="text-left py-2 hover:bg-purple-700 hover:text-white"
            >
              Sign In
            </button>
          ) : (
            <>
              <Link
                to="/profile"
                className="py-2 hover:bg-purple-700 hover:text-white"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-left py-2 text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {showDropdown && (
        <div className="relative z-50">
          <div
            ref={popupRef}
            className="fixed right-10 mt-2 w-[30rem] max-h-[90vh] overflow-y-auto scrollbar-thin p-6 bg-white/95 rounded-lg shadow-lg"
          >
            <div
              className="absolute inset-0 opacity-20 bg-no-repeat bg-center bg-[length:29em]"
              style={{
                backgroundImage: `url("images/log-sign.png")`,
                zIndex: 1,
              }}
            />
            <div className="relative z-10">
              {authForm === "signin" && (
                <>
                  <h3 className="text-lg font-bold text-center mb-4">
                    Sign In
                  </h3>
                  <form
                    className="flex flex-col gap-3 font-semibold"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const res = await fetch(`${API_URL}/api/login`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          emailOrUsername: email,
                          password,
                        }),
                      });
                      const data = await res.json();

                      if (res.ok) {
                        login(data.user, data.token); // ✅ replaced localStorage + setUser
                        setEmail("");
                        setPassword("");
                        setShowDropdown(false);
                      } else {
                        alert(data.message);
                      }
                    }}
                  >
                    <label>Email</label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      required
                      className="px-3 py-2 border border-gray-300 rounded-full"
                    />
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="px-3 py-2 border border-gray-300 rounded-full"
                    />
                    <button
                      type="submit"
                      className="mt-3 bg-purple-700 text-white rounded-full py-2 hover:cursor-pointer hover:bg-purple-800"
                    >
                      Sign In
                    </button>
                    <p className="text-center mt-2">
                      Don’t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => toggleAuthForm("signup")}
                        className="text-purple-700 hover:cursor-pointer hover:underline"
                      >
                        Sign Up
                      </button>
                    </p>
                  </form>
                </>
              )}

              {authForm === "signup" && (
                <>
                  <h3 className="text-lg font-bold text-center mb-4">
                    Sign Up
                  </h3>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 font-semibold"
                  >
                    <label>Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      required
                      className="px-3 py-2 border border-gray-300 rounded-full"
                    />
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter full name"
                      required
                      className="px-3 py-2 border border-gray-300 rounded-full"
                    />
                    <label>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      required
                      className="px-3 py-2 border border-gray-300 rounded-full"
                    />
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                      className="px-3 py-2 border border-gray-300 rounded-full"
                    />
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      required
                      className="px-3 py-2 border border-gray-300 rounded-full"
                    />
                    <button
                      type="submit"
                      className="mt-3 bg-purple-700 text-white rounded-full hover:cursor-pointer hover:bg-purple-800 py-2"
                    >
                      Register
                    </button>
                    <p className="text-center mt-2">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => toggleAuthForm("signin")}
                        className="text-purple-700 hover:underline hover:cursor-pointer "
                      >
                        Sign In
                      </button>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
