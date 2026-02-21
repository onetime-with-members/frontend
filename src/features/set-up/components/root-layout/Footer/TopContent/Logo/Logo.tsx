import Image from 'next/image';

export default function Logo() {
  return (
    <div>
      <Image
        src="/images/logo-white.svg"
        alt="OneTime"
        width={148}
        height={32}
      />
    </div>
  );
}
