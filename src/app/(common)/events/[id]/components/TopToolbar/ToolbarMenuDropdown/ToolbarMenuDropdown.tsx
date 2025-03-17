import { useLocale, useTranslations } from 'next-intl';
import { useRef } from 'react';

import ToolbarButton from '../ToolbarButton/ToolbarButton';
import ToolbarMenuItem from './ToolbarMenuItem/ToolbarMenuItem';
import useDropdown from '@/hooks/useDropdown';
import cn from '@/utils/cn';
import { IconDots } from '@tabler/icons-react';
import { useParams } from 'next/navigation';

interface ToolbarMenuDropdownProps {
  setIsDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ToolbarMenuDropdown({
  setIsDeleteAlertOpen,
}: ToolbarMenuDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isDropdownMenuOpen, setIsDropdownMenuOpen, handleDropdownClick } =
    useDropdown({
      dropdownRef,
    });

  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');
  const locale = useLocale();

  function handleDeleteMenuItemClick() {
    setIsDropdownMenuOpen(false);
    setIsDeleteAlertOpen(true);
  }

  return (
    <div
      className="relative flex items-center justify-center"
      ref={dropdownRef}
    >
      <ToolbarButton
        variant="gray"
        onClick={handleDropdownClick}
        className="hidden md:flex"
      >
        <IconDots size={28} />
      </ToolbarButton>
      <button className="text-gray-00 md:hidden" onClick={handleDropdownClick}>
        <IconDots size={28} />
      </button>
      {isDropdownMenuOpen && (
        <div
          className={cn(
            'absolute right-0 top-8 z-30 w-[6.5rem] overflow-hidden rounded-xl bg-gray-00 py-1 shadow-lg md:top-12',
            {
              'w-[5.5rem]': locale === 'ko',
            },
          )}
        >
          <ul className="flex flex-col">
            <ToolbarMenuItem
              name={t('edit')}
              icon="edit"
              variant="default"
              href={`/events/${params.id}/edit`}
            />
            <ToolbarMenuItem
              name={t('delete')}
              icon="delete"
              variant="danger"
              onClick={handleDeleteMenuItemClick}
            />
          </ul>
        </div>
      )}
    </div>
  );
}
