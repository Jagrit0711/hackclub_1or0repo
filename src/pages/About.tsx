
import React, { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Link } from 'react-router-dom';
import { Terminal, Zap, Code } from 'lucide-react';
import TypingAnimation from '@/components/TypingAnimation';
import InteractiveTerminal from '@/components/InteractiveTerminal';

const About: React.FC = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  
  // Terminal commands for the about page
  const terminalCommands = {
    'help': 'Available commands: help, about, philosophy, details, contact, clear',
    'about': 'We are 1or0, the official Hack Club of BBPS Rohini - a student-led coding community.',
    'philosophy': 'We believe in learning by building, peer-to-peer education, and having fun while coding.',
    'details': () => {
      setShowDetails(true);
      return 'Displaying more details about Hack Club... (see below)';
    },
    'contact': 'Reach out to us through our application form or connect with us at school!',
    'clear': 'Clearing terminal...'
  };

  return (
    <>
      <AnimatedBackground className="opacity-30" />
      
      <div className="pt-24 pb-16">
        <div className="container-custom">
          {/* About Hero */}
          <div className="max-w-4xl mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <div className="border border-hack-neon/30 bg-hack-dark-lighter rounded-lg px-3 py-1 text-hack-neon text-sm font-mono">
                &gt; <TypingAnimation text="About Us" typingSpeed={60} loop={false} />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-6">What even is 1or0?</h1>
            
            <div className="space-y-6 text-gray-300">
              <p className="text-xl leading-relaxed">
                1or0 is the official <a href="https://hackclub.com" target="_blank" rel="noopener noreferrer" className="text-hack-neon hover:underline">Hack Club</a> of BBPS Rohini — a student-led coding and innovation club affiliated with <a href="https://hackclub.com/hq/" target="_blank" rel="noopener noreferrer" className="text-hack-neon hover:underline">Hack Club HQ</a>.
              </p>
              <p className="text-lg leading-relaxed">
                We're all about hands-on learning, building cool stuff, and having fun with technology. It's not about marks, pressure, or perfection — it's about showing up, exploring, and leveling up together.
              </p>
              <p className="text-lg leading-relaxed">
                As part of the <a href="https://hackclub.com/network/" target="_blank" rel="noopener noreferrer" className="text-hack-blue hover:underline">global Hack Club network</a> (spanning 2,000+ schools worldwide), we get access to open-source tools, project grants, event resources, and a massive global student hacker community.
              </p>
              <p className="text-lg leading-relaxed">
                Whether you're a total beginner or already deep into Python, Arduino, or Figma — you're welcome here.
              </p>
            </div>
          </div>
          
          {/* Interactive Terminal for About */}
          <div className="mb-16 glass-card p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-white">Explore 1or0 Hack Club</h2>
            <p className="text-gray-300 mb-6">Try some commands to learn more about us:</p>
            
            <div className="mt-4">
              <InteractiveTerminal
                className="h-48 shadow-xl shadow-hack-neon/10"
                commands={terminalCommands}
                autoRunCommands={['help']}
                prompt="about@1or0:~$"
              />
            </div>
          </div>

          {/* What is Hack Club Section */}
          <section className="glass-card p-8 mb-16 overflow-hidden animate-fade-in">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
                  <Code className="mr-2 h-6 w-6 text-hack-neon" /> 
                  The Hack Club Movement
                </h2>
                <p className="text-gray-300 mb-4">
                  <a href="https://hackclub.com" target="_blank" rel="noopener noreferrer" className="text-hack-neon font-semibold hover:underline">Hack Club</a> is a nonprofit network of coding clubs and teen hackers from around the world. Founded in 2014 by Zach Latta when he was 16, Hack Club has grown into a global movement.
                </p>
                <p className="text-gray-300 mb-4">
                  Unlike school CS classes, Hack Clubs focus on building projects and learning by doing—whether it's websites, games, apps, or hardware hacks.
                </p>
                <p className="text-gray-300 mb-4">
                  Through <a href="https://hackclub.com/slack/" target="_blank" rel="noopener noreferrer" className="text-hack-blue hover:underline">Hack Club Slack</a>, teenagers collaborate, share their creations, and find inspiration from peers across 30+ countries.
                </p>
              </div>
              <div className="md:w-1/2 terminal-container p-6">
                <div className="mb-2 font-mono text-gray-400">$ cat hackclub_manifesto.txt</div>
                <div className="text-hack-neon font-medium mb-1">WE BELIEVE:</div>
                <ul className="space-y-2 text-gray-300 font-mono">
                  {[
                    "That computing is the most powerful medium of our time",
                    "Young people should be builders, not just consumers",
                    "In a world where anyone can create anything",
                    "In the power of peer-to-peer learning and community",
                    "That coding is a superpower 💫"
                  ].map((belief, index) => (
                    <li key={index} className="flex items-start animate-fade-in" style={{animationDelay: `${index * 200}ms`}}>
                      <span className="text-hack-neon mr-2">{">"}</span> {belief}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <a href="https://hackclub.com/philosophy/" target="_blank" rel="noopener noreferrer" className="text-hack-blue hover:underline font-mono">Read the full philosophy →</a>
                </div>
              </div>
            </div>
          </section>
          
          {/* What We Do Section */}
          <section className={`glass-card p-8 mb-16 overflow-hidden relative transition-all duration-500 ${showDetails ? 'shadow-lg shadow-hack-neon/20 border-hack-neon/30' : ''}`}>
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
              <Zap className="mr-2 h-6 w-6 text-hack-blue" />
              Think:
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[
                {
                  title: "Building real-world projects",
                  icon: "🚀",
                  description: "From web apps to AI projects, we create things that matter",
                  details: "Learn modern frameworks like React, experiment with AI APIs, and build projects that solve real problems or just make people smile."
                },
                {
                  title: "Playing with hardware and AI",
                  icon: "🤖",
                  description: "Get hands-on with Arduinos, Raspberry Pis, and cutting-edge tech",
                  details: "Program microcontrollers, build robots, create IoT devices, and explore how hardware and software come together."
                },
                {
                  title: "Hosting hackathons and events",
                  icon: "💡",
                  description: "Build awesome projects in teams during our fun hackathons",
                  details: "Brainstorm ideas, form teams, and build functional prototypes in just 24-48 hours. Great for both beginners and experienced coders."
                },
                {
                  title: "Learning from peers",
                  icon: "💬",
                  description: "Share knowledge, solve problems, and grow together",
                  details: "Give and attend workshops on topics you're passionate about. Learn by teaching others and getting feedback on your projects."
                }
              ].map((item, index) => (
                <div key={index} className={`glass-card p-6 border border-white/5 hover:border-hack-neon/30 transition-all duration-300 animate-fade-in ${showDetails ? 'transform hover:-translate-y-2 hover:shadow-hack-neon/20' : ''}`} style={{animationDelay: `${index * 150}ms`}}>
                  <div className="text-4xl mb-4 animate-float">{item.icon}</div>
                  <h3 className="text-xl font-medium mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                  {showDetails && (
                    <p className="text-gray-400 mt-4 border-t border-hack-neon/10 pt-3 text-sm">{item.details}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-radial from-hack-blue/5 to-transparent rounded-lg border border-hack-blue/10 animate-fade-in">
              <h3 className="text-xl font-bold mb-4 text-white">What makes Hack Clubs unique?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                {[
                  {
                    number: "01",
                    title: "Student-led",
                    description: "Run by students, for students"
                  },
                  {
                    number: "02",
                    title: "Project-based",
                    description: "Learn through building"
                  },
                  {
                    number: "03",
                    title: "Community-driven",
                    description: "Connected globally"
                  },
                  {
                    number: "04",
                    title: "Inclusive",
                    description: "All skill levels welcome"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
                    <span className="text-hack-neon font-mono mr-2">{item.number}.</span>
                    <p><span className="text-white font-medium">{item.title}</span> — {item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Bottom Line Section */}
          <section className="text-center glass p-8 rounded-lg mb-16 border border-white/10 hover:border-hack-neon/30 transition-all animate-fade-in">
            <Terminal className="h-10 w-10 text-hack-neon mx-auto mb-4 animate-pulse-glow" />
            <h2 className="text-2xl font-bold mb-4 text-white">Bottom Line:</h2>
            <p className="text-xl text-gray-300 mb-4">
              If you've ever felt like the classroom wasn't enough…
            </p>
            <p className="text-2xl text-hack-neon font-bold mb-4 animate-pulse">
              <TypingAnimation text="You belong here." typingSpeed={80} loop={false} />
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join a movement of 20,000+ students worldwide who are learning to code, building amazing projects, and redefining what's possible for teenagers in tech.
            </p>
          </section>
          
          {/* Join Section */}
          <section className="text-center bg-gradient-radial from-hack-neon/5 to-transparent p-10 rounded-lg border border-hack-neon/20 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-white">Ready to Join?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We welcome all BBPSRH students interested in technology, coding, and making cool things.
              No experience required — just bring your curiosity!
            </p>
            
            <div className="glass-card p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-medium mb-2 text-white">What you'll get:</h3>
              <ul className="text-left space-y-2 text-gray-300">
                {[
                  "Access to workshops, hackathons, and events",
                  "Join the global Hack Club Slack community",
                  "Opportunity to collaborate on real projects",
                  "A supportive community that celebrates learning"
                ].map((item, index) => (
                  <li key={index} className="flex items-center animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
                    <span className="text-hack-neon mr-2">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://forms.fillout.com/t/9kUyb3Y9ngus" target="_blank" rel="noopener noreferrer" className="button-primary animate-pulse-glow">
                Apply to Join
              </a>
              <Link to="/team" className="button-secondary hover:transform hover:scale-105 transition-all duration-300">
                Meet the Team
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
