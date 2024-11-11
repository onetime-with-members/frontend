import { useEffect, useRef, useState } from 'react';

import Avatar from './Avatar';
import AvatarDropdownMenu from './AvatarDropdownMenu';

interface AvatarProps {
  size?: number;
  name: string;
  imageUrl?: string;
}

export default function AvatarDropdown({
  size = 40,
  name,
  imageUrl,
}: AvatarProps) {
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
      <Avatar
        name={name}
        size={size}
        imageUrl={imageUrl}
        onClick={handleAvatarClick}
      />
      {isMenuOpen && <AvatarDropdownMenu />}
    </div>
  );
}
