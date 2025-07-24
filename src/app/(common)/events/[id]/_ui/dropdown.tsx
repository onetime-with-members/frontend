'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { EventDeleteAlert } from './alert';
import { ToolbarButton } from './button';
import EditIcon from '@/components/icon/edit';
import TrashIcon from '@/components/icon/trash';
import useDropdown from '@/hooks/useDropdown';
import cn from '@/lib/cn';
import { useProgressRouter } from '@/navigation';
import { IconDots } from '@tabler/icons-react';
import { useParams } from 'next/navigation';

export function ToolbarMenuDropdown() {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

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
    <>
      <div
        className="relative flex items-center justify-center"
        ref={dropdownRef}
      >
        <ToolbarButton onClick={handleDropdownClick} className="hidden md:flex">
          <IconDots size={28} />
        </ToolbarButton>
        <button
          className="text-gray-00 md:hidden"
          onClick={handleDropdownClick}
        >
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

      {isDeleteAlertOpen && (
        <EventDeleteAlert setIsEventDeleteAlertOpen={setIsDeleteAlertOpen} />
      )}
    </>
  );
}

function ToolbarMenuItem({
  name,
  icon,
  href = '#',
  variant = 'default',
  ...props
}: {
  name: string;
  icon: 'edit' | 'delete';
  href?: string;
  variant?: 'default' | 'danger';
} & React.HTMLAttributes<HTMLLIElement>) {
  const progressRouter = useProgressRouter();

  function handleMenuItemClick() {
    progressRouter.push(href);
  }

  return (
    <li
      className={cn(
        'flex w-full cursor-pointer items-center gap-1 py-1.5 pl-4 pr-5 pt-2 text-gray-60 duration-150 text-md-200 first:pt-2 last:pb-2',
        {
          'text-danger-50': variant === 'danger',
        },
      )}
      onClick={handleMenuItemClick}
      {...props}
    >
      <span>
        {icon === 'edit' && <EditIcon size={20} fill="#757A95" />}
        {icon === 'delete' && (
          <TrashIcon size={20} fill="#E4678D" innerFill="#FFFFFF" />
        )}
      </span>
      <span>{name}</span>
    </li>
  );
}
