import logoWhite from '../assets/logo-white.svg';
import { IconBrandInstagram } from '@tabler/icons-react';

export default function Footer() {
  return (
    <footer className="bg-gray-80 px-4 pb-10 pt-8">
      <div className="mx-auto flex max-w-screen-sm flex-col gap-2">
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
        <p className="text-gray-20 text-sm-100">
          ©OneTime. ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
}
