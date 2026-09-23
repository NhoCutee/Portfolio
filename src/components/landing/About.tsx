'use client';

import { about, skillCategories } from '@/config/About';
import { motion } from 'motion/react';
import Image from 'next/image';
import React from 'react';

import SectionHeading from '../common/SectionHeading';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function About() {
  return (
    <section className="border-border/50 border-b py-12 last:border-0">
      <SectionHeading heading="About" />
      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
        {/* Left Profile Accent Card */}
        <div className="border-border/60 bg-muted/20 flex flex-shrink-0 flex-col items-center rounded-2xl border p-6 text-center md:w-64">
          <div className="border-border relative mb-4 size-24 overflow-hidden rounded-full border-2 shadow-md">
            <Image
              src="/assets/logo.png"
              alt={about.name}
              width={96}
              height={96}
              priority
              className="size-full object-cover"
            />
          </div>
          <h3 className="text-foreground text-lg font-bold">{about.name}</h3>
          <p className="text-muted-foreground mt-1 text-xs font-medium">
            {about.role}
          </p>
          <div className="border-border/50 text-muted-foreground mt-4 flex w-full flex-col gap-1.5 border-t pt-3 text-left text-xs">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              <span>{about.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-blue-500" />
              <span className="truncate">{about.education}</span>
            </div>
          </div>
        </div>

        {/* Right Bio & Categorized Skills */}
        <div className="flex flex-1 flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-3"
          >
            <h4 className="text-foreground text-xl font-bold tracking-tight">
              Engineering with Architectural Precision & Craft
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              {about.description}
            </p>
          </motion.div>

          {/* Categorized Skills */}
          <div className="flex flex-col gap-5 pt-2">
            {skillCategories.map((group, groupIdx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: groupIdx * 0.1 }}
                className="flex flex-col gap-2.5"
              >
                <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Tooltip key={skill.name}>
                      <TooltipTrigger asChild>
                        <span className="border-border/60 bg-muted/30 text-foreground hover:border-border hover:bg-muted/70 inline-flex cursor-default items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all duration-200 select-none hover:scale-105">
                          <span className="flex size-3.5 flex-shrink-0 items-center justify-center">
                            {skill.icon}
                          </span>
                          <span>{skill.name}</span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{skill.name}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
