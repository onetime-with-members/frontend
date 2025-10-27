import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

import SpeechBalloon from '../../shared/SpeechBalloon';
import Button from '@/components/button';
import { ScheduleType } from '@/features/schedule/models';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import Image from 'next/image';

export default function BottomButtonForMobile({
  schedules,
  hasUserSchedule,
  onShareButtonClick,
  onEditButtonClick,
}: {
  schedules: ScheduleType[];
  hasUserSchedule: boolean;
  onShareButtonClick: () => void;
  onEditButtonClick: () => void;
}) {
  const t = useTranslations('eventDetail');
  const locale = useLocale();

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-[45] flex w-full items-center justify-center gap-2 bg-gray-00 p-4 md:hidden"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: { duration: 0.15 },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.15 },
      }}
    >
      <SpeechBalloon.Container>
        <SpeechBalloon.Wrapper>
          <button
            className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-gray-80 duration-150 hover:bg-gray-90 active:bg-gray-90"
            onClick={onShareButtonClick}
          >
            <Image
              src="/images/send.svg"
              alt="공유 아이콘"
              width={36}
              height={36}
            />
          </button>
        </SpeechBalloon.Wrapper>
        {schedules?.length === 0 && (
          <SpeechBalloon.Main
            width={locale === 'ko' ? 101 : 111}
            offset={4}
            tilt="right"
          >
            {t('shareMessage')}
          </SpeechBalloon.Main>
        )}
      </SpeechBalloon.Container>
      <Button onClick={onEditButtonClick} variant="dark" className="flex-1">
        <span className="flex items-center justify-center gap-1">
          <span>{hasUserSchedule ? t('editSchedule') : t('addSchedule')}</span>
          <span>
            {hasUserSchedule ? <IconEdit size={24} /> : <IconPlus size={24} />}
          </span>
        </span>
      </Button>
    </motion.div>
  );
}
