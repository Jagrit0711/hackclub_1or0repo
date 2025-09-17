import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code, Binary, Sparkles, Terminal, CircleArrowRight } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import TypingAnimation from '@/components/TypingAnimation';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import AnimatedSkillTags from '@/components/AnimatedSkillTags';
import CodeSnippet from '@/components/CodeSnippet';
const Index: React.FC = () => {
  const [showTerminal, setShowTerminal] = useState(false);
  const typingRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Show terminal after a short delay
    const timer = setTimeout(() => {
      setShowTerminal(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Terminal commands
  const terminalCommands = {
    'help': 'Available commands: help, about, join, events, team, clear',
    'about': 'We are 1or0, the official Hack Club of BBPS Rohini. We\'re all about making tech fun and accessible to everyone!',
    'join': 'Ready to join? Head to https://forms.fillout.com/t/9kUyb3Y9ngus to apply!',
    'events': 'Our events are coming soon! Check back later for details.',
    'team': 'Run by students, for students. Check out our team at /team'
  };

  // Auto-run commands
  const autoCommands = ['help', 'about'];

  // Example code snippet
  const codeSnippet = `function hackClub() {
  const skills = ["coding", "creativity", "collaboration"];
  const projects = [];
  
  while (true) {
    const idea = generateIdea();
    const project = buildProject(idea, skills);
    projects.push(project);
    shareWithCommunity(project);
  }
}`;

  // Skills for the animated tags
  const skills = [{
    name: "JavaScript",
    color: "border-yellow-400/30 bg-yellow-900/20 text-yellow-400"
  }, {
    name: "Python",
    color: "border-blue-400/30 bg-blue-900/20 text-blue-400"
  }, {
    name: "React",
    color: "border-cyan-400/30 bg-cyan-900/20 text-cyan-400"
  }, {
    name: "HTML/CSS",
    color: "border-orange-400/30 bg-orange-900/20 text-orange-400"
  }, {
    name: "Node.js",
    color: "border-green-400/30 bg-green-900/20 text-green-400"
  }, {
    name: "Git",
    color: "border-red-400/30 bg-red-900/20 text-red-400"
  }, {
    name: "AI/ML",
    color: "border-purple-400/30 bg-purple-900/20 text-purple-400"
  }, {
    name: "Game Dev",
    color: "border-pink-400/30 bg-pink-900/20 text-pink-400"
  }];
  return <>
      <AnimatedBackground enhanced interactive />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="container-custom z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="mb-8">
              <img alt="1or0 Logo" className="w-40 h-40 object-contain animate-float" src="/lovable-uploads/dc1f3dd1-8462-4bf9-af7b-f0a3eba2a147.png" />
            </div>
            
            <div className="inline-block mb-6">
              <div className="border border-hack-neon/30 bg-hack-dark-lighter rounded-lg px-4 py-2 text-hack-neon text-sm font-mono">
                &gt; <TypingAnimation text="Welcome to the future of tech" typingSpeed={50} loop={false} />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              From 1s and 0s, <span className="text-hack-neon" ref={typingRef}>
                <TypingAnimation text={["we build the future.", "we create innovation.", "we code together."]} typingSpeed={40} eraseDelay={3000} startDelay={1000} />
              </span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-6 animate-fade-in">
              Official <a href="https://hackclub.com" target="_blank" rel="noopener noreferrer" className="text-hack-neon hover:underline">Hack Club</a> of BBPSRH. Student-led. Project-driven. Built to break limits.
            </p>

            <p className="text-base text-gray-400 mb-10 max-w-2xl animate-fade-in">
              Join a global community of teen coders who create, build, and explore technology together. At 1or0, we're bringing the 
              <a href="https://hackclub.com/philosophy/" target="_blank" rel="noopener noreferrer" className="text-hack-blue hover:underline mx-1">
                Hack Club philosophy
              </a>
              to our school—where coding is fun, collaborative, and creative.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a href="https://forms.fillout.com/t/9kUyb3Y9ngus" target="_blank" rel="noopener noreferrer" className="button-primary relative overflow-hidden group animate-fade-in">
                <span className="relative z-10">Join Us</span>
                <span className="absolute inset-0 bg-hack-neon/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
              </a>
              <Link to="/events" className="button-secondary relative overflow-hidden group animate-fade-in">
                <span className="relative z-10">See Events</span>
                <span className="absolute inset-0 bg-hack-blue/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 w-full">
              {[{
              icon: <Code className="h-6 w-6 text-hack-neon" />,
              title: "Code Together",
              description: "Build projects with peers, not grades"
            }, {
              icon: <Binary className="h-6 w-6 text-hack-blue" />,
              title: "Real Tech Skills",
              description: "Learn the tools pros actually use"
            }, {
              icon: <Sparkles className="h-6 w-6 text-hack-neon" />,
              title: "Global Community",
              description: "Connect with 20,000+ teen hackers"
            }].map((item, index) => <div key={index} className="glass-card p-6 flex flex-col items-center hover:transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-hack-neon/10 animate-fade-in" style={{
              animationDelay: `${index * 200}ms`
            }}>
                  <div className="mb-4 bg-hack-dark-lighter p-3 rounded-full animate-pulse-glow">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-300 text-center">{item.description}</p>
                </div>)}
            </div>
            
            {/* Interactive Terminal */}
            {showTerminal && <div className="mt-16 w-full max-w-2xl mx-auto transform transition-all duration-700 opacity-100 animate-fade-in">
                <InteractiveTerminal className="h-64 shadow-xl shadow-hack-neon/10" commands={terminalCommands} autoRunCommands={autoCommands} prompt="1or0@hackclub:~$" autofocus={false} />
              </div>}
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <a href="#about-section" className="text-white/60 hover:text-white flex flex-col items-center transition-colors animate-bounce">
            <span className="mb-2">Scroll Down</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="section-padding">
        <div className="container-custom">
          <div className="mb-12">
            <div className="inline-block mb-4">
              <div className="border border-hack-blue/30 bg-hack-dark-lighter rounded-lg px-3 py-1 text-hack-blue text-sm font-mono">
                &gt; <TypingAnimation text="Who We Are" typingSpeed={60} loop={false} />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-2 animate-fade-in">About 1or0</h2>
            <p className="text-gray-300 animate-fade-in">Student-led coding club where innovation meets community</p>
          </div>
          
          <div className="glass-card p-8 transition-all duration-500 hover:shadow-lg hover:shadow-hack-neon/10">
            <p className="text-lg text-gray-300 mb-6 animate-fade-in">
              1or0 is the official <a href="https://hackclub.com" target="_blank" rel="noopener noreferrer" className="text-hack-blue hover:underline">Hack Club</a> of BBPS Rohini — a student-led coding and innovation club 
              affiliated with <a href="https://hackclub.com/hq/" target="_blank" rel="noopener noreferrer" className="text-hack-neon hover:underline">Hack Club HQ</a>. We're all about hands-on learning, building cool stuff, 
              and having fun with technology.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[{
              title: "Learn",
              description: "Workshops, tutorials, and peer learning sessions",
              icon: "🧠"
            }, {
              title: "Build",
              description: "Create real projects that solve real problems",
              icon: "🛠️"
            }, {
              title: "Share",
              description: "Showcase your work and inspire others",
              icon: "🚀"
            }].map((item, index) => <div key={index} className="text-center glass p-6 rounded-lg hover:border-hack-neon hover:border transition-colors transform hover:-translate-y-1 hover:shadow-lg hover:shadow-hack-neon/10 duration-300 animate-fade-in" style={{
              animationDelay: `${index * 200}ms`
            }}>
                <div className="text-4xl mb-4 animate-float">{item.icon}</div>
                <h3 className="text-xl font-medium mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>)}
            </div>
            
            {/* Code Snippet */}
            <div className="mt-10 max-w-xl mx-auto">
              <CodeSnippet code={codeSnippet} title="The Hack Club Philosophy" animateTyping className="shadow-lg shadow-hack-neon/5" />
            </div>

            <div className="mt-10 glass-card p-6 border-l-4 border-hack-neon transform transition hover:scale-[1.02] duration-300 animate-fade-in">
              <h3 className="text-xl font-medium mb-2 text-white">Why join a Hack Club?</h3>
              <ul className="space-y-3 mt-4 text-gray-300">
                <li className="flex items-start">
                  <CircleArrowRight className="h-5 w-5 text-hack-neon mr-2 mt-1 flex-shrink-0" />
                  <span>Access to <a href="https://hackclub.com/bank/" target="_blank" rel="noopener noreferrer" className="text-hack-blue hover:underline">Hack Club Bank</a> for funding your projects</span>
                </li>
                <li className="flex items-start">
                  <CircleArrowRight className="h-5 w-5 text-hack-neon mr-2 mt-1 flex-shrink-0" />
                  <span>Join <a href="https://hackclub.com/slack/" target="_blank" rel="noopener noreferrer" className="text-hack-blue hover:underline">Hack Club Slack</a> - the largest teen coding community</span>
                </li>
                <li className="flex items-start">
                  <CircleArrowRight className="h-5 w-5 text-hack-neon mr-2 mt-1 flex-shrink-0" />
                  <span>Attend exclusive <a href="https://hackclub.com/events/" target="_blank" rel="noopener noreferrer" className="text-hack-blue hover:underline">hackathons and events</a></span>
                </li>
                <li className="flex items-start">
                  <CircleArrowRight className="h-5 w-5 text-hack-neon mr-2 mt-1 flex-shrink-0" />
                  <span>Learn from other teen coders, not just tutorials</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/about" className="button-secondary inline-flex items-center gap-2 group animate-fade-in">
                <span>Learn More</span>
                <CircleArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          {/* Skills Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-center animate-fade-in">Skills You'll Develop</h3>
            <AnimatedSkillTags skills={skills} />
          </div>
        </div>
      </section>
      
      {/* Join Us Section */}
      <section id="join-us" className="section-padding bg-gradient-to-t from-transparent to-hack-dark-lighter/30">
        <div className="container-custom">
          <div className="glass max-w-4xl mx-auto p-8 md:p-12 text-center border border-hack-neon/20 shadow-lg shadow-hack-neon/5 hover:shadow-hack-neon/10 hover:border-hack-neon/30 transition-all duration-500 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Join 1or0 Hack Club</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to start your coding journey? Become part of our community of makers, 
              builders, and innovators. No experience necessary - just bring your curiosity!
            </p>
            
            <div className="terminal-container inline-block text-left mb-8 rounded-none py-0 px-0 my-0 mx-0">
              <InteractiveTerminal prompt=">" initialOutput={[{
              content: "join 1or0 --mode=student --skill=any",
              isCommand: true
            }]} noBehaviors={true} className="bg-transparent border-none shadow-none" />
            </div>
            
            <a href="https://forms.fillout.com/t/9kUyb3Y9ngus" target="_blank" rel="noopener noreferrer" className="button-primary inline-block transform transition-transform hover:scale-105 duration-300 animate-pulse-glow">
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </>;
};
export default Index;