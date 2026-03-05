import Image from 'next/image';

export default function ImageContent() {
  return (
    <div>
      <Image src="/images/404.svg" alt="404" width={200} height={73} />
    </div>
  );
}
