export default function SpotifyNowPlaying({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div className={`w-full max-w-md rounded-2xl ${className}`}>
      <iframe
        src="https://open.spotify.com/embed/track/3vkCueOmm7xQDoJ17W1Pm3?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="block rounded-2xl shadow-md"
      />
    </div>
  );
}
