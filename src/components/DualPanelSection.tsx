
import { Car, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function DualPanelSection() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-r from-purple-soft via-white to-purple-soft/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Riders Panel */}
          <div className="group rounded-3xl shadow-xl bg-white/80 hover:bg-purple-light/30 border border-purple-soft transition p-8 flex flex-col items-center text-center min-h-[350px]">
            <div className="bg-purple/10 p-4 rounded-full mb-4">
              <Car className="w-10 h-10 text-purple" />
            </div>
            <h3 className="text-2xl font-headline font-extrabold text-gray-900 mb-2">For Riders</h3>
            <p className="mb-6 text-gray-600">
              Instantly book rides anywhere, with friendly drivers, real-time tracking, and no surprises. 
              City commutes, airport trips, or daily runs &mdash; we’ve got you covered!
            </p>
            <Link to="/login" className="inline-block px-7 py-3 bg-gradient-to-r from-purple to-purple-dark text-white rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-xl focus:outline-none transition group-hover:bg-purple">
              Ride Now
              <ArrowRight className="ml-2 w-5 h-5 inline-block align-middle" />
            </Link>
          </div>

          {/* Drivers Panel */}
          <div className="group rounded-3xl shadow-xl bg-white/80 hover:bg-purple-light/30 border border-purple-soft transition p-8 flex flex-col items-center text-center min-h-[350px]">
            <div className="bg-purple/10 p-4 rounded-full mb-4">
              <User className="w-10 h-10 text-purple" />
            </div>
            <h3 className="text-2xl font-headline font-extrabold text-gray-900 mb-2">For Drivers</h3>
            <p className="mb-6 text-gray-600">
              Drive on your schedule and earn more. We value your time: easy onboarding, 24/7 rider demand, fair earnings, and instant support!
            </p>
            <Link to="/register" className="inline-block px-7 py-3 border-2 border-purple text-purple rounded-full font-semibold shadow-md bg-white hover:bg-purple-soft hover:text-purple-dark focus:outline-none transition group-hover:bg-purple-soft">
              Join as Driver
              <ArrowRight className="ml-2 w-5 h-5 inline-block align-middle" />
            </Link>
          </div>
        </div>
        {/* Decorative image row */}
        <div className="flex gap-4 justify-center mt-10">
          <img src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=600&q=80"
            alt="Scenic city road" className="w-36 h-24 object-cover rounded-xl shadow-lg border-2 border-purple-soft hover:scale-105 transition-all" />
          <img src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=600&q=80"
            alt="Urban bridge" className="w-36 h-24 object-cover rounded-xl shadow-lg border-2 border-purple-soft hover:scale-105 transition-all" />
          <img src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=600&q=80"
            alt="Travel beach" className="w-36 h-24 object-cover rounded-xl shadow-lg border-2 border-purple-soft hover:scale-105 transition-all" />
        </div>
      </div>
    </section>
  );
}
