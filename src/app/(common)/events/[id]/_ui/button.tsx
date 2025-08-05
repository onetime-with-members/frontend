'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import { LoginAlert } from './alert';
import SharePopUp from './pop-up';
import SpeechBalloon from './speech-balloon';
import Button from '@/components/button';
import BadgeButton from '@/components/button/badge-button';
import EditIcon from '@/components/icon/EditIcon';
import { FooterContext } from '@/contexts/footer';
import {
  eventQueryOptions,
  scheduleDetailQueryOptions,
  schedulesQueryOptions,
} from '@/lib/api/query-options';
import { useAuth } from '@/lib/auth/auth.client';
import cn from '@/lib/cn';
import { defaultEvent, defaultScheduleDetail } from '@/lib/constants';
import { ScheduleType } from '@/lib/types';
import { useProgressRouter } from '@/navigation';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export function BottomButtonsForDesktop() {
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);

  const { isFooterShown } = useContext(FooterContext);

  const progressRouter = useProgressRouter();
  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');

  const { isLoggedIn } = useAuth();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });
  const { data: scheduleDetailData } = useQuery({
    ...scheduleDetailQueryOptions({ event: event || defaultEvent, isLoggedIn }),
  });
  const scheduleDetail = scheduleDetailData || defaultScheduleDetail;

  const hasUserSchedule = isLoggedIn
    ? scheduleDetail.schedules.length !== 0 &&
      scheduleDetail.schedules.every((schedule) => schedule.times.length !== 0)
    : false;

  async function handleBottomButtonClick() {
    if (isLoggedIn) {
      progressRouter.push(`/events/${params.id}/schedules/new`);
    } else {
      setIsLoginAlertOpen(true);
    }
  }

  function handleSendButtonClick() {
    setIsSharePopUpOpen(true);
  }

  return (
    <>
      {/* Bottom Button for Desktop */}
      <BadgeFloatingBottomButton
        name={hasUserSchedule ? t('editSchedule') : t('addSchedule')}
        variant="black"
        icon={hasUserSchedule ? 'edit' : 'plus'}
        onNewScheduleButtonClick={handleBottomButtonClick}
        onSendButtonClick={handleSendButtonClick}
        className={cn('hidden duration-150 md:flex', {
          'pointer-events-none opacity-0': isFooterShown,
        })}
      />

      {/* Alert and Pop Up */}
      {isLoginAlertOpen && <LoginAlert setIsOpen={setIsLoginAlertOpen} />}
      {isSharePopUpOpen && <SharePopUp setIsOpen={setIsSharePopUpOpen} />}
    </>
  );
}

export function BottomButtonForMobile({
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

export function BadgeFloatingBottomButton({
  onNewScheduleButtonClick,
  onSendButtonClick,
  name,
  className,
  variant = 'primary',
  icon,
  style,
}: {
  onNewScheduleButtonClick: () => void;
  onSendButtonClick: () => void;
  name: string;
  className?: string;
  variant?: 'primary' | 'black';
  icon: 'plus' | 'edit';
  style?: React.CSSProperties;
}) {
  return (
    <>
      <div
        className={cn(
          'fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center justify-center gap-4',
          className,
        )}
        style={style}
      >
        <SendButton onClick={onSendButtonClick} />
        <BadgeButton
          onClick={onNewScheduleButtonClick}
          variant={variant}
          icon={
            icon === 'plus' ? (
              <IconPlus size={24} />
            ) : (
              <EditIcon fontSize={24} />
            )
          }
        >
          {name}
        </BadgeButton>
      </div>
    </>
  );
}

function SendButton({ onClick }: { onClick: () => void }) {
  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');
  const locale = useLocale();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });
  const { data: schedules } = useQuery({
    ...schedulesQueryOptions(event || defaultEvent),
  });

  return (
    <SpeechBalloon.Container>
      <SpeechBalloon.Wrapper>
        <button
          type="button"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-80"
          onClick={onClick}
        >
          <Image
            src="/images/send.svg"
            alt="종이비행기 아이콘"
            width={36}
            height={36}
          />
        </button>
      </SpeechBalloon.Wrapper>
      {schedules?.length === 0 && (
        <SpeechBalloon.Main width={locale === 'ko' ? 101 : 111} offset={2}>
          {t('shareMessage')}
        </SpeechBalloon.Main>
      )}
    </SpeechBalloon.Container>
  );
}
