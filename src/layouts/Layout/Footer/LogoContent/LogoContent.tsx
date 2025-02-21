import logoWhite from '@/assets/logo-white.svg';
import { IconBrandInstagram } from '@tabler/icons-react';

export default function LogoContent() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <img src={logoWhite} alt="원타임 로고" />
      </div>
      <a
        href="https://www.instagram.com/one.time.official/"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-gray-70 p-2"
      >
        <IconBrandInstagram size={20} className="text-gray-40" />
      </a>
    </div>
  );
}
