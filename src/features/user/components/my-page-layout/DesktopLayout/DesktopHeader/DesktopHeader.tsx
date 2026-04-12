import { useContext } from 'react';

import { PenIcon } from '@/components/icon';
import useTopContentHeight from '@/features/event/hooks/useTopContentHeight';
import { MyPageTabContext } from '@/features/user/contexts/MyPageTabContext';
import { ProgressLink } from '@/navigation';

export default function DesktopHeader() {
  const { tabActive, pageTitle } = useContext(MyPageTabContext);

  const navBarHeight = useTopContentHeight(({ navBar }) => navBar);

  return (
    <header
      className="sticky z-20 flex items-center justify-between bg-gray-00 py-2"
      style={{
        top: navBarHeight,
      }}
    >
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
