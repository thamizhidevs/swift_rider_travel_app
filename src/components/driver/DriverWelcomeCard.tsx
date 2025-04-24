
import React from "react";

export default function DriverWelcomeCard() {
  return (
    <div className="flex flex-col md:flex-row bg-white/90 border border-purple-soft rounded-lg shadow-md overflow-hidden mb-6 animate-fade-in">
      <img
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80"
        alt="John Driver profile"
        className="object-cover w-full md:w-48 h-36 md:h-auto"
      />
      <div className="flex-1 p-6">
        <h3 className="text-2xl font-bold text-purple mb-1">Hello, John Driver 👋</h3>
        <p className="text-gray-700">You have <b>12 active rides today</b>. Stay safe and earn more with your dedication!</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Online</span>
          <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs">4.8 ★ rating</span>
          <span className="bg-purple-100 text-purple px-3 py-1 rounded-full text-xs">SwiftRide PRO member</span>
        </div>
      </div>
    </div>
  );
}
