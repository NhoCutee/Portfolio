import React from 'react';

interface SkillProps {
  name: string;
  href?: string;
  children: React.ReactNode;
}

export default function Skill({ name, children }: SkillProps) {
  return (
    <span className="skill-inner-shadow inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-1 text-sm font-semibold text-black select-none dark:border-white/30 dark:bg-white/15 dark:text-white">
      <span className="size-4 flex-shrink-0">{children}</span>
      <span className="ml-1 text-sm font-bold">{name}</span>
    </span>
  );
}
