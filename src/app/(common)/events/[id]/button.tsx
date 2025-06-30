'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import { LoginAlert } from './alert';
import { ToolbarMenuDropdown } from './dropdown';
import SharePopUp from './pop-up';
import SpeechBalloon from './speech-balloon';
import Button from '@/components/button';
import BadgeButton from '@/components/button/badge-button';
import { FooterContext } from '@/contexts/footer';
import useKakaoShare from '@/hooks/useKakaoShare';
import { useAuth } from '@/lib/api/auth.client';
import {
  eventQueryOptions,
  scheduleDetailQueryOptions,
  schedulesQueryOptions,
} from '@/lib/api/query-options';
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
            <SpeechBalloon.Main width={locale === 'ko' ? 101 : 111} offset={4}>
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
        className={cn('hidden duration-150 md:block', {
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
  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');
  const locale = useLocale();

  const { data: event } = useQuery({
    ...eventQueryOptions(params.id),
    queryKey: [...eventQueryOptions(params.id).queryKey, '_user'],
  });

  return (
    <div className="flex items-center gap-2">
      <SpeechBalloon.Container className="hidden md:block">
        <SpeechBalloon.Wrapper>
          <SendButton />
        </SpeechBalloon.Wrapper>
        <SpeechBalloon.Main
          width={locale === 'ko' ? 101 : 111}
          offset={4}
          position="bottom"
        >
          {t('shareMessage')}
        </SpeechBalloon.Main>
      </SpeechBalloon.Container>
      <ShareKakaoButton />
      {event?.event_status === 'CREATOR' && <ToolbarMenuDropdown />}
    </div>
  );
}

export function SendButton() {
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);

  return (
    <>
      {/* Button */}
      <ToolbarButton
        variant="primary"
        onClick={() => setIsSharePopUpOpen(true)}
        className="hidden md:flex"
      >
        <Image
          src="/images/send.svg"
          alt="보내기 아이콘"
          width={28}
          height={28}
        />
      </ToolbarButton>

      {/*  Pop Up */}
      {isSharePopUpOpen && <SharePopUp setIsOpen={setIsSharePopUpOpen} />}
    </>
  );
}

export function ShareKakaoButton() {
  const params = useParams<{ id: string }>();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });

  const { handleKakaoShare } = useKakaoShare({
    event,
  });

  return (
    <ToolbarButton
      variant="yellow"
      onClick={handleKakaoShare}
      className="hidden md:flex"
    >
      <Image
        src="/images/kakao-icon.svg"
        alt="카카오톡 아이콘"
        width={28}
        height={28}
      />
    </ToolbarButton>
  );
}

export function ToolbarButton({
  className,
  children,
  variant = 'primary',
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'yellow' | 'gray';
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary-40 p-1.5 text-gray-00',
        {
          'bg-[#FAE100]': variant === 'yellow',
          'bg-gray-50': variant === 'gray',
        },
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
          'fixed bottom-8 left-1/2 flex -translate-x-1/2 justify-center',
          className,
        )}
        style={style}
      >
        <BadgeButton onClick={onClick} variant={variant}>
          <span className="flex items-center justify-center gap-1">
            <span>{name}</span>
            <span>
              {icon === 'plus' ? (
                <IconPlus size={24} />
              ) : (
                <IconEdit size={24} />
              )}
            </span>
          </span>
        </BadgeButton>
      </div>
    </>
  );
}
