
import { useState, useEffect, useRef } from "react";
import { CheckCircle, Car, Map, Shield, CreditCard } from "lucide-react";

const features = [
  {
    icon: <Car className="w-10 h-10 text-purple" />,
    title: "Instant Ride Booking",
    description: "Book a ride in seconds and get picked up within minutes, no matter where you are."
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-purple" />,
    title: "Verified Drivers",
    description: "All our drivers are thoroughly vetted and trained for your safety and comfort."
  },
  {
    icon: <Map className="w-10 h-10 text-purple" />,
    title: "Live Ride Tracking",
    description: "Track your ride in real-time and share your journey with loved ones for extra security."
  },
  {
    icon: <CreditCard className="w-10 h-10 text-purple" />,
    title: "Multiple Payment Options",
    description: "Pay the way you want - cash, card, or wallet. Hassle-free and transparent pricing."
  },
  {
    icon: <Shield className="w-10 h-10 text-purple" />,
    title: "In-app Safety Tools",
    description: "Emergency contacts, SOS button, and 24/7 support for complete peace of mind."
  }
];

export default function AboutSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const interval = setInterval(() => {
            setVisibleItems(prev => {
              if (prev.length >= features.length) {
                clearInterval(interval);
                return prev;
              }
              return [...prev, prev.length];
            });
          }, 200);
          
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-soft/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-purple-soft/20"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-soft/20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-gray-900">Why Choose SwiftRide?</h2>
          <p className="text-lg text-gray-600">Experience the future of urban mobility with our cutting-edge ridesharing platform designed with your needs in mind.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-purple-soft/30 p-3 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 font-display">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center font-display text-gray-900">What Our Riders Say</h3>
          
          <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Regular Rider",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                quote: "SwiftRide has transformed my daily commute. Reliable drivers, clean cars, and the tracking feature gives me peace of mind."
              },
              {
                name: "David Chen",
                role: "Business Traveler",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                quote: "As someone who travels often for work, I appreciate the consistency and professionalism of SwiftRide's service across different cities."
              },
              {
                name: "Aisha Patel",
                role: "Weekend Explorer",
                image: "https://randomuser.me/api/portraits/women/66.jpg",
                quote: "The best thing about SwiftRide is how quickly a car arrives, even during peak hours. Never been late to an appointment since I started using it!"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-md flex-shrink-0 w-full md:w-1/3 border border-gray-100 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic">"{testimonial.quote}"</blockquote>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
