import AWS from '@/components/technologies/AWS';
import Docker from '@/components/technologies/Docker';
import Figma from '@/components/technologies/Figma';
import Java from '@/components/technologies/Java';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import RabbitMQ from '@/components/technologies/RabbitMQ';
import ReactIcon from '@/components/technologies/ReactIcon';
import Redis from '@/components/technologies/Redis';
import SpringBoot from '@/components/technologies/SpringBoot';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: false,
    company: 'VNPT Media',
    position: 'Software Engineer Intern',
    location: 'Hanoi, Vietnam',
    image: '/company/vnpt.png',
    description: [
      'Participating in developing backend services and APIs for enterprise digital platforms using Java, Spring Boot, and PostgreSQL',
      'Implementing asynchronous messaging with RabbitMQ, inter-service communication with gRPC, and distributed caching with Redis',
      'Building responsive user interfaces with React, Next.js, and TypeScript, containerized with Docker in team workflows',
    ],
    startDate: 'Jul 2026',
    endDate: 'Present',
    technologies: [
      {
        name: 'Spring Boot',
        href: 'https://spring.io/projects/spring-boot',
        icon: <SpringBoot />,
      },
      {
        name: 'Docker',
        href: 'https://docker.com/',
        icon: <Docker />,
      },
      {
        name: 'Redis',
        href: 'https://redis.io/',
        icon: <Redis />,
      },
      {
        name: 'RabbitMQ',
        href: 'https://www.rabbitmq.com/',
        icon: <RabbitMQ />,
      },
      {
        name: 'AWS',
        href: 'https://aws.amazon.com/',
        icon: <AWS />,
      },
      {
        name: 'PostgreSQL',
        href: 'https://www.postgresql.org/',
        icon: <PostgreSQL />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
    ],
    website: 'https://vnptmedia.vn',
  },
  {
    isCurrent: false,
    company: 'Open Source & Independent Dev',
    position: 'Full Stack & Software Engineer',
    location: 'Remote',
    image: '/company/cursorlogo.png',
    description: [
      'Designing and developing modern, responsive full-stack web applications using Next.js, React, and TypeScript',
      'Implementing secure RESTful APIs, relational database schema design with PostgreSQL, and cloud persistence with Supabase',
      'Packaging applications with Docker and optimizing frontend performance, accessibility, and Core Web Vitals',
    ],
    startDate: 'Jan 2025',
    endDate: 'Present',
    technologies: [
      {
        name: 'Spring Boot',
        href: 'https://spring.io/projects/spring-boot',
        icon: <SpringBoot />,
      },
      {
        name: 'NodeJs',
        href: 'https://nodejs.org/',
        icon: <NodeJs />,
      },
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'Redis',
        href: 'https://redis.io/',
        icon: <Redis />,
      },
      {
        name: 'Docker',
        href: 'https://docker.com/',
        icon: <Docker />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
    ],
    website: 'https://github.com/NhoCutee',
  },
  {
    isCurrent: false,
    company: 'FPT University',
    position: 'Software Engineering Project Dev',
    location: 'Hanoi, Vietnam',
    image: '/company/fpt.png',
    description: [
      'Collaborating in academic software engineering teams to analyze system requirements and build end-to-end full-stack applications',
      'Designing relational database schemas, entity relationships, and robust RESTful APIs with Java, Spring Boot, and PostgreSQL',
      'Implementing role-based authentication, clean layered architectures (Controller-Service-Repository), and interactive UI workflows',
    ],
    startDate: 'Sep 2024',
    endDate: 'Present',
    technologies: [
      {
        name: 'Spring Boot',
        href: 'https://spring.io/projects/spring-boot',
        icon: <SpringBoot />,
      },
      {
        name: 'Java',
        href: 'https://www.java.com/',
        icon: <Java />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'Figma',
        href: 'https://figma.com/',
        icon: <Figma />,
      },
      {
        name: 'Docker',
        href: 'https://docker.com/',
        icon: <Docker />,
      },
      {
        name: 'PostgreSQL',
        href: 'https://www.postgresql.org/',
        icon: <PostgreSQL />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
    ],
    website: 'https://fpt.edu.vn',
  },
];
