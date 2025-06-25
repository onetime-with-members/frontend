'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import Avatar from '../avatar';
import { signOut } from '@/lib/auth-action';
import cn from '@/lib/cn';
import { ProgressLink } from '@/navigation';

export default function AvatarDropdown({
  size = 40,
  name,
  imageUrl,
  disabled,
}: {
  size?: number;
  name: string;
  imageUrl?: string;
  disabled?: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  function handleAvatarClick() {
    if (disabled) return;
    setIsMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <Avatar
        name={name}
        size={size}
        imageUrl={imageUrl}
        onClick={handleAvatarClick}
        className={cn({
          'cursor-default': disabled,
        })}
      />
      {isMenuOpen && <AvatarDropdownMenu setIsMenuOpen={setIsMenuOpen} />}
    </div>
  );
}

function AvatarDropdownMenu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const t = useTranslations('navbar');

  const menuItems: {
    href: string;
    label: string;
    onClick: () => void;
    variant: 'default' | 'danger';
    progressBar: boolean;
  }[] = [
    {
      href: '/mypage/events',
      label: t('allEvents'),
      onClick: handleMenuItemClick,
      variant: 'default',
      progressBar: true,
    },
    {
      href: '/mypage/schedules',
      label: t('mySchedule'),
      onClick: handleMenuItemClick,
      variant: 'default',
      progressBar: true,
    },
    {
      href: '/mypage/profile',
      label: t('profile'),
      onClick: handleMenuItemClick,
      variant: 'default',
      progressBar: true,
    },
    {
      href: '#',
      label: t('logout'),
      onClick: handleLogout,
      variant: 'danger',
      progressBar: false,
    },
  ];

  async function handleLogout() {
    await signOut();
  }

  function handleMenuItemClick() {
    setIsMenuOpen(false);
  }

  return (
    <ul className="absolute -bottom-4 right-0 w-[8.5rem] translate-y-full rounded-xl bg-gray-00 py-1 shadow-[0_0_30px_0_rgba(0,0,0,0.15)]">
      {menuItems.map((menuItem) => (
        <li key={menuItem.href} onClick={menuItem.onClick}>
          <ProgressLink
            href={menuItem.href}
            className={cn(
              'block px-4 py-2 text-center text-gray-60 text-md-200',
              {
                'text-danger-50': menuItem.variant === 'danger',
              },
            )}
            progressBar={menuItem.progressBar}
          >
            {menuItem.label}
          </ProgressLink>
        </li>
      ))}
    </ul>
  );
}
