// src/components/HeaderComponents/SignInForm.jsx
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const API_URL = import.meta.env.VITE_API_URL;

export default function SignInForm({
  setAuthForm,
  setShowDropdown,
  setCenteredMsg,
  login,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      setEmail("");
      setPassword("");
      setShowDropdown(false);
    } catch (err) {
      console.error("Login error:", err);
      setErrors({ server: "Something went wrong. Try again." });
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <>
      <h3 className="text-lg font-bold text-center mb-4 text-[#19522f]">
        Sign In
      </h3>
      <form
        className="flex flex-col gap-3 font-semibold"
        onSubmit={handleLogin}
      >
        {/* Email */}
        <label className="text-[#19522f]">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full rounded-full border border-[#759782] px-4 py-2 
               bg-[#fffdf3] text-[#19522f] placeholder:text-[#d1dcd5]
               focus:outline-none focus:ring-2 focus:ring-[#d9e45a] focus:border-transparent"
        />

        {/* Password */}
        <label className="text-[#19522f]">Password</label>
        <div
          className="flex items-center justify-between w-full rounded-full border border-[#759782] px-4 py-2 
                  bg-[#fffdf3] text-[#19522f] focus-within:ring-2 focus-within:ring-[#d9e45a] focus-within:border-transparent"
        >
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="flex-1 bg-transparent outline-none border-none placeholder:text-[#d1dcd5]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-[#d1dcd5] hover:text-[#19522f]"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>

        {/* Error */}
        {errors.server && (
          <p className="text-red-500 text-sm">{errors.server}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loadingLogin}
          className={`mt-3 rounded-full py-2 text-[#fef8e0] font-semibold transition-colors ${
            loadingLogin
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#19522f] hover:bg-[#306344]"
          }`}
        >
          {loadingLogin ? "Signing In..." : "Sign In"}
        </button>

        {/* Switch form */}
        <p className="text-center mt-2 text-[#19522f]">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => setAuthForm("signup")}
            className="text-[#19522f] font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </>
  );
}
