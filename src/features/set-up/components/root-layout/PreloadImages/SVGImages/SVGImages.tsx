import Image from 'next/image';

export default function SVGImages() {
  return (
    <>
      <Image
        src="/images/logo-white.svg"
        alt=""
        width={1}
        height={1}
        priority
      />
      <Image
        src="/images/network-error-clock.svg"
        alt=""
        width={1}
        height={1}
        priority
      />
      <Image
        src="/images/welcome-clock.svg"
        alt=""
        width={1}
        height={1}
        priority
      />
    </>
  );
}
