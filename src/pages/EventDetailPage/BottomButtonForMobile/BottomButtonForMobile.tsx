import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import SpeechBalloon from '../SpeechBalloon/SpeechBalloon';
import sendIcon from '@/assets/send.svg';
import Button from '@/components/button/Button/Button';
import { FooterContext } from '@/contexts/FooterContext';
import { useEventQuery } from '@/queries/event.queries';
import { useScheduleQuery } from '@/queries/schedule.queries';
import cn from '@/utils/cn';
import { IconPlus } from '@tabler/icons-react';

interface BottomButtonForMobileProps {
  handleFloatingButtonClick: () => void;
  handleShareButtonClick: () => void;
}

export default function BottomButtonForMobile({
  handleFloatingButtonClick,
  handleShareButtonClick,
}: BottomButtonForMobileProps) {
  const { isFooterShown } = useContext(FooterContext);

  const { t } = useTranslation();
  const params = useParams<{ eventId: string }>();

  const { data: event } = useEventQuery(params.eventId);
  const { data: schedules } = useScheduleQuery(event);

  return (
    <div
      className={cn(
        'fixed bottom-0 z-10 flex w-full items-center justify-center gap-2 bg-gray-00 p-4 duration-150 md:hidden',
        {
          'pointer-events-none opacity-0': isFooterShown,
        },
      )}
    >
      <SpeechBalloon.Container>
        <SpeechBalloon.Wrapper>
          <button
            className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-gray-80"
            onClick={handleShareButtonClick}
          >
            <img
              src={sendIcon}
              alt="공유 아이콘"
              className="h-[36px] w-[36px]"
            />
          </button>
        </SpeechBalloon.Wrapper>
        {schedules?.length === 0 && (
          <SpeechBalloon.Main width={101} offset={4}>
            공유해보세요!
          </SpeechBalloon.Main>
        )}
      </SpeechBalloon.Container>
      <Button
        onClick={handleFloatingButtonClick}
        variant="dark"
        className="flex-1"
      >
        <span className="flex items-center justify-center gap-1">
          <span>{t('eventDetail.addSchedule')}</span>
          <span>
            <IconPlus size={24} />
          </span>
        </span>
      </Button>
    </div>
  );
}
