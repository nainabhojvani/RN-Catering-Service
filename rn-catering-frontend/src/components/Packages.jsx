import React from "react";
import { Link } from "react-router-dom";

import economyImg from "../assets/images/packages_img/economy.png";
import basicImg from "../assets/images/packages_img/basic.png";
import standardImg from "../assets/images/packages_img/standard.png";
import deluxeImg from "../assets/images/packages_img/deluxe.avif";
import premiumImg from "../assets/images/packages_img/premium.avif";
import royalImg from "../assets/images/packages_img/royal.jpg";
import MenuBanner from "../assets/images/ourservice.jpg";
import TextSlider from "./TextSlider";

const packages = [
  {
    id: 1,
    name: "Economy Package",
    pricePerPlate: 300,
    items: ["1 Veg Sabji", "Dal", "Rice", "Roti", "Salad"],
    img: economyImg,
  },
  {
    id: 2,
    name: "Basic Package",
    pricePerPlate: 500,
    items: [
      "2 Veg sabji(Chhole Masala, Mix veg)",
      "Dal",
      "Rice",
      "Roti",
      "Salad",
    ],
    img: basicImg,
  },
  {
    id: 3,
    name: "Standard Package",
    pricePerPlate: 700,
    items: [
      "2 Veg sabji(Chhole Masala, Mix veg)",
      "1 Paneer Dish",
      "Dal",
      "Rice",
      "Roti",
      "Sweet",
    ],
    img: standardImg,
  },
  {
    id: 4,
    name: "Deluxe Package",
    pricePerPlate: 1000,
    items: [
      "2 Veg sabji(Chhole Masala, Mix veg)",
      "1 Paneer Dish",
      "Dal Tadka",
      "Rice",
      "Tandoori",
      "Roti",
      "Sweet",
      "Starter",
    ],
    img: deluxeImg,
  },
  {
    id: 5,
    name: "Premium Package",
    pricePerPlate: 1200,
    items: [
      "3 Veg sabji(choose by customer)",
      "Dal Fry",
      "Rice",
      "Roti",
      "Naan",
      "Sweet",
      "Starter",
      "Salad",
    ],
    img: premiumImg,
  },
  {
    id: 6,
    name: "Royal Package",
    pricePerPlate: 1500,
    items: [
      "3 Veg sabji(choose by customer)",
      "Dal Fry or Dal Tadka",
      "Rice",
      "Roti",
      "Naan",
      "2 Sweets",
      "2 Starters",
      "Salad",
      "Papad",
      "Butter Milk(chhas)",
    ],
    img: royalImg,
  },
];

const Package = () => {
  return (
    <div className="px-6 py-16 bg-gradient-to-br from-purple-50 to-green-50">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Our Packages
      </h1>

      {/* Package Cards */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
          >
            <img
              src={pkg.img}
              alt={pkg.name}
              className="h-[20rem] w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {pkg.name}
              </h2>
              <p className="text-lg font-semibold text-green-600 mb-4">
                ₹{pkg.pricePerPlate} / plate
              </p>
              <ul className="mb-6 text-sm text-gray-700 space-y-1">
                {pkg.items.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-purple-600 to-green-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Menu Button */}
      <div className="text-center mt-16">
        <Link
          to="/menu"
          className="inline-block px-8 py-3 bg-gradient-to-r from-green-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 transition"
        >
          Create Custom Menu
        </Link>
      </div>
    </div>
  );
};

export default function Packages() {
  return (
    <>
      <Package />
    </>
  );
}
