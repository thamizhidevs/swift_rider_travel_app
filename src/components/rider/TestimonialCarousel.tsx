
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aakash N.",
    comment:
      "SwiftRide made my daily commutes so much easier. Booking is super fast, and the drivers are always friendly!",
    avatar:
      "https://randomuser.me/api/portraits/men/97.jpg",
    rating: 5
  },
  {
    name: "Salma R.",
    comment:
      "Love the professional service—rides are comfy and always on time. I save money using my promo codes too!",
    avatar:
      "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5
  },
  {
    name: "George T.",
    comment:
      "I joined as a driver last month and got my first payout within days. Riders are nice and the support team rocks!",
    avatar:
      "https://randomuser.me/api/portraits/men/17.jpg",
    rating: 4
  }
];

export default function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[idx];

  return (
    <div className="relative max-w-lg mx-auto bg-white/80 rounded-2xl shadow-lg px-8 py-6 animate-fade-in">
      <div className="flex items-center space-x-4 mb-3">
        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-purple" />
        <div>
          <p className="font-bold text-purple">{testimonial.name}</p>
          <div className="flex text-yellow-400">
            {Array.from({ length: testimonial.rating }).map((_, i) => <Star key={i} className="fill-yellow-400 w-4 h-4" />)}
          </div>
        </div>
      </div>
      <blockquote className="italic text-gray-700">"{testimonial.comment}"</blockquote>
      <div className="flex mt-4 space-x-2 justify-center">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-purple" : "bg-purple-soft"}`}
          />
        ))}
      </div>
    </div>
  );
}
