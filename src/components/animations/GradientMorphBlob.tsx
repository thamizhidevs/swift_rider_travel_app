
import { useEffect, useRef } from "react";

interface GradientMorphBlobProps {
  children: React.ReactNode;
}

const GradientMorphBlob = ({ children }: GradientMorphBlobProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Blob animation parameters
    let time = 0;
    const blobPoints = 7;
    const radius = Math.min(canvas.width, canvas.height) * 0.3;
    const center = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(
        center.x - radius, 
        center.y - radius, 
        center.x + radius, 
        center.y + radius
      );
      gradient.addColorStop(0, `rgba(229, 222, 255, ${0.5 + Math.sin(time * 0.003) * 0.2})`); // Light purple
      gradient.addColorStop(1, `rgba(126, 105, 171, ${0.3 + Math.sin(time * 0.005) * 0.2})`); // Dark purple
      
      // Draw blob
      ctx.beginPath();
      
      for (let i = 0; i <= blobPoints; i++) {
        const angle = (i / blobPoints) * Math.PI * 2;
        const noise = Math.sin(time * 0.003 + i * 0.5) * 0.3 + 0.7;
        const x = center.x + Math.cos(angle) * radius * noise;
        const y = center.y + Math.sin(angle) * radius * noise;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevAngle = ((i - 1) / blobPoints) * Math.PI * 2;
          const prevNoise = Math.sin(time * 0.003 + (i - 1) * 0.5) * 0.3 + 0.7;
          const cpX1 = center.x + Math.cos(prevAngle + 0.2) * radius * prevNoise * 1.1;
          const cpY1 = center.y + Math.sin(prevAngle + 0.2) * radius * prevNoise * 1.1;
          const cpX2 = center.x + Math.cos(angle - 0.2) * radius * noise * 1.1;
          const cpY2 = center.y + Math.sin(angle - 0.2) * radius * noise * 1.1;
          
          ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, x, y);
        }
      }
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      time++;
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10"
        style={{ filter: "blur(60px)" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GradientMorphBlob;
