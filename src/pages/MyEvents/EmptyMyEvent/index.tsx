import { Link } from 'react-router-dom';

import { IconPlus } from '@tabler/icons-react';

export default function EmptyMyEvent() {
  return (
    <div className="flex h-full translate-y-14 flex-col items-center justify-center gap-8 md:translate-y-0 md:py-10">
      <div className="text-gray-90 text-lg-200">참여한 이벤트가 없습니다.</div>
      <Link
        to="/events/new"
        className="flex items-center gap-1 rounded-full bg-primary-40 px-6 py-3 text-gray-00"
      >
        <span className="text-md-200">이벤트 추가하기</span>
        <span>
          <IconPlus size={20} />
        </span>
      </Link>
    </div>
  );
}
