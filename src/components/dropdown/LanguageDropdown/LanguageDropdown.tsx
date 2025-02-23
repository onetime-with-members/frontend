import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import LanguageDropdownMenu from './LanguageDropdownMenu/LanguageDropdownMenu';
import useDropdown from '@/hooks/useDropdown';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { IconLanguage } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LanguageDropdownProps {
  variant?: 'default' | 'dark';
  menuPosition?: 'top' | 'bottom';
}

export default function LanguageDropdown({
  variant = 'default',
  menuPosition = 'bottom',
}: LanguageDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isDropdownMenuOpen, handleDropdownClick, setIsDropdownMenuOpen } =
    useDropdown({
      dropdownRef,
    });

  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const isLoggedIn = localStorage.getItem('access-token') !== null;

  const { mutate: editUserLanguage } = useMutation({
    mutationFn: async (language: string) => {
      const res = await axios.patch('/users/profile/action-update', {
        language,
      });
      return res.data.payload;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  function handleDropdownMenuItemClick(language: string) {
    i18n.changeLanguage(language);
    if (isLoggedIn) {
      editUserLanguage(language === 'ko' ? 'KOR' : 'ENG');
    }
    setIsDropdownMenuOpen(false);
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className={cn(
          'flex items-center gap-1 rounded-lg bg-gray-10 px-3 py-2 text-gray-60 text-sm-200',
          {
            'bg-gray-70 text-gray-00': variant === 'dark',
            'bg-primary-40 text-gray-00': isDropdownMenuOpen,
          },
        )}
        onClick={handleDropdownClick}
      >
        <span>
          <IconLanguage size={20} />
        </span>
        <span>{i18n.language === 'ko' ? '한국어' : 'English'}</span>
      </button>
      {isDropdownMenuOpen && (
        <LanguageDropdownMenu
          onMenuItemClick={handleDropdownMenuItemClick}
          menuPosition={menuPosition}
        />
      )}
    </div>
  );
}
