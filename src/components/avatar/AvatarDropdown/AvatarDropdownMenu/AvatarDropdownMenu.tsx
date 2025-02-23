import { useTranslation } from 'react-i18next';

import MenuItem from './MenuItem/MenuItem';

interface AvatarDropdownMenuProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AvatarDropdownMenu({
  setIsMenuOpen,
}: AvatarDropdownMenuProps) {
  const { t } = useTranslation();

  function handleLogout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    location.href = '/';
    setIsMenuOpen(false);
  }

  function handleMenuItemClick() {
    setIsMenuOpen(false);
  }

  return (
    <ul className="absolute -bottom-4 right-0 w-[8.5rem] translate-y-full rounded-xl bg-gray-00 py-1 shadow-[0_0_30px_0_rgba(0,0,0,0.15)]">
      <MenuItem href="/mypage/events" onClick={handleMenuItemClick}>
        {t('navbar.allEvents')}
      </MenuItem>
      <MenuItem href="/mypage/schedules" onClick={handleMenuItemClick}>
        {t('navbar.mySchedule')}
      </MenuItem>
      <MenuItem href="/mypage/profile" onClick={handleMenuItemClick}>
        {t('navbar.profile')}
      </MenuItem>
      <MenuItem variant="danger" onClick={handleLogout}>
        {t('navbar.logout')}
      </MenuItem>
    </ul>
  );
}
