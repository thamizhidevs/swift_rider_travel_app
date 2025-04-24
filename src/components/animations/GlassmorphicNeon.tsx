
import React from "react";

interface GlassmorphicNeonProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const GlassmorphicNeon = ({ 
  children, 
  className = "", 
  glowColor = "rgba(126, 105, 171, 0.6)" 
}: GlassmorphicNeonProps) => {
  return (
    <div 
      className={`relative rounded-xl overflow-hidden p-6 ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: `0 0 20px ${glowColor}`,
      }}
    >
      {/* Glow effects */}
      <div 
        className="absolute -inset-0.5 rounded-xl opacity-30"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
          filter: "blur(20px)",
          animation: "neonPulse 2s ease-in-out infinite"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassmorphicNeon;
