
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, MapPin, Clock, CreditCard, Star, Settings, Menu, X } from "lucide-react";
import AnimatedBackground from "../AnimatedBackground";

export default function RiderLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  
  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/rider/dashboard"
    },
    {
      icon: MapPin, 
      label: "Book a Ride",
      path: "/rider/book"
    },
    {
      icon: MapPin,
      label: "Ongoing Ride",
      path: "/rider/ride"
    },
    {
      icon: Clock,
      label: "Ride History",
      path: "/rider/history"
    },
    {
      icon: CreditCard,
      label: "Payments",
      path: "/rider/payments"
    },
    {
      icon: Star,
      label: "Ratings",
      path: "/rider/ratings"
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/rider/settings"
    }
  ];

  const isPathActive = (path: string) => pathname === path;

  return (
    <AnimatedBackground>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md shadow-sm">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-light to-purple animate-pulse-light"></div>
            <span className="ml-2 text-xl font-bold text-gray-800 font-display">SwiftRide</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-gray-700"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside 
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:relative z-20 top-0 left-0 h-full w-64 bg-white/80 backdrop-blur-md transition-transform duration-300 ease-in-out shadow-lg`}
        >
          <div className="p-4 border-b border-gray-100">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-light to-purple animate-pulse-light"></div>
              <span className="ml-2 text-xl font-bold text-gray-800 font-display">SwiftRide</span>
            </Link>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isPathActive(item.path)
                        ? 'bg-purple-soft text-purple font-medium'
                        : 'text-gray-700 hover:bg-purple-soft/50'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Link
              to="/login"
              className="flex items-center justify-center p-3 text-center text-gray-700 hover:text-purple"
            >
              Log out
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 md:pt-2 md:ml-0">
          {/* Top bar with user info */}
          <div className="hidden md:flex justify-end items-center mb-6 p-4 rounded-lg bg-white/60 backdrop-blur-sm shadow-sm">
            <div className="flex items-center">
              <div className="mr-2 text-right">
                <p className="font-medium text-sm text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-soft flex items-center justify-center text-purple font-medium">
                JD
              </div>
            </div>
          </div>
          
          {/* Page Content */}
          <div className="bg-white/60 backdrop-blur-md rounded-lg shadow-sm p-6">
            <Outlet />
          </div>
        </main>

        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/20 z-10"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </AnimatedBackground>
  );
}
