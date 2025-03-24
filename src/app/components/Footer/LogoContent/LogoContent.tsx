import { IconBrandInstagram } from '@tabler/icons-react';
import Image from 'next/image';

export default function LogoContent() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Image
          src="/images/logo-white.svg"
          alt="OneTime"
          width={148}
          height={32}
        />
      </div>
      <a
        href="https://www.instagram.com/one.time.official/"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-gray-70 p-2 duration-150 hover:bg-[#3f4352] active:bg-[#3f4352]"
      >
        <IconBrandInstagram size={20} className="text-gray-40" />
      </a>
    </div>
  );
}
