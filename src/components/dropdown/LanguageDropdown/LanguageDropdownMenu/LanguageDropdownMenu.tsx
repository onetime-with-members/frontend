import { useTranslation } from 'react-i18next';

import LanguageDropdownMenuItem from './LanguageDropdownMenuItem/LanguageDropdownMenuItem';

interface LanguageDropdownMenuProps {
  onMenuItemClick: (language: 'en' | 'ko') => void;
}

export default function LanguageDropdownMenu({
  onMenuItemClick,
}: LanguageDropdownMenuProps) {
  const { i18n } = useTranslation();

  return (
    <ul className="absolute bottom-[calc(100%+1rem)] flex w-[110px] flex-col gap-3 rounded-xl bg-gray-00 py-3 pl-5 pr-3">
      <LanguageDropdownMenuItem
        active={i18n.language === 'ko'}
        onClick={() => onMenuItemClick('ko')}
      >
        한국어
      </LanguageDropdownMenuItem>
      <LanguageDropdownMenuItem
        active={i18n.language === 'en'}
        onClick={() => onMenuItemClick('en')}
      >
        English
      </LanguageDropdownMenuItem>
    </ul>
  );
}
