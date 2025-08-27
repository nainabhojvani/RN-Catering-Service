// src/components/CenteredMessageBox.jsx

import React from "react";

const CenteredMessageBox = ({ message, onClose, style }) => {
  if (!message) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center  bg-black/70 z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#fef8e0] p-6 rounded shadow-lg w-[448px] text-center"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside box
      >
        <p className="text-green-600 text-lg" style={style}>
          {message}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-[#19522f] text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CenteredMessageBox;
