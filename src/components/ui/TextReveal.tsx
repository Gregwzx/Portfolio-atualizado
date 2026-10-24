'use client';

import { motion, Variants } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

const wordVariants: Variants = {
  hidden: {
    y: '110%',
    opacity: 0,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.06,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function TextReveal({
  text,
  className = '',
  delay = 0,
  once = true,
  as: Tag = 'div',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px' });

  const words = text.split(' ');

  return (
    <Tag className={`overflow-hidden ${className}`}>
      <div ref={ref} style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.25em' }}>
        {words.map((word, i) => (
          <div key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
            <motion.span
              className="inline-block"
              custom={i + delay * 10}
              variants={wordVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          </div>
        ))}
      </div>
    </Tag>
  );
}

interface CharRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function CharReveal({ text, className = '', delay = 0, once = true }: CharRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-5% 0px' });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '110%', opacity: 0 }}
          animate={
            isInView
              ? {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    delay: delay + i * 0.02,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }
              : { y: '110%', opacity: 0 }
          }
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-5% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, transition: { duration, delay, ease: [0.16, 1, 0.3, 1] } }
          : { opacity: 0, y: 20 }
      }
    >
      {children}
    </motion.div>
  );
}
