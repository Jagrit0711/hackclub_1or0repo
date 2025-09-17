
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SkillTag {
  name: string;
  color?: string;
  icon?: React.ReactNode;
}

interface AnimatedSkillTagsProps {
  skills: SkillTag[];
  className?: string;
}

const AnimatedSkillTags: React.FC<AnimatedSkillTagsProps> = ({ 
  skills,
  className
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [positions, setPositions] = useState<{ x: number, y: number, rotation: number, scale: number }[]>([]);
  
  // Initialize random positions
  useEffect(() => {
    const newPositions = skills.map(() => ({
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
      rotation: Math.random() * 20 - 10,
      scale: 0.8 + Math.random() * 0.4
    }));
    setPositions(newPositions);
  }, [skills.length]);
  
  // Update positions periodically for floating effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prev => 
        prev.map((pos, i) => 
          hoveredIndex === i ? pos : {
            ...pos,
            x: pos.x + (Math.random() * 1 - 0.5),
            y: pos.y + (Math.random() * 1 - 0.5),
            rotation: pos.rotation + (Math.random() * 1 - 0.5),
          }
        )
      );
    }, 1500);
    
    return () => clearInterval(interval);
  }, [hoveredIndex]);
  
  return (
    <div className={cn("relative h-[300px] w-full overflow-hidden", className)}>
      {skills.map((skill, index) => {
        const isHovered = hoveredIndex === index;
        const pos = positions[index] || { x: 0, y: 0, rotation: 0, scale: 1 };
        
        return (
          <div
            key={skill.name}
            className={cn(
              "absolute px-4 py-2 rounded-lg transition-all duration-500 ease-out cursor-pointer",
              "border shadow-lg backdrop-blur-sm",
              isHovered ? "z-10 scale-110" : "",
              skill.color || "border-hack-neon/30 bg-hack-dark-lighter/70 text-hack-neon"
            )}
            style={{
              transform: `translate(-50%, -50%) translate(${50 + pos.x}%, ${50 + pos.y}%) rotate(${isHovered ? 0 : pos.rotation}deg) scale(${isHovered ? 1.1 : pos.scale})`,
              left: `${(index % 3) * 30 + 25}%`,
              top: `${Math.floor(index / 3) * 30 + 25}%`,
              transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center space-x-2">
              {skill.icon && <span>{skill.icon}</span>}
              <span className="font-mono">{skill.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedSkillTags;
