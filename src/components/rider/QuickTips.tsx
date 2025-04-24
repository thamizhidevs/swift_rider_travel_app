
import React from "react";
import { MapPin, Star, CreditCard, Car } from "lucide-react";

const TIPS = [
  {
    icon: <MapPin className="w-6 h-6 text-purple" />,
    title: "Easy Pickup",
    desc: "Set your pickup point on the map for faster matching.",
  },
  {
    icon: <CreditCard className="w-6 h-6 text-purple" />,
    title: "Flexible Payments",
    desc: "Pay with cash, card, or wallet. Switch easily in app!",
  },
  {
    icon: <Star className="w-6 h-6 text-purple" />,
    title: "Rate Your Rides",
    desc: "Give feedback after your trip to help drivers and other riders.",
  },
  {
    icon: <Car className="w-6 h-6 text-purple" />,
    title: "Track Live",
    desc: "See your driver’s location and ETA in real time.",
  },
];

export default function QuickTips() {
  return (
    <section className="my-10">
      <h3 className="text-xl md:text-2xl font-bold text-purple mb-5 text-center">Get the Most from SwiftRide</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {TIPS.map((tip, idx) => (
          <div key={idx} className="bg-white/80 border border-purple-soft rounded-xl p-5 text-center shadow-md hover:scale-105 transition animate-fade-in">
            <div className="mb-2 flex justify-center">{tip.icon}</div>
            <h4 className="font-bold text-md text-gray-900">{tip.title}</h4>
            <p className="text-sm text-gray-600 mt-2">{tip.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
