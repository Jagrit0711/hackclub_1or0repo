import React, { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import TeamCard from '@/components/TeamCard';
import TypingAnimation from '@/components/TypingAnimation';
import InteractiveTerminal from '@/components/InteractiveTerminal';
const Team: React.FC = () => {
  const [showBios, setShowBios] = useState<boolean>(false);

  // Team members data
  const coreTeamMembers = [{
    id: 1,
    name: "Jagrit Sachdev",
    role: "Club Leader",
    tagline: "CEO of tech, commander of chaos.",
    bio: "Loves algorithm challenges and creating animations with code. Started coding at age 12.",
    socials: {
      github: "https://github.com/Jagrit0711",
      linkedin: "https://www.linkedin.com/in/jagritsachdev"
    }
  }, {
    id: 2,
    name: "Advithya",
    role: "Team Member",
    tagline: "Turning coffee into code.",
    bio: "Frontend specialist with a passion for creating beautiful and intuitive UIs. Always has a new project idea.",
    socials: {}
  }, {
    id: 3,
    name: "Himanshi",
    role: "Team Member",
    tagline: "Making tech accessible to everyone.",
    bio: "Focused on teaching coding to beginners. Believes everyone can learn to code with the right approach.",
    socials: {}
  }, {
    id: 4,
    name: "Vansh",
    role: "Team Member",
    tagline: "Debugger extraordinaire.",
    bio: "Backend developer who loves solving complex problems. Can debug anything given enough time.",
    socials: {}
  }, {
    id: 5,
    name: "Krishiv",
    role: "Team Member",
    tagline: "Building the future, one line at a time.",
    bio: "Full-stack developer with interest in AI and machine learning. Always experimenting with new technologies.",
    socials: {}
  }];

  // Terminal commands
  const terminalCommands = {
    'help': 'Available commands: help, team, bios, contact, clear',
    'team': 'Our team consists of students passionate about coding and technology.',
    'bios': () => {
      setShowBios(true);
      return 'Displaying team member bios... (see below)';
    },
    'contact': 'Want to contact the team? Reach out through our application form or social links.',
    'clear': 'Clearing terminal...'
  };
  return <>
      <AnimatedBackground className="opacity-30" />
      
      <div className="pt-24 pb-16">
        <div className="container-custom">
          {/* Team Hero */}
          <div className="max-w-3xl mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <div className="border border-hack-neon/30 bg-hack-dark-lighter rounded-lg px-3 py-1 text-hack-neon text-sm font-mono">
                &gt; <TypingAnimation text="Our Team" typingSpeed={60} loop={false} />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-6">Meet the Crew ⚙️</h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              We're a group of passionate students running the show. Each with our own skills and quirks, 
              united by our love for technology and building cool stuff.
            </p>
          </div>
          
          {/* Interactive Terminal for Team */}
          
          
          {/* Team Members Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreTeamMembers.map((member, index) => <TeamCard key={member.id} name={member.name} role={member.role} tagline={member.tagline} socials={member.socials} className="animate-fade-in hover:transform hover:scale-105 transition-all duration-300" style={{
              animationDelay: `${index * 150}ms`
            }} additionalContent={showBios && <div className="mt-4 pt-4 border-t border-hack-neon/20">
                        <p className="text-gray-300">{member.bio}</p>
                      </div>} />)}
            </div>
          </section>
          
          {/* Join the Team Section */}
          <section className="glass p-8 text-center max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Want to Join the Crew?</h2>
            <p className="text-gray-300 mb-8">
              We're always looking for passionate students to join our team. If you're interested in technology, 
              design, event planning, or just want to be part of something cool, we'd love to meet you!
            </p>
            
            <div className="terminal-container inline-block text-left px-6 py-3 mb-8 hover:shadow-lg hover:shadow-hack-neon/10 transition-all duration-300">
              <div className="flex items-center">
                <span className="terminal-prompt mr-2">&gt;</span> 
                <div className="text-gray-300">
                  <TypingAnimation text="join --team=1or0 --bring=your_passion" typingSpeed={70} loop={false} />
                </div>
              </div>
            </div>
            
            <a href="https://forms.fillout.com/t/9kUyb3Y9ngus" target="_blank" rel="noopener noreferrer" className="button-primary inline-block animate-pulse-glow">
              Apply Now
            </a>
          </section>
        </div>
      </div>
    </>;
};
export default Team;