import AvatarMenuItem from './AvatarMenuItem';

export default function AvatarMenu() {
  function handleLogout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    location.href = '/';
  }

  return (
    <ul className="absolute -bottom-4 right-0 w-[7rem] translate-y-full rounded-xl bg-gray-00 py-1 shadow-[0_0_30px_0_rgba(0,0,0,0.15)]">
      <AvatarMenuItem href="/mypage">참여 이벤트</AvatarMenuItem>
      {/* <AvatarMenuItem href="/mypage">내 스케줄</AvatarMenuItem> */}
      <AvatarMenuItem href="/settings">프로필 정보</AvatarMenuItem>
      <AvatarMenuItem variant="danger" onClick={handleLogout}>
        로그아웃
      </AvatarMenuItem>
    </ul>
  );
}
