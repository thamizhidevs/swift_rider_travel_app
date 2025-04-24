
import React from "react";

const BENEFITS = [
  {
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400",
    label: "Flexible Schedule",
    text: "Drive whenever you want. Enjoy freedom and work-life balance as a SwiftRide partner.",
  },
  {
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
    label: "Weekly Payouts",
    text: "Get paid every week directly to your account. No waiting!",
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    label: "Friendly Community",
    text: "Join a network of drivers supporting each other on and off the road.",
  },
  {
    img: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400",
    label: "24/7 Driver Support",
    text: "Our helpdesk is available day and night for emergencies or questions.",
  },
];

export default function DriverHowItHelpsSection() {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-purple mb-4">How SwiftRide Helps You</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {BENEFITS.map((ben, idx) => (
          <div
            key={idx}
            className="bg-white border border-purple-soft rounded-xl shadow p-0 group hover:scale-105 hover:shadow-lg transition flex flex-col items-stretch animate-fade-in"
          >
            <img
              src={ben.img + "&q=80"}
              alt={ben.label}
              className="w-full h-28 object-cover rounded-t-xl"
            />
            <div className="p-4 flex-1 flex flex-col">
              <span className="font-bold text-purple">{ben.label}</span>
              <p className="text-gray-600 text-sm mt-1 flex-1">{ben.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
