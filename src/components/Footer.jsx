import React from "react";
import FooterLogo from "../assets/images/footer_logo.png";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-5 py-10">
      <div className="max-w-[1300px] mx-auto flex flex-wrap justify-between gap-8">
        {/* Left Column */}
        <div className="flex-1 min-w-[250px]">
          <a href="home.html">
            <img src={FooterLogo} alt="footer logo" className="w-[130px] mb-5" />
          </a>
          <address className="leading-relaxed mb-5">
            B-405, Maple Trade Centre,<br />
            Near Surdhara Circle,<br />
            Thaltej, SG Road,<br />
            Ahmedabad, Gujarat 380059
          </address>
          <div className="flex gap-3 flex-wrap">
            <a href="https://facebook.com" target="_blank">
              <FaFacebookF className="text-white border border-white p-2 text-5xl rounded-full hover:bg-white hover:text-purple-800 transition" />
            </a>
            <a href="https://instagram.com" target="_blank">
              <FaInstagram className="text-white border border-white p-2 text-5xl rounded-full hover:bg-white hover:text-purple-800 transition" />
            </a>
            <a href="https://twitter.com" target="_blank">
              <FaTwitter className="text-white border border-white p-2 text-5xl rounded-full hover:bg-white hover:text-purple-800 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank">
              <FaLinkedinIn className="text-white border border-white p-2 text-5xl rounded-full hover:bg-white hover:text-purple-800 transition" />
            </a>
          </div>
        </div>

        {/* Column 1 */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="mb-4 font-semibold text-lg">Top Cities</h3>
          <ul className="space-y-2">
            {["Ahmedabad", "Vadodara", "Surat", "Gandhinagar", "Palanpur", "Mahesana"].map((city) => (
              <li key={city}>
                <a href="#" className="hover:text-purple-500 transition">{city}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="mb-4 font-semibold text-lg">Top Categories</h3>
          <ul className="space-y-2">
            <li><a className="hover:text-purple-500 transition" href="#">Office Party Catering</a></li>
            <li><a className="hover:text-purple-500 transition" href="#">Wedding Catering</a></li>
            <li><a className="hover:text-purple-500 transition" href="#">Birthday Party Catering</a></li>
            <li><a className="hover:text-purple-500 transition" href="#">Engagement Catering</a></li>
            <li><a className="hover:text-purple-500 transition" href="#">Event Catering</a></li>
            <li><a className="hover:text-purple-500 transition" href="#">School Event Catering</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="mb-4 font-semibold text-lg">Quick Links</h3>
          <ul className="space-y-2">
            <li><a className="hover:text-purple-500 transition" href="home.html">Home</a></li>
            <li><a className="hover:text-purple-500 transition" href="about.html">About Us</a></li>
            <li><a className="hover:text-purple-500 transition" href="#">Our Services</a></li>
            <li><a className="hover:text-purple-500 transition" href="#">Terms of Service</a></li>
            <li><a className="hover:text-purple-500 transition" href="#">Privacy</a></li>
            <li><a className="hover:text-purple-500 transition" href="contact.html">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="mb-4 font-semibold text-lg">Contact</h3>
          <ul className="space-y-2">
            <li><a className="hover:text-purple-500 transition" href="#">Need Help?</a></li>
            <li><a className="hover:text-purple-500 transition" href="mailto:info@rncatering.com">info@rncatering.com</a></li>
            <li><a className="hover:text-purple-500 transition" href="tel:+918799013176">+91 12345 67890</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center border-t border-white mt-10 pt-5 text-gray-400 text-sm">
        © 2025 RN Catering. All rights reserved.
      </div>
    </footer>
  );
}
