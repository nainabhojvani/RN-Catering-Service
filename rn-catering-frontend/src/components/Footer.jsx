import React from "react";
import { Link } from "react-router-dom";

import FooterLogo from "../assets/images/footer_logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#19522f] text-white px-5 py-10">
      <div className="max-w-[1300px] mx-auto flex flex-wrap justify-between gap-8">
        {/* Left Column */}
        <div className="flex-1 min-w-[250px]">
          <Link to="/">
            <img
              loading="lazy"
              src={FooterLogo}
              alt="footer logo"
              className="w-[130px] mb-5"
            />
          </Link>
          <address className="leading-relaxed mb-5 not-italic">
            B-405, Maple Trade Centre,
            <br />
            Near Surdhara Circle,
            <br />
            Thaltej, SG Road,
            <br />
            Ahmedabad, Gujarat 380059
          </address>
          <div className="flex gap-3 flex-wrap">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-white border border-white p-2 text-5xl rounded-full hover:bg-[#d9e45a] hover:text-[#19522f] transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-white border border-white p-2 text-5xl rounded-full hover:bg-[#d9e45a] hover:text-[#19522f] transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className="text-white border border-white p-2 text-5xl rounded-full hover:bg-[#d9e45a] hover:text-[#19522f] transition" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-white border border-white p-2 text-5xl rounded-full hover:bg-[#d9e45a] hover:text-[#19522f] transition" />
            </a>
          </div>
        </div>

        {/* Column 1 - Top Cities */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="mb-4 font-semibold text-lg">Top Cities</h3>
          <ul className="space-y-2">
            {[
              "Ahmedabad",
              "Vadodara",
              "Surat",
              "Gandhinagar",
              "Palanpur",
              "Mahesana",
            ].map((city) => (
              <li key={city}>
                <a href="#" className="hover:text-[#d9e45a] transition">
                  {city}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 - Top Categories */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="mb-4 font-semibold text-lg">Top Categories</h3>
          <ul className="space-y-2">
            {[
              "Office Party Catering",
              "Wedding Catering",
              "Birthday Party Catering",
              "Engagement Catering",
              "Event Catering",
              "School Event Catering",
            ].map((category) => (
              <li key={category}>
                <a href="#" className="hover:text-[#d9e45a] transition">
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Quick Links */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="mb-4 font-semibold text-lg">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link className="hover:text-[#d9e45a] transition" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#d9e45a] transition" to="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#d9e45a] transition" to="/services">
                Our Services
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#d9e45a] transition"
                to="/privacyTos"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-[#d9e45a] transition"
                to="/privacyTos"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#d9e45a] transition" to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4 - Contact */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="mb-4 font-semibold text-lg">Contact</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:info@rncatering.com"
                className="hover:text-[#d9e45a] transition"
              >
                info@rncatering.com
              </a>
            </li>
            <li>
              <a
                href="tel:+918799013176"
                className="hover:text-[#d9e45a] transition"
              >
                +91 12345 67890
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center border-t border-white mt-10 pt-5 text-gray-400 text-sm">
        © 2025 RN Catering. All rights reserved.
      </div>
    </footer>
  );
}
