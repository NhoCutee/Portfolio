import Docker from '@/components/technologies/Docker';
import Java from '@/components/technologies/Java';
import NextJs from '@/components/technologies/NextJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import ReactIcon from '@/components/technologies/ReactIcon';
import SpringBoot from '@/components/technologies/SpringBoot';
import Supabase from '@/components/technologies/Supabase';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'SnapLink — High-Performance URL Shortener',
    description:
      'Enterprise-grade, low-latency URL shortening platform featuring SHA-256 / Base64URL deduplication (RFC 4648), Supabase PostgreSQL, and sub-50ms 302 redirects.',
    image: '/project/beam.webp',
    link: 'https://github.com/NhoCutee/Web_url_shortener',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Supabase', icon: <Supabase key="supabase" /> },
      { name: 'Docker', icon: <Docker key="docker" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
    ],
    github: 'https://github.com/NhoCutee/Web_url_shortener',
    live: 'https://meobo.vercel.app',
    details: true,
    projectDetailsPageSlug: '/projects/snaplink-url-shortener',
    isWorking: true,
  },
  {
    title: 'RMS — Restaurant Management System',
    description:
      'Fullstack restaurant operations platform featuring QR table ordering, real-time Kitchen Display System (KDS), role-based auth, and revenue analytics.',
    image: '/project/launchkit.webp',
    link: 'https://github.com/NhoCutee/restaurant-management-system',
    technologies: [
      { name: 'Java', icon: <Java key="java" /> },
      { name: 'Spring Boot', icon: <SpringBoot key="springboot" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Docker', icon: <Docker key="docker" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
    ],
    github: 'https://github.com/NhoCutee/restaurant-management-system',
    live: 'https://rms.demo.dev',
    details: true,
    projectDetailsPageSlug: '/projects/restaurant-management-system',
    isWorking: true,
  },
];
