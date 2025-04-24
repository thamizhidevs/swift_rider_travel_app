
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import GlitchText from "./GlitchText";
import TypingText from "./TypingText";
import GlassmorphicNeon from "./GlassmorphicNeon";

interface AnimatedHeroSectionProps {
  title: React.ReactNode;
  subtitle?: string;
  typingTexts?: string[];
}

const AnimatedHeroSection = ({ 
  title, 
  subtitle = "Affordable, safe, and reliable transport at your fingertips.", 
  typingTexts = ["Book anytime", "Ride anywhere", "Travel safely", "Pay easily"] 
}: AnimatedHeroSectionProps) => {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate position relative to the center (-1 to 1 range)
      const x = (clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (clientY - innerHeight / 2) / (innerHeight / 2);
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24 pb-12 md:pb-20">
      {/* Subtle, smooth particles */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-purple-soft/40 blur-lg"
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transition: "transform 0.3s ease-out",
              transform: `translate(
                ${mousePosition.x * (i % 5) * 10}px, 
                ${mousePosition.y * (i % 3) * 10}px
              )`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div 
            className={`w-full lg:w-7/12 text-center lg:text-left transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="mb-3">
              <span className="block font-headline text-5xl md:text-7xl font-bold leading-tight text-gray-900">
                {typeof title === "string" ? <GlitchText text={title} duration={1500} /> : title}
              </span>
              <span className="text-purple font-display block mt-1 text-lg md:text-2xl font-semibold">
                <TypingText 
                  textArray={typingTexts} 
                  typingSpeed={60} 
                  deletingSpeed={30} 
                />
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 mb-9 font-sans max-w-2xl mx-auto lg:mx-0 animate-fade-in">
              {subtitle}
            </p>
            {/* Split CTA Panel */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link 
                to="/login"
                className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-purple-light to-purple text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 flex items-center group"
              >
                Ride as a Passenger
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/register"
                className="px-8 py-3 rounded-full font-semibold border-2 border-purple bg-white text-purple hover:bg-purple-soft hover:text-purple-dark transition-all duration-200 shadow-md flex items-center group"
              >
                Drive & Earn
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div 
            className={`w-full lg:w-5/12 mt-12 lg:mt-0 transition-all duration-1000 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative mx-auto max-w-lg rounded-xl overflow-hidden shadow-xl bg-white/60 backdrop-blur-xl border border-purple-soft group animate-fade-in">
              <GlassmorphicNeon>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Urban traffic with taxis" 
                    className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 w-full">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                        <p className="text-sm font-medium">Your ride is on the way</p>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-600">ETA: 3 mins</span>
                        <span className="text-xs text-purple font-medium">$12.50</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Map route animation */}
                <div className="mt-4 bg-gray-50/70 p-3 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple"></div>
                    <div className="h-0.5 flex-1 bg-gray-200 mx-2 relative">
                      <div className="absolute inset-y-0 left-0 bg-purple rounded-r-full animate-[route_3s_ease-in-out_infinite]" style={{width: '70%'}}></div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <div>Current location</div>
                    <div>Destination</div>
                  </div>
                </div>
              </GlassmorphicNeon>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-purple-dark">
          <span className="text-sm mb-2">Scroll down</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default AnimatedHeroSection;

