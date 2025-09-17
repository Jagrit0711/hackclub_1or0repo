
import React, { useState } from 'react';
import { Terminal, Code, Copy, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import TypingAnimation from './TypingAnimation';

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
  animateTyping?: boolean;
  runnable?: boolean;
  onRun?: (code: string) => void;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = 'javascript',
  title,
  className,
  animateTyping = false,
  runnable = false,
  onRun
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const runCode = () => {
    if (!runnable) return;
    
    try {
      // This is a simple way to run JavaScript code
      // In a real app, we'd want to use a proper sandbox
      const result = new Function(`return ${code}`)();
      setOutput(typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result));
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput('Unknown error occurred');
      }
    }
    
    onRun?.(code);
  };
  
  return (
    <div className={cn("rounded-lg overflow-hidden border border-hack-neon/20 bg-hack-dark-lighter/70 shadow-lg", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-hack-dark-lighter border-b border-hack-neon/10">
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4 text-hack-neon" />
          <span className="text-sm text-gray-300">{title || language}</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={copyToClipboard}
            className="p-1 rounded hover:bg-hack-dark text-gray-400 hover:text-hack-neon transition-colors"
            title="Copy code"
          >
            {isCopied ? (
              <CheckSquare className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
          
          {runnable && (
            <button 
              onClick={runCode}
              className="p-1 rounded hover:bg-hack-dark text-gray-400 hover:text-hack-neon transition-colors"
              title="Run code"
            >
              <Terminal className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Code Content */}
      <pre className="p-4 overflow-x-auto">
        <code className="font-mono text-sm">
          {animateTyping ? (
            <TypingAnimation 
              text={code} 
              typingSpeed={10}
              loop={false} 
              startDelay={200}
            />
          ) : (
            code
          )}
        </code>
      </pre>
      
      {/* Output (if code has been run) */}
      {output !== null && (
        <div className="border-t border-hack-neon/10 p-4 bg-hack-dark/50">
          <div className="text-xs text-hack-blue mb-2">Output:</div>
          <pre className="font-mono text-sm text-gray-300 overflow-x-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeSnippet;
