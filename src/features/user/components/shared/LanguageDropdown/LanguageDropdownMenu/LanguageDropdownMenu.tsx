import { useLocale } from 'next-intl';

import { CheckIcon } from '@/components/icon';
import { languages } from '@/constants';
import cn from '@/lib/cn';

export default function LanguageDropdownMenu({
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
              <CheckIcon />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
