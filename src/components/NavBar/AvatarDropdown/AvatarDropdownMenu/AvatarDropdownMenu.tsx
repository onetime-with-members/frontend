import { useTranslations } from 'next-intl';

import { useAuth } from '@/lib/auth';
import cn from '@/lib/cn';
import { ProgressLink } from '@/navigation';

export default function AvatarDropdownMenu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const t = useTranslations('navbar');

  const { signOut } = useAuth();

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
      onClick: signOut,
      variant: 'danger',
      progressBar: false,
    },
  ];

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
