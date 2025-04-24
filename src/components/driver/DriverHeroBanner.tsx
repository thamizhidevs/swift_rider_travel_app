
import React from "react";

export default function DriverHeroBanner() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg mb-6 animate-fade-in">
      <img
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&q=80"
        alt="SwiftRide banner hero"
        className="w-full h-56 object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-light/80 via-purple/30 to-purple/70 flex items-center">
        <div className="p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow mb-2">Welcome to your Driver Dashboard!</h2>
          <p className="text-lg text-gray-100">See your stats, manage rides, and earn with SwiftRide.</p>
        </div>
      </div>
    </div>
  );
}
