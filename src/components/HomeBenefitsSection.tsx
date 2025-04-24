
import { User, Car, Star, Shield, Phone } from "lucide-react";

const BENEFITS = [
  {
    icon: Car,
    title: "Anytime, Anywhere",
    description: "Book a ride 24/7, in any city or town, with real-time arrival tracking.",
  },
  {
    icon: User,
    title: "Friendly Drivers",
    description: "Our trusted, background-checked drivers ensure safe and pleasant journeys.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "In-app SOS, phone/email support, and driver/rider ratings for accountability.",
  },
  {
    icon: Star,
    title: "Quality & Rewards",
    description: "Enjoy rewards, best fares, and 5-star experiences every trip.",
  },
  {
    icon: Phone,
    title: "Easy to Use",
    description: "Intuitive app design, fast payments, and quick customer support.",
  }
];

export default function HomeBenefitsSection() {
  return (
    <section className="py-14 bg-white/90">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-headline text-gray-900 font-bold mb-10 tracking-tight text-center animate-fade-in">
          Why Choose <span className="text-purple">SwiftRide?</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {BENEFITS.map(({ icon: Icon, title, description }, i) => (
            <div key={title}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-purple-soft/60 to-white border border-purple-soft shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="mb-4 p-3 rounded-full bg-purple/10">
                <Icon className="h-8 w-8 text-purple" aria-hidden />
              </span>
              <h3 className="text-xl font-bold mb-2 font-headline">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
