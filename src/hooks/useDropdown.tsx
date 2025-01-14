import { useEffect, useRef, useState } from 'react';

interface useDropdownProps {
  menuRef: React.RefObject<HTMLDivElement>;
}

export default function useDropdown({ menuRef }: useDropdownProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleDropdownClick() {
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

  return { isMenuOpen, setIsMenuOpen, handleDropdownClick };
}
