'use client';

import { Pause, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

export default function SpotifyNowPlaying({
  className = '',
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  // Full player for wide pages (e.g. /secret)
  if (!compact) {
    return (
      <div
        className={`w-full max-w-md overflow-hidden rounded-2xl ${className}`}
      >
        <iframe
          src="https://open.spotify.com/embed/track/3vkCueOmm7xQDoJ17W1Pm3?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="block w-full overflow-hidden rounded-2xl border-0 shadow-md"
        />
      </div>
    );
  }

  // Native compact card for HeroSidebar: 100% responsive, zero scrollbars
  return (
    <div className={`w-full max-w-xs ${className}`}>
      <audio
        ref={audioRef}
        src="https://p.scdn.co/mp3-preview/2f90c9a6a2b6e38554d3bc3cf7512c2c70ac67b9"
        onEnded={() => setIsPlaying(false)}
      />
      <div className="border-border/60 bg-muted/40 hover:border-border relative flex items-center gap-3 overflow-hidden rounded-2xl border p-2.5 backdrop-blur-sm transition-all duration-200">
        {/* Album art with play/pause overlay */}
        <div className="relative size-12 shrink-0 overflow-hidden rounded-xl shadow-sm">
          <Image
            src="https://i.scdn.co/image/ab67616d0000b27334f21d3047d85440dfa37f10"
            alt="My Love Mine All Mine"
            width={48}
            height={48}
            className={`size-full object-cover transition-transform duration-500 ${isPlaying ? 'scale-105' : ''}`}
          />
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play preview'}
            className="absolute inset-0 flex items-center justify-center bg-black/50 text-white transition-opacity hover:bg-black/70"
          >
            {isPlaying ? (
              <Pause className="size-4 fill-white" />
            ) : (
              <Play className="size-4 translate-x-0.5 fill-white" />
            )}
          </button>
        </div>

        {/* Track info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold tracking-wider text-green-500 uppercase">
              {isPlaying ? 'Playing Preview' : 'Currently Playing'}
            </span>
            {isPlaying && (
              <span className="flex h-2.5 items-end gap-0.5">
                <span className="h-full w-0.5 animate-pulse bg-green-500" />
                <span className="h-2/3 w-0.5 animate-pulse bg-green-500" />
                <span className="h-4/5 w-0.5 animate-pulse bg-green-500" />
              </span>
            )}
          </div>
          <Link
            href="https://open.spotify.com/track/3vkCueOmm7xQDoJ17W1Pm3"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary block truncate text-xs font-semibold tracking-tight transition-colors"
          >
            My Love Mine All Mine
          </Link>
          <p className="text-muted-foreground truncate text-[11px]">Mitski</p>
        </div>

        {/* Spotify icon */}
        <Link
          href="https://open.spotify.com/track/3vkCueOmm7xQDoJ17W1Pm3"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground shrink-0 pr-1 transition-colors hover:text-green-500"
          aria-label="Listen on Spotify"
        >
          <svg className="size-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.306c-.218.358-.684.474-1.042.256-2.857-1.745-6.455-2.14-10.693-1.171-.41.094-.817-.162-.911-.572-.094-.41.162-.817.572-.911 4.6-1.05 8.57-.611 11.818 1.356.358.218.474.684.256 1.042zm1.467-3.26c-.275.447-.86.588-1.307.313-3.27-2.01-8.254-2.593-12.122-1.417-.502.152-1.03-.133-1.182-.635-.152-.502.133-1.03.635-1.182 4.417-1.341 9.907-.692 13.663 1.614.447.275.588.86.313 1.307zm.126-3.41c-3.921-2.328-10.38-2.543-14.128-1.404-.6.182-1.237-.16-1.419-.76-.182-.6.16-1.237.76-1.419 4.305-1.307 11.442-1.053 15.962 1.63.539.32.715 1.02.395 1.559-.32.539-1.02.715-1.57.394z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
