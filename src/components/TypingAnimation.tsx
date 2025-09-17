
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  text: string | string[];
  className?: string;
  typingSpeed?: number;
  eraseSpeed?: number;
  eraseDelay?: number;
  startDelay?: number;
  loop?: boolean;
  cursor?: boolean;
  onComplete?: () => void;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  className,
  typingSpeed = 70,
  eraseSpeed = 30,
  eraseDelay = 2000,
  startDelay = 500,
  loop = true,
  cursor = true,
  onComplete
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isDelaying, setIsDelaying] = useState(true);
  const phrases = useRef<string[]>(Array.isArray(text) ? text : [text]);
  
  useEffect(() => {
    // Initialize with delay
    const startTimer = setTimeout(() => {
      setIsDelaying(false);
    }, startDelay);
    
    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (isDelaying) return;
    
    let timer: NodeJS.Timeout;
    
    if (isTyping) {
      const currentPhrase = phrases.current[currentIndex];
      
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        if (!loop && currentIndex === phrases.current.length - 1) {
          setIsComplete(true);
          onComplete?.();
          return;
        }
        
        timer = setTimeout(() => {
          setIsTyping(false);
        }, eraseDelay);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, eraseSpeed);
      } else {
        setIsTyping(true);
        setCurrentIndex((prev) => (prev + 1) % phrases.current.length);
      }
    }
    
    return () => clearTimeout(timer);
  }, [displayText, isTyping, currentIndex, typingSpeed, eraseSpeed, eraseDelay, loop, isDelaying, onComplete]);
  
  return (
    <span className={cn("font-mono", className)}>
      {displayText}
      {cursor && !isComplete && <span className="terminal-cursor">█</span>}
    </span>
  );
};

export default TypingAnimation;
