import Image from 'next/image';

export default function RabbitMQ() {
  return (
    <Image
      src="/skills/rabbitmq.png"
      alt="RabbitMQ"
      width={128}
      height={128}
      className="h-full w-full object-contain"
    />
  );
}
