import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      {/* Top Section */}
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-12">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">VendoCart</h2>
          <p className="text-sm text-gray-400">
            Your trusted multi-vendor marketplace. Discover deals, save more, and shop with confidence.
          </p>
        </div>

        {/* About */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Return Policy</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-white">
            <a href="#"><FaFacebookF className="hover:text-blue-500 transition" /></a>
            <a href="#"><FaTwitter className="hover:text-blue-400 transition" /></a>
            <a href="#"><FaInstagram className="hover:text-pink-500 transition" /></a>
            <a href="#"><FaLinkedinIn className="hover:text-blue-600 transition" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} VendoCart. All rights reserved.
      </div>
    </footer>
  );
}
