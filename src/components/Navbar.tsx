
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-light to-purple animate-pulse-light"></div>
              <span className="ml-2 text-xl font-bold text-gray-800 font-display">SwiftRide</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple transition duration-300">Home</Link>
              <a href="#about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple transition duration-300">About</a>
              <a href="#contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple transition duration-300">Contact</a>
              <Link to="/register" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple transition duration-300">Register</Link>
              <Link to="/login" className="ml-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-purple hover:bg-purple-dark transition duration-300">Login</Link>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple"
            >
              <svg className={`h-6 w-6 ${isOpen ? "hidden" : "block"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-white/95 backdrop-blur-sm shadow-lg animate-fade-in`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple">Home</Link>
          <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple">About</a>
          <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple">Contact</a>
          <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple">Register</Link>
          <Link to="/login" className="block px-4 py-2 mt-2 rounded-md text-base font-medium text-white bg-purple hover:bg-purple-dark">Login</Link>
        </div>
      </div>
    </nav>
  );
}
