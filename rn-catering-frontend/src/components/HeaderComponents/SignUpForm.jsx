// src/components/HeaderComponents/SignUpForm.jsx
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const API_URL = import.meta.env.VITE_API_URL;

export default function SignUpForm({ setAuthForm, setShowDropdown, setCenteredMsg }) {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loadingRegister, setLoadingRegister] = useState(false);

  // username/email availability check
  const checkAvailability = async (field, value) => {
    if (!value) return;
    try {
      const res = await fetch(`${API_URL}/api/check-${field}?${field}=${value}`);
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
    }
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Invalid email format.";
    }
    if (name === "password") {
      if (!value) error = "Password is required.";
      else if (value.length < 6) error = "Password must be at least 6 characters.";
    }
    if (name === "confirmPassword" && value && value !== password) {
      error = "Passwords do not match.";
    }
    return error;
  };

  const checkPasswordStrength = (pw) => {
    if (!pw) return "";
    if (pw.length < 6) return "weak";
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9!@#$%^&*]/.test(pw)) return "strong";
    return "medium";
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    if ((name === "username" || name === "email") && !error) {
      await checkAvailability(name, value);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username": setUsername(value); break;
      case "fullName": setFullName(value); break;
      case "email": setEmail(value); break;
      case "password":
        setPassword(value);
        setPasswordStrength(checkPasswordStrength(value));
        break;
      case "confirmPassword": setConfirmPassword(value); break;
      default: break;
    }
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

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

      setCenteredMsg("✅ Registration successful! Please check your email to verify your account.");
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

  return (
    <>
      <h3 className="text-lg font-bold text-center mb-4 text-[#19522f]">Sign Up</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-semibold">
        {/* Username */}
        <label className="text-[#19522f]">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter username"
          className="w-full rounded-full border border-[#759782] px-4 py-2
               bg-[#fffdf3] text-[#19522f] placeholder:text-[#d1dcd5]
               focus:outline-none focus:ring-2 focus:ring-[#d9e45a] focus:border-transparent"
        />
        {errors.username && touched.username && <p className="text-red-500 text-sm">{errors.username}</p>}

        {/* Full Name */}
        <label className="text-[#19522f]">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter full name"
          className="w-full rounded-full border border-[#759782] px-4 py-2
               bg-[#fffdf3] text-[#19522f] placeholder:text-[#d1dcd5]
               focus:outline-none focus:ring-2 focus:ring-[#d9e45a] focus:border-transparent"
        />
        {errors.fullName && touched.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

        {/* Email */}
        <label className="text-[#19522f]">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter email"
          className="w-full rounded-full border border-[#759782] px-4 py-2
               bg-[#fffdf3] text-[#19522f] placeholder:text-[#d1dcd5]
               focus:outline-none focus:ring-2 focus:ring-[#d9e45a] focus:border-transparent"
        />
        {errors.email && touched.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* Password */}
        <div className="relative w-full">
          <label className="text-[#19522f]">Password</label>
          <div className="flex items-center justify-between w-full rounded-full border border-[#759782] px-4 py-2 
                  bg-[#fffdf3] text-[#19522f] focus-within:ring-2 focus-within:ring-[#d9e45a] focus-within:border-transparent">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter password"
              className="flex-1 bg-transparent outline-none border-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-[#19522f]"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
          {password && (
            <div className="mt-1 text-sm">
              <p
                className={
                  passwordStrength === "weak"
                    ? "text-red-500"
                    : passwordStrength === "medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                }
              >
                Strength: {passwordStrength}
              </p>
            </div>
          )}
          {errors.password && touched.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="relative w-full mt-4">
          <label className="text-[#19522f]">Confirm Password</label>
          <div className="flex items-center justify-between w-full rounded-full border border-[#759782] px-4 py-2 
                  bg-[#fffdf3] text-[#19522f] focus-within:ring-2 focus-within:ring-[#d9e45a] focus-within:border-transparent">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm password"
              className="flex-1 bg-transparent outline-none border-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-500 hover:text-[#19522f]"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {errors.server && <p className="text-red-500 text-sm">{errors.server}</p>}

        <button
          type="submit"
          disabled={loadingRegister}
          className={`mt-3 rounded-full py-2 text-white font-semibold transition-colors ${loadingRegister
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#19522f] hover:bg-[#306344]"
            }`}
        >
          {loadingRegister ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-2">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setAuthForm("signin")}
            className="text-[#19522f] hover:cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </form>
    </>
  );
}
