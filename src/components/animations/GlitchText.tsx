
import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  duration?: number; // Duration in ms
}

const GlitchText = ({ text, className = "", duration = 2000 }: GlitchTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isGlitching, setIsGlitching] = useState(true);
  
  useEffect(() => {
    let timeout: number;
    let interval: number;
    let glitchCount = 0;
    const maxGlitches = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    
    if (isGlitching) {
      interval = window.setInterval(() => {
        glitchCount++;
        
        let result = '';
        for (let i = 0; i < text.length; i++) {
          // Progressively reveal more correct characters
          const progress = glitchCount / maxGlitches;
          const shouldReveal = Math.random() < progress;
          
          if (shouldReveal || glitchCount === maxGlitches) {
            result += text[i];
          } else {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
          }
        }
        
        setDisplayText(result);
        
        if (glitchCount >= maxGlitches) {
          clearInterval(interval);
          setDisplayText(text);
          setIsGlitching(false);
        }
      }, duration / maxGlitches);
    }
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, isGlitching, duration]);
  
  return <span className={`inline-block ${className}`}>{displayText}</span>;
};

export default GlitchText;
