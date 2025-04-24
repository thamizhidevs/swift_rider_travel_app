
import { useEffect, useRef } from "react";

interface FloatingElementsProps {
  children: React.ReactNode;
  count?: number;
  depth?: boolean;
}

const FloatingElements = ({ children, count = 10, depth = true }: FloatingElementsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create floating elements
    const elements = Array.from({ length: count }).map((_, i) => {
      const element = document.createElement("div");
      const size = Math.random() * 50 + 20;
      const opacity = Math.random() * 0.2 + 0.1;
      const zIndex = depth ? (Math.random() > 0.5 ? 5 : -5) : 0;
      
      // Set styles
      element.className = "absolute rounded-full";
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.backgroundColor = `rgba(215, 180, 250, ${opacity})`;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      element.style.zIndex = `${zIndex}`;
      element.style.filter = "blur(8px)";
      element.style.transform = `scale(${Math.random() * 0.3 + 0.7})`;
      
      // Add animation
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      
      return element;
    });
    
    // Append elements to container
    elements.forEach(element => {
      container.appendChild(element);
    });
    
    // Cleanup
    return () => {
      elements.forEach(element => {
        if (container.contains(element)) {
          container.removeChild(element);
        }
      });
    };
  }, [count, depth]);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Floating elements container */}
      <div
        ref={containerRef}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Content */}
      <div className="relative z-0">{children}</div>
    </div>
  );
};

export default FloatingElements;
