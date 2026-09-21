import Image from 'next/image';

export default function Java() {
  return (
    <Image
      src="/skills/java.png"
      alt="Java"
      width={128}
      height={128}
      className="h-full w-full object-contain"
    />
  );
}
