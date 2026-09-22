import Calender from '@/components/svgs/Calender';
import Gear from '@/components/svgs/Gear';
import { Award } from 'lucide-react';
import React from 'react';

export type JourneyItem = {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

export const journeyItems: JourneyItem[] = [
  {
    name: 'My Journey',
    description: 'A timeline of my learning, projects, and milestones.',
    icon: Calender,
    href: '/journey',
  },
  {
    name: 'Gears Used',
    description: 'Productivity tools and gear I use to get my work done.',
    icon: Gear,
    href: '/gears',
  },
  {
    name: 'Certificates & Achievements',
    description: 'A curated list of certificates and achievements.',
    icon: Award,
    href: '/journey/certificates',
  },
];

const journeyConfig = {
  journeyItems,
};

export default journeyConfig;
