import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import RNLogo from "../assets/images/RN_logo(1).png";
import personImg from "../assets/images/person.png";
import useAuth from "../context/useAuth";
import CenteredMessageBox from "./centerMsgbox";
import SignInForm from "./HeaderComponents/SignInForm";
import SignUpForm from "./HeaderComponents/SignUpForm";

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

export default function Header() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [authForm, setAuthForm] = useState("signin");
  const [centeredMsg, setCenteredMsg] = useState("");

  const { user, login } = useAuth();

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMobile = () => setShowMobileNav(!showMobileNav);
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Close popup when clicking outside
  const popupRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <>
      {/* Header */}
      <header className="flex flex-wrap items-center bg-[#fef8e0] justify-between px-10 py-2 shadow-md sticky top-0 z-60">
        <div className="flex items-center">
          <Link to="/">
            <img src={RNLogo} alt="logo" className="h-[70px]" />
          </Link>
        </div>

        {/* Nav (Desktop) */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-6 items-center list-none">
            {[
              { name: "Home", to: "/" },
              { name: "About", to: "/about" },
              { name: "Our Services", to: "/services" },
              { name: "Venues We've Served", to: "/venues" },
              { name: "Contact", to: "/contact" },
            ].map((link) => (
              <li key={link.name} className="relative">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `relative block px-5 py-2 font-semibold text-base rounded-sm transition-all duration-300 ease-in-out
                    ${
                      isActive
                        ? "bg-[#19522f] text-[#d9e45a]"
                        : "text-[#19522f]"
                    }
                    after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-0 after:h-0.5 after:rounded-full after:transition-all after:duration-500 after:bg-gradient-to-r after:from-[#19522f] after:via-[#759782] after:to-[#d9e45a]
                    hover:after:w-full ${isActive ? "after:w-full" : ""}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            {isAdmin && (
              <a href={ADMIN_URL} target="_blank" rel="noopener noreferrer">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded hover:cursor-pointer">
                  Admin Panel
                </button>
              </a>
            )}
          </ul>
        </nav>

        {/* Right (Desktop) */}
        <div className="hidden md:flex items-center justify-end gap-4">
          {!user ? (
            <button onClick={toggleDropdown} className="btn">
              Sign In
            </button>
          ) : (
            <Link to={`/profile/${user.username}`}>
              <img
                src={personImg}
                className="w-8 h-8 rounded-full border-[#d9e45a] border-2"
                alt="Profile"
              />
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div
          className="md:hidden text-3xl cursor-pointer ml-auto text-green-800 "
          onClick={toggleMobile}
        >
          {showMobileNav ? "X" : "☰"}
        </div>
      </header>

      {/* Mobile Nav */}
      {showMobileNav && (
        <nav className="md:hidden bg-[#fef8e0] shadow-md border-t border-[#d1dcd5]">
          <ul className="flex flex-col gap-4 p-4">
            {[
              { name: "Home", to: "/" },
              { name: "About", to: "/about" },
              { name: "Our Services", to: "/services" },
              { name: "Venues We've Served", to: "/venues" },
              { name: "Contact", to: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `relative block px-5 py-2 font-semibold text-base rounded-sm transition-all duration-300 ease-in-out
                    ${
                      isActive
                        ? "bg-[#19522f] text-[#d9e45a]"
                        : "text-[#19522f]"
                    }
                    after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-0 after:h-0.5 after:rounded-full after:transition-all after:duration-500 after:bg-gradient-to-r after:from-[#19522f] after:via-[#759782] after:to-[#d9e45a]
                    hover:after:w-full ${isActive ? "after:w-full" : ""}`
                  }
                  onClick={() => setShowMobileNav(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {!user ? (
              <li>
                <button
                  onClick={() => {
                    toggleDropdown();
                    setShowMobileNav(false);
                  }}
                  className="w-full px-3 py-2 bg-green-700 text-white rounded"
                >
                  Sign In
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to={`/profile/${user.username}`}
                  onClick={() => setShowMobileNav(false)}
                  className="block px-3 py-2 font-semibold text-[#19522f]"
                >
                  Profile
                </Link>
              </li>
            )}
            {isAdmin && (
              <li>
                <a
                  href={ADMIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 font-semibold text-white bg-green-600 rounded text-center"
                >
                  Admin Panel
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}

      {/* Auth Popup */}
      {showDropdown && (
        <div className="relative z-50">
          <div
            ref={popupRef}
            className="fixed right-10 mt-2 w-[30rem] max-h-[90vh] overflow-y-auto scrollbar-thin 
                       p-6 bg-[#fffdf3] rounded-lg shadow-lg border border-[#d1dcd5]"
          >
            <div className="relative z-10">
              {authForm === "signin" && (
                <div className="space-y-6 text-[#19522f]">
                  <SignInForm
                    setAuthForm={setAuthForm}
                    setShowDropdown={setShowDropdown}
                    setCenteredMsg={setCenteredMsg}
                    login={login}
                  />
                </div>
              )}
              {authForm === "signup" && (
                <div className="space-y-6 text-[#19522f]">
                  <SignUpForm
                    setAuthForm={setAuthForm}
                    setShowDropdown={setShowDropdown}
                    setCenteredMsg={setCenteredMsg}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Message Box */}
      <CenteredMessageBox
        message={centeredMsg}
        onClose={() => setCenteredMsg("")}
      />
    </>
  );
}
