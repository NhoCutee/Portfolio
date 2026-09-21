'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface MatrixTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const LOWER_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
const UPPER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function MatrixText({ text, className = '', style }: MatrixTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const rafRef = useRef<number | null>(null);
  const originalTextRef = useRef(text);
  const iterationRef = useRef(0);
  const lastFrameRef = useRef(0);
  const isRunningRef = useRef(false);

  useEffect(() => {
    originalTextRef.current = text;
    setDisplayText(text);
  }, [text]);

  const startMatrixEffect = () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    iterationRef.current = 0;
    const originalText = originalTextRef.current;
    const maxIterations = originalText.length * 2;
    const frameInterval = 35;

    const animate = (timestamp: number) => {
      if (timestamp - lastFrameRef.current < frameInterval) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameRef.current = timestamp;

      iterationRef.current += 0.6;
      const iter = iterationRef.current;

      if (iter >= maxIterations) {
        setDisplayText(originalText);
        rafRef.current = null;
        isRunningRef.current = false;
        return;
      }

      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            // Keep spaces so word boundaries and layout stay 100% stable
            if (char === ' ') return ' ';
            if (index < iter) return originalText[index];
            if (char >= 'a' && char <= 'z') {
              return LOWER_CHARS[
                Math.floor(Math.random() * LOWER_CHARS.length)
              ];
            }
            if (char >= 'A' && char <= 'Z') {
              return UPPER_CHARS[
                Math.floor(Math.random() * UPPER_CHARS.length)
              ];
            }
            return LOWER_CHARS[Math.floor(Math.random() * LOWER_CHARS.length)];
          })
          .join(''),
      );

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <span
      className={cn(
        'inline-block cursor-default whitespace-nowrap select-none',
        className,
      )}
      onMouseEnter={startMatrixEffect}
      style={style}
    >
      {displayText}
    </span>
  );
}
