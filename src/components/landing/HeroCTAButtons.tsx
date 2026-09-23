'use client';

import CV from '@/components/svgs/CV';
import Chat from '@/components/svgs/Chat';
import Heart from '@/components/svgs/Heart';
import { Button } from '@/components/ui/button';
import { LiquidMetalButton } from '@/components/ui/liquid-metal';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { usePowerGlitch } from '@/hooks/use-power-glitch';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import { useRouter } from 'next/navigation';

interface HeroButton {
  variant: string;
  text: string;
  href: string;
  icon: string;
  external?: boolean;
}

const buttonIcons = {
  CV: CV,
  Chat: Chat,
  Heart: Heart,
};

interface HeroCTAButtonsProps {
  buttons: HeroButton[];
}

export default function HeroCTAButtons({ buttons }: HeroCTAButtonsProps) {
  const router = useRouter();

  usePowerGlitch('#hero-avatar-glitch', {
    timing: { duration: 2500, iterations: 1 },
    glitchTimeSpan: { start: 0.8, end: 1.0 },
    shake: { velocity: 6, amplitudeX: 0.04, amplitudeY: 0.04 },
    slice: {
      count: 3,
      velocity: 6,
      minHeight: 0.02,
      maxHeight: 0.06,
      hueRotate: false,
    },
    playMode: 'hover',
    createContainers: true,
    hideOverflow: false,
  });

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2.5">
      {buttons.map((button, index) => {
        const IconComponent =
          buttonIcons[button.icon as keyof typeof buttonIcons];

        if (index === 0) {
          return (
            <LiquidMetalButton
              key={index}
              metalConfig={{
                colorBack: '#555555',
                colorTint: '#ffffff',
                speed: 0.25,
                distortion: 0.08,
              }}
              size="sm"
              onClick={() => router.push(button.href)}
            >
              <span className="inline-flex items-center gap-2 font-semibold">
                {IconComponent && <IconComponent />}
                <span>{button.text}</span>
                <svg
                  className="size-3.5 opacity-70 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </LiquidMetalButton>
          );
        }

        if (button.external) {
          return (
            <MagneticButton key={index} asChild className="inline-block">
              <Button
                variant="outline"
                className="group border-border/80 hover:border-foreground/40 hover:bg-muted/50 text-foreground transition-all duration-200"
                asChild
              >
                <a
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  {IconComponent && (
                    <span className="text-muted-foreground group-hover:text-foreground inline-flex items-center transition-transform duration-300 group-hover:scale-110">
                      <IconComponent />
                    </span>
                  )}
                  <span>{button.text}</span>
                </a>
              </Button>
            </MagneticButton>
          );
        }

        return (
          <MagneticButton key={index} asChild className="inline-block">
            <Button
              asChild
              variant={button.variant as 'outline' | 'default'}
              className={cn(
                button.variant === 'outline' &&
                  'border-border/80 hover:bg-muted/50',
                button.variant === 'default' &&
                  'bg-primary text-primary-foreground',
              )}
            >
              <Link
                href={button.href}
                className="inline-flex items-center gap-2"
              >
                {IconComponent && <IconComponent />}
                <span>{button.text}</span>
              </Link>
            </Button>
          </MagneticButton>
        );
      })}
    </div>
  );
}
