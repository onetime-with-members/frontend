import { getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { useLocale } from 'next-intl';
import { useRef } from 'react';

import LanguageDropdownMenu from './LanguageDropdownMenu/LanguageDropdownMenu';
import useDropdown from '@/hooks/useDropdown';
import axios from '@/lib/axios';
import cn from '@/lib/cn';
import { useRouter } from '@/navigation';
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

  const locale = useLocale();
  const queryClient = useQueryClient();
  const router = useRouter();

  const isLoggedIn = getCookie('access-token');

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
    if (isLoggedIn) {
      editUserLanguage(language === 'ko' ? 'KOR' : 'ENG');
    }
    setIsDropdownMenuOpen(false);
    setCookie('locale', language, {
      expires: dayjs().add(1, 'year').toDate(),
    });
    dayjs.locale(language);
    router.refresh();
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className={cn(
          'flex items-center gap-1 rounded-lg bg-gray-10 px-3 py-2 text-gray-60 duration-150 text-sm-200 hover:bg-gray-15 active:bg-gray-15',
          {
            'bg-gray-70 text-gray-00 hover:bg-[#3f4352] active:bg-[#3f4352]':
              variant === 'dark',
            'bg-primary-40 text-gray-00': isDropdownMenuOpen,
          },
        )}
        onClick={handleDropdownClick}
      >
        <span>
          <IconLanguage size={20} />
        </span>
        <span>{locale === 'ko' ? '한국어' : 'English'}</span>
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
