import Github from '@/components/svgs/Github';
import Instagram from '@/components/svgs/Instagram';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import AWS from '@/components/technologies/AWS';
import Bun from '@/components/technologies/Bun';
import Docker from '@/components/technologies/Docker';
import Java from '@/components/technologies/Java';
import JavaScript from '@/components/technologies/JavaScript';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import RabbitMQ from '@/components/technologies/RabbitMQ';
import ReactIcon from '@/components/technologies/ReactIcon';
import Redis from '@/components/technologies/Redis';
import SpringBoot from '@/components/technologies/SpringBoot';
import Supabase from '@/components/technologies/Supabase';
import TypeScript from '@/components/technologies/TypeScript';

// Component mapping for skills
export const skillComponents = {
  TypeScript: TypeScript,
  ReactIcon: ReactIcon,
  NextJs: NextJs,
  Bun: Bun,
  PostgreSQL: PostgreSQL,
  NodeJs: NodeJs,
  Supabase: Supabase,
  Prisma: Prisma,
  JavaScript: JavaScript,
  SpringBoot: SpringBoot,
  Java: Java,
  Docker: Docker,
  Redis: Redis,
  RabbitMQ: RabbitMQ,
  AWS: AWS,
};

export const heroConfig = {
  // Personal Information
  name: 'Nguyen Huy',
  title: 'Software Engineer & Full Stack Developer',
  avatar: '/assets/logo.png',

  // Skills Configuration
  skills: [
    {
      name: 'Spring Boot',
      href: 'https://spring.io/projects/spring-boot',
      component: 'SpringBoot',
    },
    {
      name: 'React',
      href: 'https://react.dev/',
      component: 'ReactIcon',
    },
    {
      name: 'Next.js',
      href: 'https://nextjs.org/',
      component: 'NextJs',
    },
    {
      name: 'TypeScript',
      href: 'https://www.typescriptlang.org/',
      component: 'TypeScript',
    },
    {
      name: 'Node.js',
      href: 'https://nodejs.org/',
      component: 'NodeJs',
    },
    {
      name: 'PostgreSQL',
      href: 'https://www.postgresql.org/',
      component: 'PostgreSQL',
    },
  ],

  // Description Configuration
  description: {
    template:
      'I build high-performance web applications using {skills:0}, {skills:1}, {skills:2}, {skills:3}, {skills:4} and {skills:5}. Passionate about <b>real-time collaboration</b>, <b>scalable SaaS architectures</b>, and <b>AI-driven workflows</b>.',
  },

  // Buttons Configuration
  buttons: [
    {
      variant: 'outline',
      text: 'Resume',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'default',
      text: 'Get in touch',
      href: '/contact',
      icon: 'Chat',
    },
    {
      variant: 'outline',
      text: 'GitHub',
      href: 'https://github.com/NhoCutee',
      icon: 'Heart',
      external: true,
    },
  ],
};

// Social Links Configuration
export const socialLinks = [
  {
    name: 'Github',
    href: 'https://github.com/NhoCutee',
    icon: <Github />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/huy-nguy%E1%BB%85n-quang-278ab0367/',
    icon: <LinkedIn />,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/meobone',
    icon: <Instagram />,
  },
  {
    name: 'Email',
    href: 'mailto:nguyenquanghuy200612@gmail.com',
    icon: <Mail />,
  },
];
