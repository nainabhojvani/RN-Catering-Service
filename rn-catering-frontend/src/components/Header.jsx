import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import RNLogo from "../assets/images/RN_logo.png";
import personImg from "../assets/images/person.png";
import useAuth from "../context/useAuth";
import CenteredMessageBox from "./centerMsgbox";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const API_URL = import.meta.env.VITE_API_URL;

export default function Header() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [authForm, setAuthForm] = useState("signin");
  const [centeredMsg, setCenteredMsg] = useState("");

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");

  // Loading states
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMobile = () => setShowMobileNav(!showMobileNav);
  const toggleAuthForm = (form) => {
    setErrors({});
    setTouched({});
    setAuthForm(form);
  };

  const handleLogout = () => {
    logout();
    setCenteredMsg("Logged out successfully ✅");
    navigate("/");
  };

  // username/email availability check
  // username/email availability check
  const checkAvailability = async (field, value) => {
    if (!value) return;

    try {
      const res = await fetch(`${API_URL}/api/check-${field}?${field}=${value}`);
      // Ensure we only parse JSON if response is valid
      if (!res.ok) throw new Error("Failed to fetch availability");

      const data = await res.json();
      setErrors((prev) => ({
        ...prev,
        [field]: data.exists
          ? `${field === "username" ? "Username" : "Email"} already exists.`
          : "",
      }));
    } catch (err) {
      console.error(`${field} check failed:`, err.message);
      // Optional: show a generic error in UI or skip
    }
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Invalid email format.";
    }
    if (name === "password") {
      if (!value) error = "Password is required.";
      else if (value.length < 6) error = "Password must be at least 6 characters."; // <- this
    }
    if (name === "confirmPassword" && value && value !== password) {
      error = "Passwords do not match.";
    }
    return error;
  };

  const checkPasswordStrength = (pw) => {
    if (!pw) return "";
    if (pw.length < 6) return "Weak";
    else if (/[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9!@#$%^&*]/.test(pw)) return "Strong";
    else return "Medium";
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    // normal validation
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    // availability check only if no validation error
    if ((name === "username" || name === "email") && !error) {
      try {
        await checkAvailability(name, value);
      } catch (err) {
        console.error("Availability check error:", err.message);
      }
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "fullName":
        setFullName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        setPasswordStrength(checkPasswordStrength(value));
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // Sign Up
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = { username, fullName, email, password, confirmPassword };
    const newErrors = {};
    Object.entries(fields).forEach(([key, value]) => {
      newErrors[key] = validateField(key, value);
    });
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    setLoadingRegister(true);
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ server: data.message || "Registration failed." });
        return;
      }

      setCenteredMsg(
        "✅ Registration successful! Please check your email to verify your account."
      );
      setUsername(""); setFullName(""); setEmail(""); setPassword(""); setConfirmPassword("");
      setShowDropdown(false);
      setAuthForm("signin");
    } catch (err) {
      console.error("Registration error:", err);
      setErrors({ server: "Something went wrong. Try again." });
    } finally {
      setLoadingRegister(false);
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername: email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ server: data.message || "Login failed." });
        return;
      }

      login(data.user, data.token);
      setCenteredMsg("Login successful ✅");
      setEmail(""); setPassword(""); setShowDropdown(false);
    } catch (err) {
      console.error("Login error:", err);
      setErrors({ server: "Something went wrong. Try again." });
    } finally {
      setLoadingLogin(false);
    }
  };

  const popupRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <>
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between px-10 py-2 bg-white shadow-md sticky top-0 z-60">
        <div className="flex items-center">
          <Link to="/"><img src={RNLogo} alt="logo" className="h-[70px]" /></Link>
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
                    `relative block px-5 py-2 font-semibold text-base rounded-sm transition-all duration-300 ease-in-out
                    ${isActive ? "bg-purple-500 text-white z-10" : "text-gray-800 hover:text-white hover:bg-purple-500"}
                    after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-0 after:h-0.5 after:rounded-full after:transition-all after:duration-500 after:bg-gradient-to-r after:from-purple-500 after:via-purple-600 after:to-purple-700
                    hover:after:w-full ${isActive ? "after:w-full" : ""}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Header */}
        <div className="hidden md:flex items-center justify-end gap-4">
          {!user ? (
            <button
              onClick={toggleDropdown}
              className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition cursor-pointer"
            >
              Sign In
            </button>
          ) : (
            <Link to={`/profile/${user.username}`}>
              <img src={personImg} className="w-8 h-8 rounded-full border-black border-1" alt="Profile" />
            </Link>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden text-3xl cursor-pointer ml-auto" onClick={toggleMobile}>☰</div>
      </header>

      {/* Auth Popup */}
      {showDropdown && (
        <div className="relative z-50">
          <div
            ref={popupRef}
            className="fixed right-10 mt-2 w-[30rem] max-h-[90vh] overflow-y-auto scrollbar-thin p-6 bg-white/95 rounded-lg shadow-lg"
          >
            <div className="relative z-10">
              {authForm === "signin" && (
                <>
                  <h3 className="text-lg font-bold text-center mb-4">Sign In</h3>
                  <form className="flex flex-col gap-3 font-semibold" onSubmit={handleLogin}>
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter email"
                      className="px-3 py-2 border border-gray-300 rounded-full"
                    />
                    <div className="relative w-full">
                      <label>Password</label>

                      {/* Input + Eye Icon */}
                      <div className="flex items-center border border-gray-300 rounded-full px-3 py-2.5 w-full">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter your password"
                          className="flex-1 outline-none border-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </button>
                      </div>

                      {/* Optional validation */}
                      {errors.password && touched.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )}
                    </div>
                    {errors.server && <p className="text-red-500 text-sm">{errors.server}</p>}
                    <button
                      type="submit"
                      disabled={loadingLogin}
                      className={`mt-3 rounded-full py-2 text-white ${loadingLogin ? "bg-gray-400 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800"}`}
                    >
                      {loadingLogin ? "Signing In..." : "Sign In"}
                    </button>
                    <p className="text-center mt-2">
                      Don’t have an account?{" "}
                      <button type="button" onClick={() => toggleAuthForm("signup")} className="text-purple-700 hover:cursor-pointer hover:underline">
                        Sign Up
                      </button>
                    </p>
                  </form>
                </>
              )}

              {authForm === "signup" && (
                <>
                  <h3 className="text-lg font-bold text-center mb-4">Sign Up</h3>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-semibold">
                    {/* Username */}
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleChange} onBlur={handleBlur} placeholder="Enter username" className="px-3 py-2 border border-gray-300 rounded-full" />
                    {errors.username && touched.username && <p className="text-red-500 text-sm">{errors.username}</p>}

                    {/* Full Name */}
                    <label>Full Name</label>
                    <input type="text" name="fullName" value={fullName} onChange={handleChange} onBlur={handleBlur} placeholder="Enter full name" className="px-3 py-2 border border-gray-300 rounded-full" />
                    {errors.fullName && touched.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

                    {/* Email */}
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={handleChange} onBlur={handleBlur} placeholder="Enter email" className="px-3 py-2 border border-gray-300 rounded-full" />
                    {errors.email && touched.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    <div className="relative w-full">
                      <label>Password</label>

                      {/* Input + Eye Icon */}
                      <div className="flex items-center border border-gray-300 rounded-full px-3 py-2.5 w-full">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter password"
                          className="flex-1 outline-none border-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </button>
                      </div>

                      {/* Password strength indicator */}
                      {password && (
                        <div className="mt-1 text-sm">
                          <p
                            className={`${passwordStrength === "weak"
                                ? "text-red-500"
                                : passwordStrength === "medium"
                                  ? "text-yellow-500"
                                  : "text-green-500"
                              }`}
                          >
                            Strength: {passwordStrength}
                          </p>
                        </div>
                      )}

                      {/* Validation/Error */}
                      {errors.password && touched.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )}
                    </div>


                    {/* Confirm Password */}
                    <div className="relative w-full mt-4">
                      <label>Confirm Password</label>
                      <div className="flex items-center border border-gray-300 rounded-full px-3 py-2.5 w-full">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Confirm password"
                          className="flex-1 outline-none border-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </button>
                      </div>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>


                    {errors.server && <p className="text-red-500 text-sm">{errors.server}</p>}

                    <button type="submit" disabled={loadingRegister} className={`mt-3 rounded-full py-2 text-white ${loadingRegister ? "bg-gray-400 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800"}`}>
                      {loadingRegister ? "Registering..." : "Register"}
                    </button>
                    <p className="text-center mt-2">
                      Already have an account?{" "}
                      <button type="button" onClick={() => toggleAuthForm("signin")} className="text-purple-700 hover:underline hover:cursor-pointer">
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

      <CenteredMessageBox message={centeredMsg} onClose={() => setCenteredMsg("")} />
    </>
  );
}
