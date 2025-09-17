import React, { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import TypingAnimation from '@/components/TypingAnimation';
const Events: React.FC = () => {
  const [showFutureEvents, setShowFutureEvents] = useState<boolean>(false);

  // Terminal commands for the events page
  const terminalCommands = {
    'help': 'Available commands: help, list, upcoming, hackathon, workshops, clear',
    'list': 'Use "upcoming" to see our future events, or "workshops" for workshop details.',
    'upcoming': () => {
      setShowFutureEvents(true);
      return 'Loading future events data... (see below)';
    },
    'hackathon': 'Our first mini-hackathon is coming soon. Watch this space for details!',
    'workshops': 'Workshops will cover web development, game design, AI basics, and hardware hacking.'
  };
  return <>
      <AnimatedBackground className="opacity-30" />
      
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-16 max-w-3xl animate-fade-in">
            <div className="inline-block mb-4">
              <div className="border border-hack-neon/30 bg-hack-dark-lighter rounded-lg px-3 py-1 text-hack-neon text-sm font-mono">
                &gt; <TypingAnimation text="Events" typingSpeed={60} loop={false} />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">What's Cookin'?</h1>
            <p className="text-xl text-gray-300 mb-8">
              We're prepping something awesome.<br />
              Our first events, projects, and workshops are launching very, very soon.
            </p>
          </div>
          
          {/* Interactive Terminal for Events */}
          
          
          {/* Coming Soon Section */}
          <section className={`glass-card p-8 mb-16 overflow-hidden relative transition-all duration-500 ${showFutureEvents ? 'shadow-lg shadow-hack-neon/20 border-hack-neon/30' : ''}`}>
            <h2 className="text-2xl font-bold mb-6 text-white">Stay tuned for:</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[{
              title: "School-wide mini hackathons",
              icon: "🚨",
              description: "Build cool projects in 24 hours with your friends",
              date: "Coming January 2026"
            }, {
              title: "Coding workshops for all levels",
              icon: "💻",
              description: "From HTML basics to advanced AI topics",
              date: "Starting December 2025"
            }, {
              title: "Build sessions with real-world ideas",
              icon: "🧠",
              description: "Work on projects that solve actual problems",
              date: "Monthly meetups"
            }, {
              title: "Live demos, team projects, and more",
              icon: "🔥",
              description: "Share what you've built with the community",
              date: "Every second Friday"
            }].map((item, index) => <div key={index} className={`flex items-start space-x-4 glass p-6 rounded-lg border border-white/10 hover:border-hack-neon/30 transition-all duration-300 animate-fade-in ${showFutureEvents ? 'transform hover:scale-105 hover:shadow-hack-neon/20' : ''}`} style={{
              animationDelay: `${index * 150}ms`
            }}>
                  <div className="text-4xl animate-float">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-medium text-white pt-1">{item.title}</h3>
                    {showFutureEvents && <>
                        <p className="text-gray-300 mt-2">{item.description}</p>
                        <p className="text-hack-neon mt-2 text-sm">{item.date}</p>
                      </>}
                  </div>
                </div>)}
            </div>
          </section>
          
          {/* Calendar Subscription */}
          <section className="mt-20 glass p-8 text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">RSS Feed Coming Soon</h2>
            <p className="text-gray-300 mb-6">
              Our events feed will be right here to keep you updated
            </p>
            
            <div className="terminal-container inline-block text-left px-4 py-2 hover:shadow-lg hover:shadow-hack-neon/10 transition-all duration-300">
              <div className="flex">
                <span className="terminal-prompt mr-2">&gt;</span> 
                <div className="text-gray-300">
                  <span className="text-hack-blue">loading</span> events --status=<span className="text-hack-neon">coming_soon</span>
                  <span className="terminal-cursor ml-1"></span>
                </div>
              </div>
            </div>
            
            {/* Event countdown timer */}
            <div className="mt-12 max-w-xs mx-auto">
              <div className="text-center">
                
                
              </div>
            </div>
          </section>
        </div>
      </div>
    </>;
};
export default Events;