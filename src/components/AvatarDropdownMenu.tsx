import AvatarMenuItem from './AvatarMenuItem';

export default function AvatarDropdownMenu() {
  function handleLogout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    location.href = '/';
  }

  return (
    <ul className="absolute -bottom-4 right-0 w-[8rem] translate-y-full rounded-xl bg-gray-00 py-1 shadow-[0_0_30px_0_rgba(0,0,0,0.15)]">
      <AvatarMenuItem href="/mypage/events">참여한 이벤트</AvatarMenuItem>
      <AvatarMenuItem href="/mypage/schedules">내 스케줄</AvatarMenuItem>
      <AvatarMenuItem href="/mypage/profile">프로필 정보</AvatarMenuItem>
      <AvatarMenuItem variant="danger" onClick={handleLogout}>
        로그아웃
      </AvatarMenuItem>
    </ul>
  );
}
