import React from "react";
import useAuth from "../context/useAuth"; // ✅ import the custom hook
import personImg from "../assets/images/person.png";


const Profile = () => {
  const { user, setUser } = useAuth();

  if (!user) {
    return <p className="text-center mt-10">Please login to view profile.</p>;
  }

  const handleLogout = () => {
    localStorage.clear();
    setUser(null); // ✅ clears context user too
    window.location.href = "/";
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg max-w-sm mx-auto mt-8 mb-10 border-black-200 border-1 text-center">
      <img
        src={personImg}
        alt="Profile"
        className="w-20 h-20 mx-auto rounded-full border-black-200 border-1 mb-4"
      />
      <h2 className="text-xl font-bold"> Name: {user.fullName}</h2>
      <p className="text-gray-600">Email: {user.email}</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
