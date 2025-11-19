'use client';

import { Locale, useLocale } from 'next-intl';
import { useRef, useTransition } from 'react';

import LanguageDropdownMenu from './LanguageDropdownMenu';
import useDropdown from '@/hooks/useDropdown';
import { usePathname, useRouter } from '@/i18n/navigation';
import { editUserLanguageAction } from '@/lib/api/actions';
import { useAuth } from '@/lib/auth';
import cn from '@/lib/cn';
import { IconLanguage } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function LanguageDropdown({
  variant = 'default',
  menuPosition = 'bottom',
}: {
  variant?: 'default' | 'dark';
  menuPosition?: 'top' | 'bottom';
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();

  const { isLoggedIn } = useAuth();
  const { isDropdownMenuOpen, handleDropdownClick, setIsDropdownMenuOpen } =
    useDropdown({
      dropdownRef,
    });

  const { mutateAsync: editUserLanguage } = useMutation({
    mutationFn: editUserLanguageAction,
  });

  async function handleDropdownMenuItemClick(language: string) {
    if (isLoggedIn) await editUserLanguage(language === 'ko' ? 'KOR' : 'ENG');

    const nextLocale = language as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale: nextLocale },
      );
    });

    setIsDropdownMenuOpen(false);
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
