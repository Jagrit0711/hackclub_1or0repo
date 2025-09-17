
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-hack-dark border-t border-white/5 pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/2d816fb7-7203-4b42-bbde-2621cc804a0f.png" 
                alt="1or0 Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              The official Hack Club of BBPSRH. Student-led. Project-driven. Built to break limits.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/Jagrit0711" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-hack-neon">
                GitHub
              </a>
              <span className="text-gray-400">
                Instagram <span className="text-xs">(Coming Soon)</span>
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-hack-neon">&gt; Home</Link>
              <Link to="/events" className="block text-gray-400 hover:text-hack-neon">&gt; Events</Link>
              <Link to="/about" className="block text-gray-400 hover:text-hack-neon">&gt; About</Link>
              <Link to="/team" className="block text-gray-400 hover:text-hack-neon">&gt; Team</Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Get Involved</h3>
            <div className="space-y-2">
              <a href="https://forms.fillout.com/t/9kUyb3Y9ngus" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-hack-neon">&gt; Join Club</a>
              <a href="tel:8851844602" className="block text-gray-400 hover:text-hack-neon">&gt; Contact Us</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="terminal-container mb-4 md:mb-0 px-4 py-2">
              <span className="terminal-prompt">&gt;_</span> <span className="text-gray-300">Powered by 1or0 | BBPSRH © {currentYear}</span>
              <span className="terminal-cursor ml-1"></span>
            </div>
            <p className="text-gray-500 text-sm">
              Made with <span className="text-hack-neon">{"<"}</span>code<span className="text-hack-neon">{"/>"}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
