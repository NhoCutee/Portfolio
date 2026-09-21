import Docker from '@/components/technologies/Docker';
import Java from '@/components/technologies/Java';
import NextJs from '@/components/technologies/NextJs';
import OpenAI from '@/components/technologies/OpenAI';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import Redis from '@/components/technologies/Redis';
import Shadcn from '@/components/technologies/Shadcn';
import SocketIo from '@/components/technologies/SocketIo';
import SpringBoot from '@/components/technologies/SpringBoot';
import Supabase from '@/components/technologies/Supabase';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'Real-time Collaborative Whiteboard',
    description:
      'Infinite canvas collaboration platform featuring 60fps rendering, multi-cursor presence, and conflict-free state synchronization with CRDTs (Yjs) over WebSockets.',
    image: '/project/rune.webp',
    link: 'https://github.com/NhoCutee/collaborative-whiteboard',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Socket.io', icon: <SocketIo key="socketio" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
    ],
    github: 'https://github.com/NhoCutee/collaborative-whiteboard',
    live: 'https://whiteboard.demo.dev',
    details: true,
    projectDetailsPageSlug: '/projects/collaborative-whiteboard',
    isWorking: true,
  },
  {
    title: 'Fullstack B2B SaaS Platform',
    description:
      'Enterprise multi-tenant management platform with role-based access control (RBAC), idempotent payment webhooks, and Redis caching layer.',
    image: '/project/beam.webp',
    link: 'https://github.com/NhoCutee/b2b-saas-platform',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Redis', icon: <Redis key="redis" /> },
      { name: 'Docker', icon: <Docker key="docker" /> },
      { name: 'Prisma', icon: <Prisma key="prisma" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    github: 'https://github.com/NhoCutee/b2b-saas-platform',
    live: 'https://saas.demo.dev',
    details: true,
    projectDetailsPageSlug: '/projects/b2b-saas-platform',
    isWorking: true,
  },
  {
    title: 'AI Document Workspace (RAG Assistant)',
    description:
      'GenAI knowledge base assistant with document chunking, vector embeddings (pgvector), and SSE streaming with interactive citation highlights.',
    image: '/project/LocalGovAI.webp',
    link: 'https://github.com/NhoCutee/ai-document-workspace',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Supabase', icon: <Supabase key="supabase" /> },
      { name: 'OpenAI', icon: <OpenAI key="openai" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
    ],
    github: 'https://github.com/NhoCutee/ai-document-workspace',
    live: 'https://ai-docs.demo.dev',
    details: true,
    projectDetailsPageSlug: '/projects/ai-document-workspace',
    isWorking: true,
  },
  {
    title: 'Drag & Drop Website / Form Builder',
    description:
      'Visual layout builder using hierarchical tree state model, @dnd-kit engine, and real-time clean Tailwind CSS code generator.',
    image: '/project/zaxis.webp',
    link: 'https://github.com/NhoCutee/drag-and-drop-builder',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
    ],
    github: 'https://github.com/NhoCutee/drag-and-drop-builder',
    live: 'https://builder.demo.dev',
    details: true,
    projectDetailsPageSlug: '/projects/drag-and-drop-builder',
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
