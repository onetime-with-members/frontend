import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BadgeFloatingBottomButton from '@/components/button/BadgeFloatingBottomButton';
import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard';
import { FooterContext } from '@/contexts/FooterContext';
import { MySchedule } from '@/types/schedule.type';
import cn from '@/utils/cn';

interface MyTimeBlockBoardContentProps {
  mySchedules: MySchedule[];
}

export default function MyTimeBlockBoardContent({
  mySchedules,
}: MyTimeBlockBoardContentProps) {
  const [desktopInnerContentWidth, setDesktopInnerContentWidth] = useState<
    number | undefined
  >(undefined);

  const { isFooterShown } = useContext(FooterContext);

  const desktopInnerContentRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  function handleEditButtonClick() {
    navigate('/mypage/schedules/edit');
  }

  useEffect(() => {
    function handleResize() {
      if (desktopInnerContentRef.current) {
        setDesktopInnerContentWidth(desktopInnerContentRef.current.clientWidth);
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [desktopInnerContentRef]);

  return (
    <div ref={desktopInnerContentRef}>
      <MyTimeBlockBoard
        mode="view"
        mySchedules={mySchedules}
        topDateGroupClassName="sticky z-10 bg-gray-00 top-[64px] md:top-[122px]"
      />
      {desktopInnerContentWidth !== undefined && (
        <BadgeFloatingBottomButton
          variant="black"
          name="스케줄 입력"
          onClick={handleEditButtonClick}
          className={cn('left-auto flex translate-x-0', {
            'pointer-events-none opacity-0 duration-150': isFooterShown,
          })}
          style={{
            width: desktopInnerContentWidth,
          }}
        />
      )}
    </div>
  );
}
