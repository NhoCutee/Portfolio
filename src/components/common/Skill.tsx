import React from 'react';

interface SkillProps {
  name: string;
  href?: string;
  children: React.ReactNode;
}

export default function Skill({ name, children }: SkillProps) {
  return (
    <span className="border-border/60 bg-muted/30 text-foreground hover:border-border hover:bg-muted/70 inline-flex cursor-default items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all duration-200 select-none hover:scale-105">
      <span className="flex size-3.5 flex-shrink-0 items-center justify-center">
        {children}
      </span>
      <span>{name}</span>
    </span>
  );
}
