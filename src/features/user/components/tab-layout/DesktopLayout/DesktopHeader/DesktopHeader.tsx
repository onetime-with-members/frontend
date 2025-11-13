import { useContext } from 'react';

import { PenIcon } from '@/components/icon';
import { MyPageTabContext } from '@/features/user/contexts/MyPageTabContext';
import { ProgressLink } from '@/navigation';

export default function DesktopHeader() {
  const { tabActive, pageTitle } = useContext(MyPageTabContext);

  return (
    <header className="sticky top-[64px] z-20 flex items-center justify-between bg-gray-00 py-2">
      <h1 className="text-[1.75rem] font-semibold">{pageTitle}</h1>
      {tabActive === 'schedules' && (
        <ProgressLink
          href="/mypage/schedule/edit"
          className="text-2xl text-gray-70"
        >
          <PenIcon />
        </ProgressLink>
      )}
    </header>
  );
}
