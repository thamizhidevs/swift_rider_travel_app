
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center mb-6">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-light to-purple"></div>
              <span className="ml-2 text-xl font-bold text-white font-display">SwiftRide</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Making transportation accessible, affordable, and efficient for everyone. Ride with us today and experience the difference.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-display">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition duration-300">Home</Link>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition duration-300">About Us</a>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition duration-300">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition duration-300">Register</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">FAQs</a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-display">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">Licensing</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">Data Protection</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-display">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest news and special offers.
            </p>
            <form className="flex mb-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-l-md w-full text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-purple hover:bg-purple-dark px-4 py-2 rounded-r-md transition duration-300"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500">
              By subscribing you agree to our privacy policy.
            </p>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} SwiftRide Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <select className="bg-gray-800 border border-gray-700 text-sm rounded px-2 py-1 text-gray-400 focus:outline-none focus:ring-1 focus:ring-purple">
              <option>English (US)</option>
              <option>Español</option>
              <option>Français</option>
            </select>
            <select className="bg-gray-800 border border-gray-700 text-sm rounded px-2 py-1 text-gray-400 focus:outline-none focus:ring-1 focus:ring-purple">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
