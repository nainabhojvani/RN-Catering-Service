// src/components/CenteredMessageBox.jsx

import React from "react";

const CenteredMessageBox = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center  bg-black/70 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-[448px] text-center"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside box
      >
        <p className="text-green-600 text-lg">{message}</p>
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CenteredMessageBox;
