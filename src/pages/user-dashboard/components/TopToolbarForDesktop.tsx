import { Link } from 'react-router-dom';

import { User } from '../../../types/user.type';

interface TopToolbarForDesktopProps {
  user: User;
}

export default function TopToolbarForDesktop({
  user,
}: TopToolbarForDesktopProps) {
  return (
    <div className="hidden rounded-t-3xl bg-gray-80 px-6 py-4 text-gray-00 md:block">
      <div className="mx-auto flex w-full max-w-screen-md items-center justify-between gap-2">
        <h1 className="flex-1 title-lg-300">안녕하세요, {user.nickname}님</h1>
        <Link
          to="/events/new"
          className="hidden rounded-xl bg-primary-50 px-4 py-2 text-gray-00 lg:flex"
        >
          이벤트 생성하기
        </Link>
      </div>
    </div>
  );
}
