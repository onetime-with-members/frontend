import { useEffect, useState } from 'react';

interface useDropdownProps {
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export default function useDropdown({ dropdownRef }: useDropdownProps) {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  function handleDropdownClick() {
    setIsDropdownMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleDropdownOutSideClick(e: MouseEvent) {
      if (
        dropdownRef?.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownMenuOpen(false);
      }
    }

    document.addEventListener('click', handleDropdownOutSideClick);

    return () => {
      document.removeEventListener('click', handleDropdownOutSideClick);
    };
  }, [dropdownRef]);

  return {
    isDropdownMenuOpen,
    setIsDropdownMenuOpen,
    handleDropdownClick,
  };
}
