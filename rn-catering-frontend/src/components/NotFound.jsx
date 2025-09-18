import React from "react";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import cartoon from "../assets/images/cartoon.png";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white relative overflow-hidden">
      <div className="text-9xl font-extrabold text-gray-800 animate-bounce">
        404
      </div>

      <img
        loading="lazy"
        src={cartoon}
        alt="Cartoon"
        className="w-48 h-48 mt-4 animate-bounce-slow"
      />

      <h1 className="text-3xl md:text-4xl mt-6 font-semibold text-gray-700 animate-pulse">
        Oops! Page Not Found
      </h1>
      <p className="mt-2 text-center mb-3 max-w-md text-gray-600">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>

      {/* Back Home Button */}
      <button
        onClick={() => {
          console.log("Button clicked, navigating home");
          navigate("/");
        }}
        className="btn"
      >
        Go Back Home
      </button>

      <span className="absolute w-6 h-6 bg-purple-200 rounded-full opacity-40 animate-float top-10 left-10"></span>
      <span className="absolute w-8 h-8 bg-pink-200 rounded-full opacity-30 animate-float delay-1000 top-32 left-72"></span>
      <span className="absolute w-4 h-4 bg-yellow-200 rounded-full opacity-50 animate-float delay-2000 top-60 left-40"></span>
    </div>
  );
};

export default NotFound;
