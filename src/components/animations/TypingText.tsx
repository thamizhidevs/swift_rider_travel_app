
import { useState, useEffect } from "react";

interface TypingTextProps {
  textArray: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  className?: string;
}

const TypingText = ({
  textArray,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 1500,
  className = "",
}: TypingTextProps) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [arrayIndex, setArrayIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timeout: number;
    
    if (isTyping) {
      // Typing animation
      if (charIndex < textArray[arrayIndex].length) {
        timeout = window.setTimeout(() => {
          setText(prev => prev + textArray[arrayIndex][charIndex]);
          setCharIndex(prev => prev + 1);
        }, typingSpeed);
      } else {
        // Typing complete, wait before deleting
        timeout = window.setTimeout(() => {
          setIsTyping(false);
        }, delayBetween);
      }
    } else {
      // Deleting animation
      if (charIndex > 0) {
        timeout = window.setTimeout(() => {
          setText(prev => prev.slice(0, -1));
          setCharIndex(prev => prev - 1);
        }, deletingSpeed);
      } else {
        // Deleting complete, move to next text
        setIsTyping(true);
        setArrayIndex(prev => (prev + 1) % textArray.length);
      }
    }
    
    return () => {
      clearTimeout(timeout);
    };
  }, [textArray, arrayIndex, charIndex, isTyping, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <div className={className}>
      <span className="mr-1">{text}</span>
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default TypingText;
