import Bun from '@/components/technologies/Bun';
import Docker from '@/components/technologies/Docker';
import ExpressJs from '@/components/technologies/ExpressJs';
import Figma from '@/components/technologies/Figma';
import GithubIcon from '@/components/technologies/Github';
import Grpc from '@/components/technologies/Grpc';
import Java from '@/components/technologies/Java';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import RabbitMQ from '@/components/technologies/RabbitMQ';
import ReactIcon from '@/components/technologies/ReactIcon';
import Redis from '@/components/technologies/Redis';
import Shadcn from '@/components/technologies/Shadcn';
import SocketIo from '@/components/technologies/SocketIo';
import SpringBoot from '@/components/technologies/SpringBoot';
import Supabase from '@/components/technologies/Supabase';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';

export interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Backend & Distributed Systems',
    skills: [
      { name: 'Java', icon: <Java key="java" /> },
      { name: 'Spring Boot', icon: <SpringBoot key="springboot" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Redis', icon: <Redis key="redis" /> },
      { name: 'RabbitMQ', icon: <RabbitMQ key="rabbitmq" /> },
      { name: 'gRPC', icon: <Grpc key="grpc" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'Socket.io', icon: <SocketIo key="socketio" /> },
      { name: 'Prisma', icon: <Prisma key="prisma" /> },
      { name: 'Supabase', icon: <Supabase key="supabase" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
      { name: 'Express.js', icon: <ExpressJs key="expressjs" /> },
    ],
  },
  {
    category: 'Frontend & UI Craft',
    skills: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
    ],
  },
  {
    category: 'DevOps & Tooling',
    skills: [
      { name: 'Docker', icon: <Docker key="docker" /> },
      { name: 'Bun', icon: <Bun key="bun" /> },
      { name: 'GitHub', icon: <GithubIcon key="github" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
      { name: 'Figma', icon: <Figma key="figma" /> },
    ],
  },
];

export const mySkills = [
  <Java key="java" />,
  <SpringBoot key="springboot" />,
  <ReactIcon key="react" />,
  <NextJs key="nextjs" />,
  <TypeScript key="typescript" />,
  <JavaScript key="javascript" />,
  <NodeJs key="nodejs" />,
  <Docker key="docker" />,
  <Redis key="redis" />,
  <PostgreSQL key="postgresql" />,
  <RabbitMQ key="rabbitmq" />,
  <Grpc key="grpc" />,
  <TailwindCss key="tailwindcss" />,
  <Shadcn key="shadcn" />,
  <SocketIo key="socketio" />,
  <Prisma key="prisma" />,
  <Supabase key="supabase" />,
  <MongoDB key="mongodb" />,
  <ExpressJs key="expressjs" />,
  <Bun key="bun" />,
  <Figma key="figma" />,
  <Vercel key="vercel" />,
  <GithubIcon key="github" />,
];

export const about = {
  name: 'Nguyen Quang Huy',
  role: 'Software Engineer (Backend & Full Stack)',
  location: 'Hanoi, Vietnam',
  education: 'Software Engineering, FPT University',
  description: `I am a Software Engineer focused on architecting resilient backend systems and high-performance full-stack applications. My core expertise centers on Java, Spring Boot, PostgreSQL, Redis, RabbitMQ, and gRPC microservices, paired with modern TypeScript and Next.js interfaces. Passionate about real-time distributed platforms, high-throughput message processing, and robust cloud infrastructure.`,
};
