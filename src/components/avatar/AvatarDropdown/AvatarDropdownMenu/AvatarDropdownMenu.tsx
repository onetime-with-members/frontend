import MenuItem from './MenuItem/MenuItem';

interface AvatarDropdownMenuProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AvatarDropdownMenu({
  setIsMenuOpen,
}: AvatarDropdownMenuProps) {
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
    <ul className="absolute -bottom-4 right-0 w-[8rem] translate-y-full rounded-xl bg-gray-00 py-1 shadow-[0_0_30px_0_rgba(0,0,0,0.15)]">
      <MenuItem href="/mypage/events" onClick={handleMenuItemClick}>
        참여한 이벤트
      </MenuItem>
      <MenuItem href="/mypage/schedules" onClick={handleMenuItemClick}>
        내 스케줄
      </MenuItem>
      <MenuItem href="/mypage/profile" onClick={handleMenuItemClick}>
        프로필 정보
      </MenuItem>
      <MenuItem variant="danger" onClick={handleLogout}>
        로그아웃
      </MenuItem>
    </ul>
  );
}
