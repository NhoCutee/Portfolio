export default function SpotifyNowPlaying({
  className = '',
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={`w-full ${compact ? 'max-w-xs' : 'max-w-md'} ${className}`}>
      <iframe
        src="https://open.spotify.com/embed/track/3vkCueOmm7xQDoJ17W1Pm3?utm_source=generator&theme=0"
        width="100%"
        height={compact ? '80' : '152'}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="block w-full rounded-xl shadow-sm"
      />
    </div>
  );
}
