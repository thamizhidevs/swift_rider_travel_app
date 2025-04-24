
import { Car, MapPin, Clock, CreditCard, Shield, Users, Star } from "lucide-react";

const FEATURES = [
  {
    icon: <MapPin className="w-7 h-7 text-purple" />,
    title: "Everywhere, Every Day",
    description: "Connect to rides and drivers in every major city and town.",
  },
  {
    icon: <Clock className="w-7 h-7 text-purple" />,
    title: "No Waiting",
    description: "Get picked up fast with our instant matching system.",
  },
  {
    icon: <CreditCard className="w-7 h-7 text-purple" />,
    title: "Smart Payments",
    description: "Multiple payment options with receipts & fare transparency.",
  },
  {
    icon: <Shield className="w-7 h-7 text-purple" />,
    title: "Safety & Security",
    description: "24/7 safety tools, in-app help lines, and always insured.",
  },
  {
    icon: <Users className="w-7 h-7 text-purple" />,
    title: "Inclusive for All",
    description: "Accessible rides for seniors, families, and differently abled guests.",
  },
  {
    icon: <Star className="w-7 h-7 text-purple" />,
    title: "Top Rated",
    description: "Excellent rider & driver reviews across all platforms.",
  },
  {
    icon: <Car className="w-7 h-7 text-purple" />,
    title: "Eco-Friendly",
    description: "Hybrid and EV rides available to reduce your carbon footprint.",
  },
];

export default function AppFeaturesGrid() {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-purple-soft/30 to-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-headline text-gray-900 font-bold mb-10 tracking-tight text-center animate-fade-in">
          SwiftRide Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="flex flex-col items-center bg-white rounded-2xl p-6 shadow hover:shadow-lg border border-purple-soft text-center transition-transform duration-200 group animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="mb-3">{f.icon}</div>
              <h4 className="font-semibold text-xl mb-2">{f.title}</h4>
              <p className="text-gray-600 text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
