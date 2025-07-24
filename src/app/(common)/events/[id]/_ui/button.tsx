'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import { EventDeleteAlert, LoginAlert } from './alert';
import SharePopUp from './pop-up';
import SpeechBalloon from './speech-balloon';
import Button from '@/components/button';
import BadgeButton from '@/components/button/badge-button';
import EditIcon from '@/components/icon/edit';
import TrashIcon from '@/components/icon/trash';
import { FooterContext } from '@/contexts/footer';
import {
  eventQueryOptions,
  eventWithAuthQueryOptions,
  scheduleDetailQueryOptions,
  schedulesQueryOptions,
} from '@/lib/api/query-options';
import { useAuth } from '@/lib/auth/auth.client';
import cn from '@/lib/cn';
import { defaultEvent, defaultScheduleDetail } from '@/lib/constants';
import { useProgressRouter } from '@/navigation';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export function BottomButtons() {
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);

  const { isFooterShown } = useContext(FooterContext);

  const progressRouter = useProgressRouter();
  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');
  const locale = useLocale();

  const { isLoggedIn } = useAuth();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });
  const { data: schedules } = useQuery({
    ...schedulesQueryOptions(event || defaultEvent),
  });
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

  return (
    <>
      {/* Bottom Button for Mobile */}
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
              className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-gray-80 duration-150 hover:bg-gray-90 active:bg-gray-90"
              onClick={() => setIsSharePopUpOpen(true)}
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
        <Button
          onClick={handleBottomButtonClick}
          variant="dark"
          className="flex-1"
        >
          <span className="flex items-center justify-center gap-1">
            <span>
              {hasUserSchedule ? t('editSchedule') : t('addSchedule')}
            </span>
            <span>
              {hasUserSchedule ? (
                <IconEdit size={24} />
              ) : (
                <IconPlus size={24} />
              )}
            </span>
          </span>
        </Button>
      </div>
      {/* Bottom Button for Desktop */}
      <BadgeFloatingBottomButton
        name={hasUserSchedule ? t('editSchedule') : t('addSchedule')}
        variant="black"
        icon={hasUserSchedule ? 'edit' : 'plus'}
        onClick={handleBottomButtonClick}
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

export function ToolbarButtons() {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const params = useParams<{ id: string }>();
  const progressRouter = useProgressRouter();

  const { data: event } = useQuery({
    ...eventWithAuthQueryOptions(params.id),
  });

  return (
    event?.event_status === 'CREATOR' && (
      <>
        <div className="flex items-center gap-2">
          <ToolbarButton
            onClick={() => progressRouter.push(`/events/${params.id}/edit`)}
          >
            <EditIcon fill="#FFFFFF" size={25} />
          </ToolbarButton>
          <ToolbarButton onClick={() => setIsDeleteAlertOpen(true)}>
            <TrashIcon fill="#FFFFFF" innerFill="#474A5C" size={25} />
          </ToolbarButton>
        </div>
        {isDeleteAlertOpen && (
          <EventDeleteAlert setIsEventDeleteAlertOpen={setIsDeleteAlertOpen} />
        )}
      </>
    )
  );
}

export function ToolbarButton({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-70 p-1.5 text-gray-00',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function BadgeFloatingBottomButton({
  onClick,
  name,
  className,
  variant = 'primary',
  icon,
  style,
}: {
  onClick: () => void;
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
        <SendButton />
        <BadgeButton
          onClick={onClick}
          variant={variant}
          icon={
            icon === 'plus' ? (
              <IconPlus size={24} />
            ) : (
              <EditIcon size={20} fill="#FFFFFF" />
            )
          }
        >
          {name}
        </BadgeButton>
      </div>
    </>
  );
}

function SendButton() {
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
