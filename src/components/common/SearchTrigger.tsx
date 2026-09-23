'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function SearchTrigger() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <Button
      variant="outline"
      type="button"
      className="hover:bg-accent relative flex h-9 cursor-pointer items-center justify-start gap-2 rounded-md border px-3 text-sm font-normal shadow-sm transition-colors active:scale-95"
      onClick={handleClick}
      aria-label="Search"
    >
      <span className="text-muted-foreground hidden md:inline-flex">
        Search
      </span>
      <span className="text-xs">{isMac ? '⌘' : 'Ctrl +'}</span>K
    </Button>
  );
}
