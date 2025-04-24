
import React from "react";

export default function BannerWelcome() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-light/70 via-white to-purple-soft/80 shadow-xl mb-8 animate-fade-in">
      <div className="absolute inset-0">
        {/* Blurred travel illustration */}
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
          alt="People traveling together"
          className="absolute bottom-0 right-0 w-[300px] h-[200px] object-cover rounded-bl-2xl opacity-50 shadow-lg"
          style={{zIndex:1}}
        />
        <img
          src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=400&q=80"
          alt="Camels in the desert"
          className="absolute bottom-0 left-0 w-[170px] h-[120px] object-cover rounded-br-2xl opacity-70 shadow-lg"
          style={{zIndex:1}}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple to-white/60 to-85% opacity-80"></div>
      </div>
      <div className="p-7 md:p-12 z-10 relative flex flex-col md:flex-row items-center md:items-end justify-between min-h-[180px]">
        <div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-purple drop-shadow-lg mb-3">
            Welcome to SwiftRide!
          </h2>
          <p className="text-lg text-gray-800 max-w-xl font-medium drop-shadow">
            Effortlessly book, track, and enjoy every ride. Experience comfort, safety, and savings on every journey—whether you’re a rider or a driver.
          </p>
        </div>
        {/* Calls to Action */}
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4 mt-6 md:mt-0">
          <a href="/rider/book" className="inline-block px-6 py-3 rounded-xl bg-purple text-white shadow hover:scale-105 font-bold text-lg border border-purple-dark transition-all duration-200">
            Book Your Next Ride
          </a>
          <a href="/rider/ride" className="inline-block px-6 py-3 rounded-xl bg-white text-purple border-2 border-purple font-bold text-lg shadow hover:bg-purple-soft/40 hover:text-purple-dark transition-all duration-200">
            Track Ongoing Ride
          </a>
        </div>
      </div>
    </div>
  );
}
