import Image from 'next/image';

export default function Redis() {
  return (
    <Image
      src="/skills/redis.png"
      alt="Redis"
      width={128}
      height={128}
      className="h-full w-full object-contain"
    />
  );
}
