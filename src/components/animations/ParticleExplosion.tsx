
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}

interface ParticleExplosionProps {
  children: React.ReactNode;
}

const ParticleExplosion = ({ children }: ParticleExplosionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  
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
    
    // Create particles
    const particleCount = 80;
    const particles: Particle[] = [];
    const colors = ["#E5DEFF", "#D6BCFA", "#7E69AB", "#9b87f5"];
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      const size = Math.random() * 6 + 2;
      const life = Math.random() * 60 + 20;
      
      particles.push({
        x: centerX,
        y: centerY,
        size,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1,
        life: life,
        maxLife: life
      });
    }
    
    particlesRef.current = particles;
    
    // Animation loop
    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Update life
        particle.life -= 1;
        particle.opacity = particle.life / particle.maxLife;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Remove dead particles
        if (particle.life <= 0) {
          particlesRef.current.splice(index, 1);
        }
      });
      
      // Continue animation if there are still particles
      if (particlesRef.current.length > 0) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    // Start animation
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
};

export default ParticleExplosion;
