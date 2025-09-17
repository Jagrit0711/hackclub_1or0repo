
import React from 'react';
import { cn } from '@/lib/utils';

interface EventCardProps {
  title: string;
  date: string;
  image: string;
  tagline: string;
  link: string;
  isPast?: boolean;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({ 
  title, 
  date, 
  image, 
  tagline, 
  link,
  isPast = false,
  className
}) => {
  return (
    <div 
      className={cn(
        "glass-card overflow-hidden flex flex-col h-full group",
        isPast ? "opacity-80" : "",
        className
      )}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {!isPast && (
          <div className="absolute top-3 right-3 bg-hack-neon/90 text-hack-dark px-3 py-1 text-xs rounded-full font-bold">
            Upcoming
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-gray-400 text-sm mb-1">{date}</span>
        <h3 className="text-white text-xl font-medium mb-2 group-hover:text-hack-neon transition-colors">
          {title}
        </h3>
        <p className="text-gray-300 text-sm flex-grow">
          {tagline}
        </p>
        
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`
            mt-4 self-start px-4 py-1.5 rounded text-sm font-medium
            ${isPast 
              ? "border border-gray-500 text-gray-300 hover:bg-gray-700/30" 
              : "button-primary"}
          `}
        >
          {isPast ? 'View Details' : 'Register'}
        </a>
      </div>
    </div>
  );
};

export default EventCard;
