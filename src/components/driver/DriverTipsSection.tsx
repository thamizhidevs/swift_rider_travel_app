
import React from "react";

const TIPS = [
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
    title: "Improve Your Ratings",
    desc: "Greet passengers warmly, keep your car clean, and drive safely for higher tips and reviews.",
  },
  {
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400",
    title: "Boost Your Earnings",
    desc: "Drive during peak hours and watch out for hot zones with higher demand & surge fares.",
  },
  {
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400",
    title: "Stay Updated",
    desc: "Check Announcements regularly for news about features, payments, and support.",
  },
];

export default function DriverTipsSection() {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-purple mb-3">Pro Tips for SwiftRide Drivers</h3>
      <div className="grid md:grid-cols-3 gap-5">
        {TIPS.map((tip, idx) => (
          <div
            key={idx}
            className="bg-white border border-purple-soft rounded-xl shadow group hover:scale-105 hover:shadow-lg transition p-0 flex flex-col items-stretch animate-fade-in"
          >
            <img
              src={tip.image + "&q=80"}
              alt={tip.title}
              className="w-full h-32 object-cover rounded-t-xl"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h4 className="font-semibold text-purple">
                {tip.title}
              </h4>
              <p className="text-gray-600 mt-1 text-sm flex-1">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
