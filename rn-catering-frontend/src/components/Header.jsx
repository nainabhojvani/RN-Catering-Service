import React, { useState, useRef, useEffect } from "react";
import RNLogo from "../assets/images/RN_logo.png"; // move your logo to src/assets
import { Link } from "react-router-dom";

export default function Header() {

  //Declaration
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [authForm, setAuthForm] = useState("signin");

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMobile = () => setShowMobileNav(!showMobileNav);
  const toggleAuthForm = (form) => setAuthForm(form);

  //handle submit function

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        fullName,
        email,
        password,
        confirmPassword
      })
    });

    if (res.ok) {
      // ✅ Clear input states
      setUsername("");
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");


    }

    const data = await res.json();
    alert(data.message);
  };
//onclick form disapper function
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

//return statement

  return (
    <>
    {/* logo */}
      <header className="flex flex-wrap items-center justify-between px-10 py-2 bg-white shadow-md sticky top-0 z-60">
        <div className="flex items-center">
          <a href="home.html">
            <img src={RNLogo} alt="logo" className="h-[70px]" />
          </a>
        </div>
{/* website header view */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-6 items-center list-none">
            <li className="hover:bg-purple-700">
              <Link to="/" className="block px-3 py-1 text-gray-800 font-medium text-base hover:text-white">
                Home
              </Link>
            </li>
            <li className="hover:bg-purple-700">
              <Link to="/about" className="block px-3 py-1 text-gray-800 font-medium text-base hover:text-white">
                About
              </Link>
            </li>
            <li className="hover:bg-purple-700">
              <Link to="/services" className="block px-3 py-1 text-gray-800 font-medium text-base hover:text-white">
                Our Services
              </Link>
            </li>
            <li className="hover:bg-purple-700">
              <Link to="/venues" className="block px-3 py-1 text-gray-800 font-medium text-base hover:text-white">
                Venues
              </Link>
            </li>
            <li className="hover:bg-purple-700">
              <Link to="/contact" className="block px-3 py-1 text-gray-800 font-medium text-base hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex items-center justify-end gap-4">
          <button
            onClick={toggleDropdown}
            className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition cursor-pointer"
          >
            Sign In
          </button>
        </div>

{/* mobile header view */}

        <div className="md:hidden text-3xl cursor-pointer ml-auto" onClick={toggleMobile}>
          ☰
        </div>
      </header>

      {showMobileNav && (
        <div className="flex flex-col md:hidden w-full bg-white text-gray-800 shadow-md px-4">
          <a href="/" className="py-2 hover:bg-purple-700 hover:text-white">Home</a>
          <a href="/about" className="py-2 hover:bg-purple-700 hover:text-white">About</a>
          <a href="services.html" className="py-2 hover:bg-purple-700 hover:text-white">Our Services</a>
          <a href="/venues" className="py-2 hover:bg-purple-700 hover:text-white">Venues</a>
          <a href="/contact" className="py-2 hover:bg-purple-700 hover:text-white">Contact</a>
          <button onClick={toggleDropdown} className="text-left py-2 hover:bg-purple-700 hover:text-whit">Sign In</button>
        </div>
      )}

{/* sign in from */}

      {showDropdown && (
        <div className="relative z-50">
          <div ref={popupRef} className="fixed right-10 mt-2 w-[30rem] max-h-[90vh] overflow-y-auto scrollbar-thin p-6 bg-white/95 rounded-lg shadow-lg">
            <div className="absolute inset-0 opacity-20 bg-no-repeat bg-center bg-[length:29em]" style={{ backgroundImage: `url("images/log-sign.png")`, zIndex: 1 }} />
            <div className="relative z-10">
              {authForm === "signin" && (
                <>
                  <h3 className="text-lg font-bold text-center mb-4">Sign In</h3>
                  <form className="flex flex-col gap-3 font-semibold">
                    <label>Email or Username</label>
                    <input type="text" placeholder="Enter your email or username" required className="px-3 py-2 border border-gray-300 rounded-full" />
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" required className="px-3 py-2 border border-gray-300 rounded-full" />
                    <button type="submit" className="mt-3 bg-purple-700 text-white rounded-full py-2 hover:cursor-pointer hover:bg-purple-800">Sign In</button>
                    <p className="text-center mt-2">
                      Don’t have an account?{" "}
                      <button type="button" onClick={() => toggleAuthForm("signup")} className="text-purple-700 hover:cursor-pointer hover:underline">Sign Up</button>
                    </p>
                  </form>
                </>
              )}

              {/* signUp form */}

              {authForm === "signup" && (
                <>
                  <h3 className="text-lg font-bold text-center mb-4">Sign Up</h3>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-semibold">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required className="px-3 py-2 border border-gray-300 rounded-full" />

                    <label>Full Name</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" required className="px-3 py-2 border border-gray-300 rounded-full" />



                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required className="px-3 py-2 border border-gray-300 rounded-full" />


                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required className="px-3 py-2 border border-gray-300 rounded-full" />

                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" required className="px-3 py-2 border border-gray-300 rounded-full" />

                    <button type="submit" className="mt-3 bg-purple-700 text-white rounded-full hover:cursor-pointer hover:bg-purple-800 py-2">Register</button>

                    <p className="text-center mt-2">
                      Already have an account?{" "}
                      <button type="button" onClick={() => toggleAuthForm("signin")} className="text-purple-700 hover:underline hover:cursor-pointer ">Sign In</button>
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
