import { useEffect, useRef, useState } from 'react';

import AvatarMenu from './AvatarMenu';

interface AvatarProps {
  size?: number;
  name: string;
  imageUrl?: string;
}

export default function Avatar({ size = 40, name, imageUrl }: AvatarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  function handleAvatarClick() {
    setIsMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="flex cursor-pointer items-center justify-center rounded-full bg-primary-50 text-gray-00 title-sm-300"
        style={{
          width: size,
          height: size,
          fontSize: size / 2,
        }}
        onClick={handleAvatarClick}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={name} />
        ) : (
          <span>{name.slice(0, 1)}</span>
        )}
      </div>
      {isMenuOpen && <AvatarMenu />}
    </div>
  );
}
