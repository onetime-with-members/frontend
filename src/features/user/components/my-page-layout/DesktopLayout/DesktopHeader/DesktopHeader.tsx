import { useContext } from 'react';

import { PenIcon } from '@/components/icon';
import useTopContentHeight from '@/features/event/hooks/useTopContentHeight';
import { toStickyStyle } from '@/features/event/utils';
import { MyPageTabContext } from '@/features/user/contexts/MyPageTabContext';
import cn from '@/lib/cn';
import { ProgressLink } from '@/navigation';

export default function DesktopHeader() {
  const { tabActive, pageTitle } = useContext(MyPageTabContext);

  const navBarHeight = useTopContentHeight(({ navBar }) => navBar);

  const { className: topClassName, style: topStyle } =
    toStickyStyle(navBarHeight);

  return (
    <header
      className={cn(
        'sticky z-20 flex items-center justify-between bg-gray-00 py-2',
        topClassName,
      )}
      style={topStyle}
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
