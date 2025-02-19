import { Link } from 'react-router-dom';

import { IconChevronRight } from '@tabler/icons-react';

interface HeaderProps {
  hasMore?: boolean;
}

export default function Header({ hasMore = true }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3">
      <h2 className="text-gray-90 title-sm-300">내 스케줄</h2>
      {hasMore && (
        <Link to="/mypage/schedules" className="flex items-center text-gray-50">
          <span>더 보기</span>
          <span>
            <IconChevronRight />
          </span>
        </Link>
      )}
    </header>
  );
}
