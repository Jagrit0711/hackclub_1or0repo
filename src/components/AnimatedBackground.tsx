
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
  interactive?: boolean;
  enhanced?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  className, 
  density = 'medium',
  speed = 'medium',
  interactive = false,
  enhanced = false
}) => {
  const [binaryElements, setBinaryElements] = useState<React.ReactNode[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const getDensityCount = () => {
    const baseCount = Math.floor(window.innerWidth / 20);
    switch (density) {
      case 'low': return baseCount * 0.5;
      case 'high': return baseCount * 2;
      default: return baseCount;
    }
  };
  
  const getAnimationDuration = () => {
    switch (speed) {
      case 'slow': return { min: 8, max: 15 };
      case 'fast': return { min: 3, max: 8 };
      default: return { min: 5, max: 12 };
    }
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!interactive || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [interactive]);
  
  useEffect(() => {
    const generateBinaryElements = () => {
      const newElements = [];
      const count = getDensityCount();
      const { min, max } = getAnimationDuration();
      
      // Characters pool
      const basicChars = ['0', '1'];
      const enhancedChars = ['0', '1', '>', '<', '{', '}', '/', '_', '[', ']', '|', ':', ';', '$', '#', '@'];
      const chars = enhanced ? enhancedChars : basicChars;
      
      for (let i = 0; i < count; i++) {
        const left = `${Math.random() * 100}%`;
        const animationDuration = `${min + Math.random() * (max - min)}s`;
        const animationDelay = `${Math.random() * 5}s`;
        const opacity = Math.random() * 0.5 + 0.1;
        const fontSize = Math.random() > 0.7 ? 'text-lg' : 'text-sm';
        
        // Select a random character
        const value = chars[Math.floor(Math.random() * chars.length)];
        
        // Special styling for enhanced mode
        const color = enhanced && Math.random() > 0.8 
          ? Math.random() > 0.5 ? 'text-hack-blue' : 'text-hack-neon' 
          : 'text-hack-neon/20';
        
        newElements.push(
          <div
            key={i}
            className={`absolute font-mono animate-binary-rain pointer-events-none ${fontSize} ${color}`}
            style={{
              left,
              animationDuration,
              animationDelay,
              opacity,
              top: '-20px',
              transform: interactive ? 'scale(1)' : undefined,
              transition: interactive ? 'transform 0.3s ease' : undefined
            }}
          >
            {value}
          </div>
        );
      }
      
      setBinaryElements(newElements);
    };

    generateBinaryElements();
    
    const handleResize = () => {
      generateBinaryElements();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [density, speed, enhanced]);

  return (
    <div 
      ref={containerRef}
      className={cn("fixed inset-0 overflow-hidden z-[-1]", className)}
    >
      {binaryElements}
      
      {enhanced && (
        <>
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-hack-dark opacity-70"></div>
          
          {interactive && (
            <div 
              className="pointer-events-none absolute bg-hack-neon/5 rounded-full blur-[100px] w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                transition: 'left 0.3s ease-out, top 0.3s ease-out'
              }}
            ></div>
          )}
        </>
      )}
    </div>
  );
};

export default AnimatedBackground;
