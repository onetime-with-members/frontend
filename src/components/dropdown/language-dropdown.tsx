'use client';

import { setCookie } from 'cookies-next';
import { useLocale } from 'next-intl';
import { useRef } from 'react';

import CheckIcon from '@/components/icon/check';
import useDropdown from '@/hooks/useDropdown';
import { editUserLanguage } from '@/lib/actions';
import { auth } from '@/lib/auth';
import cn from '@/lib/cn';
import dayjs from '@/lib/dayjs';
import { IconLanguage } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const languages: { key: 'ko' | 'en'; label: string }[] = [
  { key: 'ko', label: '한국어' },
  { key: 'en', label: 'English' },
];

export default function LanguageDropdown({
  variant = 'default',
  menuPosition = 'bottom',
}: {
  variant?: 'default' | 'dark';
  menuPosition?: 'top' | 'bottom';
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isDropdownMenuOpen, handleDropdownClick, setIsDropdownMenuOpen } =
    useDropdown({
      dropdownRef,
    });

  const locale = useLocale();
  const router = useRouter();

  async function handleDropdownMenuItemClick(language: string) {
    if (await auth()) {
      const formData = new FormData();
      formData.set('language', language === 'ko' ? 'KOR' : 'ENG');
      await editUserLanguage(formData);
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

function LanguageDropdownMenu({
  onMenuItemClick,
  menuPosition,
}: {
  onMenuItemClick: (language: 'en' | 'ko') => void;
  menuPosition: 'top' | 'bottom';
}) {
  const locale = useLocale();

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
      {languages.map((language) => (
        <li
          key={language.key}
          className={cn(
            'flex cursor-pointer items-center justify-between text-gray-50 text-md-200',
            {
              'text-primary-40 text-md-300': locale === language.key,
            },
          )}
          onClick={() => onMenuItemClick(language.key)}
        >
          <span>{language.label}</span>
          {locale === language.key && (
            <span>
              <CheckIcon size={16} fill="#677CEE" />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
