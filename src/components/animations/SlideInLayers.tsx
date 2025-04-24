
import { useEffect, useRef } from "react";

interface SlideInLayersProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'alternating';
}

const SlideInLayers = ({ children, direction = 'alternating' }: SlideInLayersProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Get all direct children
    const childElements = Array.from(container.children) as HTMLElement[];
    
    // Apply initial styles
    childElements.forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transition = "transform 0.8s ease-out, opacity 0.8s ease-out";
      
      let initialX;
      if (direction === 'left') {
        initialX = "-100px";
      } else if (direction === 'right') {
        initialX = "100px";
      } else {
        // Alternating
        initialX = index % 2 === 0 ? "-100px" : "100px";
      }
      
      element.style.transform = `translateX(${initialX})`;
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.opacity = "1";
            element.style.transform = "translateX(0)";
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    // Observe each child
    childElements.forEach((element) => {
      observer.observe(element);
    });
    
    return () => {
      childElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [direction]);
  
  return (
    <div ref={containerRef} className="space-y-6">
      {children}
    </div>
  );
};

export default SlideInLayers;
