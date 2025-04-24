
import { useEffect, useRef } from "react";

interface NoiseOverlayProps {
  children: React.ReactNode;
  opacity?: number;
  blendMode?: string;
}

const NoiseOverlay = ({ children, opacity = 0.05, blendMode = "soft-light" }: NoiseOverlayProps) => {
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
    
    // Create noise
    const createNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.floor(Math.random() * 255);
        data[i] = value;     // red
        data[i + 1] = value; // green
        data[i + 2] = value; // blue
        data[i + 3] = 255;   // alpha
      }
      
      ctx.putImageData(imageData, 0, 0);
    };
    
    createNoise();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Content */}
      <div className="relative z-0">{children}</div>
      
      {/* Noise overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity, mixBlendMode: blendMode as any }}
      />
    </div>
  );
};

export default NoiseOverlay;
