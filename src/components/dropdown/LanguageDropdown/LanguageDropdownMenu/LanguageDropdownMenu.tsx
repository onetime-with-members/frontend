import { useTranslation } from 'react-i18next';

import LanguageDropdownMenuItem from './LanguageDropdownMenuItem/LanguageDropdownMenuItem';
import cn from '@/utils/cn';

interface LanguageDropdownMenuProps {
  onMenuItemClick: (language: 'en' | 'ko') => void;
  menuPosition: 'top' | 'bottom';
}

export default function LanguageDropdownMenu({
  onMenuItemClick,
  menuPosition,
}: LanguageDropdownMenuProps) {
  const { i18n } = useTranslation();

  return (
    <ul
      className={cn(
        'absolute flex w-[110px] flex-col gap-3 rounded-xl bg-gray-00 py-3 pl-5 pr-3 shadow-[0_4px_24px_0_rgba(0,0,0,0.15)]',
        {
          'top-[calc(100%+1rem)]': menuPosition === 'bottom',
          'bottom-[calc(100%+1rem)]': menuPosition === 'top',
        },
      )}
    >
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
