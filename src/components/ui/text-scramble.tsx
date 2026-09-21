'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleDuration?: number;
}

const LOWER_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
const UPPER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=';

export function TextScramble({
  text,
  className,
  scrambleDuration = 40,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const scramble = () => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;

    let iteration = 0;
    const maxIterations = text.length * 2;

    if (intervalRef.current) clearInterval(intervalRef.current);

    const scrambleInterval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            // Keep spaces and whitespace intact so layout never shifts or wraps
            if (char === ' ' || char === '\n' || char === '\t') {
              return char;
            }
            if (index < iteration / 2) {
              return text[index];
            }
            // Match character casing so width does not balloon
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
            return SYMBOL_CHARS[
              Math.floor(Math.random() * SYMBOL_CHARS.length)
            ];
          })
          .join(''),
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(scrambleInterval);
        setDisplayText(text);
        isScramblingRef.current = false;
      }
    }, scrambleDuration);

    intervalRef.current = scrambleInterval;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <span
      className={cn('inline-block cursor-default select-none', className)}
      onMouseEnter={scramble}
      onFocus={scramble}
    >
      {displayText}
    </span>
  );
}
