
import React from "react";
import { Star } from "lucide-react";

export default function InfographicRatings() {
  return (
    <section className="bg-white/90 border border-purple-soft rounded-xl shadow p-6 mb-10 mt-4 animate-fade-in">
      <h3 className="text-xl font-bold text-purple mb-4">Your Feedback Makes an Impact!</h3>
      <div className="flex flex-col md:flex-row items-center gap-7">
        <div className="flex flex-col items-center">
          <div className="flex items-center text-yellow-400 text-3xl mb-2">
            <Star className="fill-yellow-400 w-8 h-8" />
            <Star className="fill-yellow-400 w-8 h-8" />
            <Star className="fill-yellow-400 w-8 h-8" />
            <Star className="fill-yellow-400 w-8 h-8" />
            <Star className="fill-yellow-400 w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-xl text-purple">4.9 / 5.0</p>
            <p className="text-gray-500 text-sm">Average Rider Rating</p>
          </div>
        </div>
        <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 md:mt-0">
          <li className="bg-purple-soft/30 p-3 rounded-lg ">
            <span className="font-bold text-purple">98%</span>{" "}
            of our users say they’d recommend SwiftRide.
          </li>
          <li className="bg-purple-soft/30 p-3 rounded-lg ">
            <span className="font-bold text-purple">Fast Response:</span>{" "}
            Support queries answered in under 3 min.
          </li>
          <li className="bg-purple-soft/30 p-3 rounded-lg ">
            <span className="font-bold text-purple">Top Drivers:</span>{" "}
            90% riders only give 5-star reviews!
          </li>
          <li className="bg-purple-soft/30 p-3 rounded-lg ">
            <span className="font-bold text-purple">Safe & Reliable:</span>{" "}
            Zero reported incidents this month.
          </li>
        </ul>
      </div>
    </section>
  );
}
