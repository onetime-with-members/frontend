import AvatarMenuItem from './AvatarMenuItem';

interface AvatarMenuItemProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AvatarDropdownMenu({
  setIsMenuOpen,
}: AvatarMenuItemProps) {
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
      <AvatarMenuItem href="/mypage/events" onClick={handleMenuItemClick}>
        참여한 이벤트
      </AvatarMenuItem>
      <AvatarMenuItem href="/mypage/schedules" onClick={handleMenuItemClick}>
        내 스케줄
      </AvatarMenuItem>
      <AvatarMenuItem href="/mypage/profile" onClick={handleMenuItemClick}>
        마이페이지
      </AvatarMenuItem>
      <AvatarMenuItem variant="danger" onClick={handleLogout}>
        로그아웃
      </AvatarMenuItem>
    </ul>
  );
}
