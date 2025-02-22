import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import LanguageDropdownMenu from './LanguageDropdownMenu/LanguageDropdownMenu';
import useDropdown from '@/hooks/useDropdown';
import { IconLanguage } from '@tabler/icons-react';

export default function LanguageDropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isDropdownMenuOpen, handleDropdownClick, setIsDropdownMenuOpen } =
    useDropdown({
      dropdownRef,
    });

  const { i18n } = useTranslation();

  function handleDropdownMenuItemClick(language: string) {
    i18n.changeLanguage(language);
    setIsDropdownMenuOpen(false);
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="flex items-center gap-1 rounded-lg bg-gray-70 px-3 py-2 text-gray-00 text-sm-200"
        onClick={handleDropdownClick}
      >
        <span>
          <IconLanguage size={20} />
        </span>
        <span>{i18n.language === 'ko' ? '한국어' : 'English'}</span>
      </button>
      {isDropdownMenuOpen && (
        <LanguageDropdownMenu onMenuItemClick={handleDropdownMenuItemClick} />
      )}
    </div>
  );
}
