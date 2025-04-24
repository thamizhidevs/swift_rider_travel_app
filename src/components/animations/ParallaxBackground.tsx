
import { useEffect, useRef } from "react";

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  intensity?: number;
}

const ParallaxBackground = ({ children, intensity = 0.2 }: ParallaxBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate position relative to the center
      const xPos = (clientX - innerWidth / 2) * intensity;
      const yPos = (clientY - innerHeight / 2) * intensity;
      
      // Apply parallax effect
      containerRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [intensity]);
  
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Static background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-soft/30 via-white to-purple-soft/20" />
      
      {/* Parallax container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 transition-transform duration-300 ease-out"
      >
        {/* Light flares */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`flare-${i}`}
            className="absolute rounded-full bg-white blur-3xl mix-blend-soft-light"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              opacity: Math.random() * 0.5 + 0.3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParallaxBackground;
