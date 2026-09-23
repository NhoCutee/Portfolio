'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Briefcase,
  Cat,
  Contact,
  FileText,
  FolderKanban,
  Github,
  Home,
  Instagram,
  Linkedin,
  Share2,
  Wrench,
} from 'lucide-react';
import { Link } from 'next-view-transitions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CommandItemType {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  group: 'navigation' | 'features' | 'actions';
  url?: string;
  external?: boolean;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [catEnabled, setCatEnabled] = useState(true);
  const router = useRouter();

  // Sync catEnabled state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('oneko-cat-enabled');
      if (saved !== null) {
        setCatEnabled(saved === 'true');
      }
    } catch {}

    const handleSync = (e: Event) => {
      try {
        const customEvent = e as CustomEvent<{ enabled?: boolean }>;
        if (customEvent.detail?.enabled !== undefined) {
          setCatEnabled(customEvent.detail.enabled);
        } else {
          const saved = localStorage.getItem('oneko-cat-enabled');
          setCatEnabled(saved !== 'false');
        }
      } catch {}
    };

    window.addEventListener('oneko-cat-changed', handleSync);
    return () => window.removeEventListener('oneko-cat-changed', handleSync);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Match by physical key code first (layout-independent), then fall back
      // to e.key so it works regardless of keyboard layout or case.
      const isK = e.code === 'KeyK' || e.key?.toLowerCase() === 'k';

      // Ctrl/Cmd + K. preventDefault + stopPropagation as early as possible so
      // Firefox-based browsers (Zen, etc.) don't steal it for their own search.
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        e.stopPropagation();
        setOpen((open) => !open);
        return;
      }

      // "/" as a fallback to open search, unless the user is typing in a field.
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement | null;
        const tag = target?.tagName;
        const typing =
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          target?.isContentEditable === true;
        if (!typing) {
          e.preventDefault();
          setOpen(true);
        }
      }
    };

    const handleToggle = () => setOpen((prev) => !prev);
    const handleOpen = () => setOpen(true);
    window.addEventListener('toggle-command-palette', handleToggle);
    window.addEventListener('open-command-palette', handleOpen);

    // Capture phase so we see the event before other handlers can stop it.
    document.addEventListener('keydown', down, true);
    return () => {
      document.removeEventListener('keydown', down, true);
      window.removeEventListener('toggle-command-palette', handleToggle);
      window.removeEventListener('open-command-palette', handleOpen);
    };
  }, []);

  // Prevent background scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const handleNavigate = (path: string) => {
    setOpen(false);
    // Wait for dialog to close before navigating
    setTimeout(() => {
      if (document.visibilityState === 'visible') {
        router.push(path);
      } else {
        // If document is hidden, wait until it's visible
        const handleVisibilityChange = () => {
          if (document.visibilityState === 'visible') {
            router.push(path);
            document.removeEventListener(
              'visibilitychange',
              handleVisibilityChange,
            );
          }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
      }
    }, 150);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    setOpen(false);
  };

  const openExternal = (url: string) => {
    setOpen(false);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleToggleCat = () => {
    const nextState = !catEnabled;
    setCatEnabled(nextState);
    try {
      localStorage.setItem('oneko-cat-enabled', String(nextState));
    } catch {}
    const neko = document.getElementById('oneko');
    if (neko) {
      neko.style.display = nextState ? 'block' : 'none';
    }
    window.dispatchEvent(
      new CustomEvent('oneko-cat-changed', { detail: { enabled: nextState } }),
    );
    setOpen(false);
  };

  const commands: CommandItemType[] = [
    // Navigation
    {
      id: 'home',
      label: 'Home',
      description: 'Navigate to the homepage',
      icon: <Home />,
      url: '/',
      action: () => handleNavigate('/'),
      group: 'navigation',
    },
    {
      id: 'work',
      label: 'Work Experience',
      description: 'View work experience and employment history',
      icon: <Briefcase />,
      url: '/work-experience',
      action: () => handleNavigate('/work-experience'),
      group: 'navigation',
    },
    {
      id: 'projects',
      label: 'Projects',
      description: 'View all projects and portfolio work',
      icon: <FolderKanban />,
      url: '/projects',
      action: () => handleNavigate('/projects'),
      group: 'navigation',
    },
    {
      id: 'resume',
      label: 'Resume',
      description: 'View and download resume',
      icon: <FileText />,
      url: '/resume',
      action: () => handleNavigate('/resume'),
      group: 'navigation',
    },
    {
      id: 'gears',
      label: 'Gears',
      description: 'View hardware and equipment setup',
      icon: <Wrench />,
      url: '/gears',
      action: () => handleNavigate('/gears'),
      group: 'navigation',
    },
    {
      id: 'contact',
      label: 'Contact',
      description: 'Get in touch',
      icon: <Contact />,
      url: '/contact',
      action: () => handleNavigate('/contact'),
      group: 'navigation',
    },
    {
      id: 'secret',
      label: 'Secret Page',
      description: '🎉 You found it!',
      icon: <FileText />,
      url: '/secret',
      action: () => handleNavigate('/secret'),
      group: 'navigation',
    },

    // Features
    {
      id: 'toggle-cat',
      label: catEnabled ? 'Hide Oneko Cat' : 'Show Oneko Cat',
      description: catEnabled
        ? 'Hide the running 8-bit cat from your screen'
        : 'Display the 8-bit cat chasing your cursor',
      icon: <Cat className="h-4 w-4 text-amber-500" />,
      action: handleToggleCat,
      group: 'features',
    },

    // Actions
    {
      id: 'share',
      label: 'Share Page',
      description: 'Share the current page',
      icon: <Share2 />,
      action: handleShare,
      group: 'actions',
    },
    {
      id: 'github',
      label: 'GitHub',
      description: 'View GitHub profile',
      icon: <Github />,
      url: 'https://github.com/NhoCutee',
      external: true,
      action: () => openExternal('https://github.com/NhoCutee'),
      group: 'actions',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      description: 'View Instagram profile',
      icon: <Instagram />,
      url: 'https://instagram.com/meobone',
      external: true,
      action: () => openExternal('https://instagram.com/meobone'),
      group: 'actions',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      description: 'View LinkedIn profile',
      icon: <Linkedin />,
      url: 'https://www.linkedin.com/in/huy-nguy%E1%BB%85n-quang-278ab0367/',
      external: true,
      action: () =>
        openExternal(
          'https://www.linkedin.com/in/huy-nguy%E1%BB%85n-quang-278ab0367/',
        ),
      group: 'actions',
    },
  ];

  // Group commands by category
  const navigationCommands = commands.filter(
    (cmd) => cmd.group === 'navigation',
  );
  const featureCommands = commands.filter((cmd) => cmd.group === 'features');
  const actionCommands = commands.filter((cmd) => cmd.group === 'actions');

  const renderCommandItem = (command: CommandItemType) => {
    const itemContent = (
      <>
        {command.icon}
        <div className="flex flex-col">
          <span>{command.label}</span>
          <span className="text-muted-foreground text-xs">
            {command.description}
          </span>
        </div>
      </>
    );

    if (command.url) {
      if (command.external) {
        return (
          <CommandItem
            key={command.id}
            value={`${command.label} ${command.description}`}
            onSelect={command.action}
            className="cursor-pointer p-0"
          >
            <a
              href={command.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 px-2 py-1.5 text-inherit no-underline outline-none select-none"
            >
              {itemContent}
            </a>
          </CommandItem>
        );
      }

      return (
        <CommandItem
          key={command.id}
          value={`${command.label} ${command.description}`}
          onSelect={command.action}
          className="cursor-pointer p-0"
        >
          <Link
            href={command.url}
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 px-2 py-1.5 text-inherit no-underline outline-none select-none"
          >
            {itemContent}
          </Link>
        </CommandItem>
      );
    }

    return (
      <CommandItem
        key={command.id}
        value={`${command.label} ${command.description}`}
        onSelect={command.action}
        onClick={command.action}
        className="cursor-pointer"
      >
        {itemContent}
      </CommandItem>
    );
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      showCloseButton={false}
      className="max-w-2xl"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="max-h-[450px] overflow-y-auto">
        <CommandEmpty>No results found.</CommandEmpty>

        {navigationCommands.length > 0 && (
          <>
            <CommandGroup heading="Navigation">
              {navigationCommands.map(renderCommandItem)}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {featureCommands.length > 0 && (
          <>
            <CommandGroup heading="Features">
              {featureCommands.map(renderCommandItem)}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {actionCommands.length > 0 && (
          <CommandGroup heading="Actions">
            {actionCommands.map(renderCommandItem)}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
