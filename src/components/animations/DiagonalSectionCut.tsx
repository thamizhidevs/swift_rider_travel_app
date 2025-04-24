
import React from "react";

interface DiagonalSectionCutProps {
  children: React.ReactNode;
  topColor?: string;
  bottomColor?: string;
  angle?: number;
  className?: string;
  id?: string; // Added id prop
}

const DiagonalSectionCut = ({
  children,
  topColor = "white",
  bottomColor = "#E5DEFF",
  angle = 3,
  className = "",
  id // Added id prop
}: DiagonalSectionCutProps) => {
  return (
    <div className={`relative ${className}`} id={id}>
      {/* Top diagonal cutout */}
      <div 
        className="absolute top-0 left-0 right-0 z-0"
        style={{
          height: `${angle}vw`,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)",
          background: topColor
        }}
      />
      
      {/* Content with background */}
      <div 
        className="relative z-10 py-16"
        style={{ background: bottomColor }}
      >
        <div className="container mx-auto px-6">
          {children}
        </div>
      </div>
      
      {/* Bottom diagonal cutout */}
      <div
        className="absolute bottom-0 left-0 right-0 z-0"
        style={{
          height: `${angle}vw`,
          clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)",
          background: topColor
        }}
      />
    </div>
  );
};

export default DiagonalSectionCut;
