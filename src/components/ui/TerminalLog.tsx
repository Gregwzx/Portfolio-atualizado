'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TERMINAL_LOGS } from '@/lib/constants';

interface TerminalLogProps {
  className?: string;
  autoPlay?: boolean;
  speed?: number;
}

export function TerminalLog({ className = '', autoPlay = true, speed = 300 }: TerminalLogProps) {
  const [lines, setLines] = useState<typeof TERMINAL_LOGS>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!autoPlay) {
      setLines(TERMINAL_LOGS);
      setDone(true);
      return;
    }

    const interval = setInterval(() => {
      setLines((prev) => {
        if (prev.length < TERMINAL_LOGS.length) {
          const nextLine = TERMINAL_LOGS[prev.length];
          return nextLine ? [...prev, nextLine] : prev;
        } else {
          setDone(true);
          clearInterval(interval);
          return prev;
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, [autoPlay, speed]);

  return (
    <div className={`terminal ${className}`} aria-live="polite">
      <AnimatePresence>
        {lines.filter(Boolean).map((line, i) => (
          <motion.div
            key={i}
            className="terminal-line"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {line?.type === 'cmd' && (
              <>
                <span className="terminal-prompt">$</span>
                <span className="terminal-cmd">{line.text}</span>
              </>
            )}
            {line?.type === 'output' && (
              <span className="terminal-output">{line.text}</span>
            )}
            {line?.type === 'success' && (
              <span className="terminal-success">{line.text}</span>
            )}
            {line?.type === 'error' && (
              <span className="terminal-error">{line.text}</span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      {!done && (
        <div className="terminal-line">
          <span className="terminal-prompt">$</span>
          <span className="terminal-cursor" />
        </div>
      )}
    </div>
  );
}
