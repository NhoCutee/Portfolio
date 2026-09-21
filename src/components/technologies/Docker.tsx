import Image from 'next/image';

export default function Docker() {
  return (
    <Image
      src="/skills/docker.png"
      alt="Docker"
      width={128}
      height={128}
      className="h-full w-full object-contain"
    />
  );
}
