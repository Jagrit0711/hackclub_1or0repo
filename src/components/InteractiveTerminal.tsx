
import React, { useState, useEffect, useRef } from 'react';
import TypingAnimation from './TypingAnimation';
import { cn } from '@/lib/utils';

interface CommandOutput {
  content: string;
  isCommand?: boolean;
  delay?: number;
  typing?: boolean;
}

interface InteractiveTerminalProps {
  className?: string;
  initialOutput?: CommandOutput[];
  prompt?: string;
  commands?: Record<string, string | (() => string)>;
  onCommand?: (command: string) => void;
  autoRunCommands?: string[];
  typingSpeed?: number;
  autofocus?: boolean;
  noBehaviors?: boolean;
}

const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  className,
  initialOutput = [],
  prompt = ">",
  commands = {},
  onCommand,
  autoRunCommands = [],
  typingSpeed = 50,
  autofocus = true,
  noBehaviors = false
}) => {
  const [history, setHistory] = useState<CommandOutput[]>(initialOutput);
  const [input, setInput] = useState<string>('');
  const [autoCommandIndex, setAutoCommandIndex] = useState<number>(0);
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(autoRunCommands.length > 0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  // Focus input when terminal is clicked
  const handleTerminalClick = () => {
    if (inputRef.current && !noBehaviors) {
      inputRef.current.focus();
    }
  };

  // Process command input
  const processCommand = (cmd: string) => {
    // Add command to history
    setHistory(prev => [...prev, { content: `${prompt} ${cmd}`, isCommand: true }]);
    setCommandHistory(prev => [cmd, ...prev.slice(0, 9)]);
    setHistoryIndex(-1);
    
    // Handle command
    if (cmd.trim() === 'clear') {
      setTimeout(() => setHistory([]), 10);
    } else if (cmd.trim() in commands) {
      const result = commands[cmd.trim()];
      const output = typeof result === 'function' ? result() : result;
      
      setHistory(prev => [...prev, { content: output, typing: true }]);
    } else if (cmd.trim()) {
      setHistory(prev => [...prev, { 
        content: `Command not found: ${cmd}. Try 'help' for available commands.`, 
        typing: true 
      }]);
    }
    
    // External command handler
    onCommand?.(cmd);
    
    // Clear input
    setInput('');
    
    // Scroll to bottom
    setTimeout(scrollToBottom, 10);
  };

  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      processCommand(input);
    }
  };

  // Handle key navigation through command history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion for commands
      const cmdPrefix = input.trim();
      if (cmdPrefix) {
        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(cmdPrefix));
        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          setHistory(prev => [
            ...prev, 
            { content: `${prompt} ${cmdPrefix}`, isCommand: true },
            { content: matches.join('  '), typing: false }
          ]);
          scrollToBottom();
        }
      }
    }
  };

  // Auto-run commands if provided
  useEffect(() => {
    if (isAutoRunning && autoCommandIndex < autoRunCommands.length) {
      const timer = setTimeout(() => {
        processCommand(autoRunCommands[autoCommandIndex]);
        setAutoCommandIndex(prev => prev + 1);
      }, 1000 + Math.random() * 1000);
      
      return () => clearTimeout(timer);
    } else if (autoCommandIndex >= autoRunCommands.length && isAutoRunning) {
      setIsAutoRunning(false);
    }
  }, [isAutoRunning, autoCommandIndex, autoRunCommands]);

  // Scroll to bottom whenever history changes
  useEffect(() => {
    scrollToBottom();
  }, [history]);

  // Initial focus
  useEffect(() => {
    if (autofocus && inputRef.current && !noBehaviors) {
      inputRef.current.focus();
    }
  }, [autofocus, noBehaviors]);

  return (
    <div 
      className={cn("terminal-container flex flex-col overflow-hidden", className)}
      onClick={handleTerminalClick}
      ref={terminalRef}
    >
      <div className="terminal-header flex items-center justify-between px-2 py-1 bg-hack-dark-lighter/80 border-b border-hack-neon/20">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-400">1or0@hackclub:~</div>
      </div>
      
      <div className="terminal-output flex-grow overflow-auto p-4 font-mono text-sm">
        {history.map((item, index) => (
          <div key={index} className={cn("mb-2", item.isCommand ? "text-hack-blue" : "text-gray-300")}>
            {item.typing ? (
              <TypingAnimation 
                text={item.content} 
                typingSpeed={typingSpeed} 
                loop={false} 
                cursor={false}
              />
            ) : (
              item.content
            )}
          </div>
        ))}
      </div>
      
      {!noBehaviors && (
        <form onSubmit={handleSubmit} className="flex px-4 py-2 border-t border-hack-neon/20">
          <span className="terminal-prompt mr-2">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent outline-none text-white font-mono"
            autoFocus={autofocus}
          />
        </form>
      )}
    </div>
  );
};

export default InteractiveTerminal;
