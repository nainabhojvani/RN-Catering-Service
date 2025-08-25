import React from "react";
import { useNavigate } from "react-router-dom";

export default function VerifiedSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      {/* Success Icon */}
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-green-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 
            6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 
            0 001.414 0l7-7a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-3">
        Email Verified Successfully!
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 max-w-xl text-center mb-8">
        Congratulations! Your email has been verified. You can now sign in and
        explore our services without any restrictions.
      </p>


    </div>
  );
}
