import Image from 'next/image';

export default function SpringBoot() {
  return (
    <Image
      src="/skills/springboot.png"
      alt="Spring Boot"
      width={128}
      height={128}
      className="h-full w-full object-contain"
    />
  );
}
