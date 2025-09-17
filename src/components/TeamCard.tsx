
import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface TeamCardProps {
  name: string;
  role: string;
  tagline: string;
  image?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const TeamCard: React.FC<TeamCardProps> = ({ name, role, tagline, image, socials }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "glass-card overflow-hidden flex flex-col items-center text-center transform transition-all duration-500",
        isHovered ? "shadow-lg shadow-hack-neon/20 -translate-y-3 scale-105" : "hover:-translate-y-2 hover:shadow-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 w-48 mx-auto mt-6 mb-4 relative">
        <Avatar className="h-full w-full border-2 transition-all duration-300 border-hack-neon/30">
          {image ? (
            <AvatarImage src={image} alt={name} className="object-cover" />
          ) : (
            <AvatarFallback className={cn(
              "bg-hack-dark-lighter text-hack-neon text-7xl flex items-center justify-center transition-colors duration-300",
              isHovered && "bg-hack-dark-lighter/80 text-hack-neon"
            )}>
              <User className="h-24 w-24" />
            </AvatarFallback>
          )}
        </Avatar>
        
        {/* Glow effect when hovered */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full bg-hack-neon/10 blur-md animate-pulse-glow"></div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className={cn(
          "text-white text-xl font-medium mb-1 transition-all duration-300",
          isHovered && "text-hack-neon"
        )}>
          {name}
        </h3>
        <p className="text-hack-neon font-mono text-sm mb-2">{role}</p>
        <p className="text-gray-300 italic mb-4">"{tagline}"</p>
        
        {socials && Object.keys(socials).length > 0 && (
          <div className="flex justify-center space-x-4 mt-4">
            {socials.github && (
              <a 
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-hack-neon transition-colors relative group"
              >
                GitHub
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-hack-neon scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            )}
            {socials.linkedin && (
              <a 
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-hack-blue transition-colors relative group"
              >
                LinkedIn
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-hack-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            )}
            {socials.twitter && (
              <a 
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors relative group"
              >
                Twitter
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
