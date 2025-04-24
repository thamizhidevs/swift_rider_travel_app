
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react"; 

export default function HeroSection() {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background with animated particles */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-soft/30 to-white z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-purple-soft/30 animate-float" 
            style={{
              width: `${Math.random() * 50 + 10}px`,
              height: `${Math.random() * 50 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 5 + 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div 
            className={`w-full lg:w-1/2 text-center lg:text-left transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 font-display">
              Ride Anytime, <span className="text-purple">Anywhere</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0">
              Affordable, safe, and reliable transport at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link 
                to="/login" 
                className="px-8 py-3 bg-purple text-white rounded-full hover:bg-purple-dark transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center group"
              >
                Login Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#about" 
                className="px-8 py-3 border border-purple text-purple rounded-full hover:bg-purple-soft transition duration-300"
              >
                Become a Driver
              </a>
            </div>
          </div>
          <div 
            className={`w-full lg:w-1/2 mt-12 lg:mt-0 transition-all duration-1000 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              {/* Main illustration */}
              <div className="bg-white rounded-xl shadow-xl p-6 relative z-10 animate-float">
                <div className="aspect-w-16 aspect-h-9 rounded-lg bg-gray-100 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Urban traffic with taxis" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
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
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
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
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-muted rounded-full opacity-70"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-soft rounded-full opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-purple">
          <span className="text-sm mb-2">Scroll down</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
