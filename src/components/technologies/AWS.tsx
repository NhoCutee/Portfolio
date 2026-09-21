import Image from 'next/image';

export default function AWS() {
  return (
    <Image
      src="/skills/aws.png"
      alt="AWS"
      width={128}
      height={128}
      className="h-full w-full object-contain"
    />
  );
}
