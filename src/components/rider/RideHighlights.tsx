
import React from "react";
import { MapPin, Star } from "lucide-react";

// Sample trips
const trips = [
  {
    date: "2024-04-10",
    pickup: "Green Park Metro",
    dropoff: "City Mall",
    driver: "Sarita V.",
    avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    rating: 5
  },
  {
    date: "2024-04-03",
    pickup: "Airport",
    dropoff: "Tech Hub",
    driver: "Jitendra P.",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    rating: 4
  },
  {
    date: "2024-03-28",
    pickup: "Old Market",
    dropoff: "Hill View Resort",
    driver: "Anjali S.",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    rating: 5
  }
];

export default function RideHighlights() {
  return (
    <section className="my-8">
      <h3 className="text-xl md:text-2xl font-bold text-purple mb-4">Recent Trip Highlights</h3>
      <div className="flex flex-col gap-4">
        {trips.map(trip => (
          <div key={trip.date+trip.driver} className="flex items-center bg-white/90 border border-purple-soft rounded-xl shadow p-4 gap-4 animate-fade-in">
            <img
              src={trip.avatar}
              alt={trip.driver}
              className="w-14 h-14 rounded-full border-2 border-purple object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <span>{trip.date}</span>
                <span>•</span>
                <span className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {trip.rating}
                </span>
              </div>
              <div className="mt-1 font-medium text-md">
                {trip.pickup} 
                <MapPin className="inline mx-2 text-purple" /> 
                {trip.dropoff}
              </div>
              <div className="text-gray-500 text-sm">Driver: {trip.driver}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
