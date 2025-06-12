'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import { LoginAlert } from './alert';
import { ToolbarMenuDropdown } from './dropdown';
import SharePopUp from './pop-up';
import SpeechBalloon from './speech-balloon';
import BadgeFloatingBottomButton from '@/components/button/badge-floating-bottom-button';
import Button from '@/components/button/button';
import { FooterContext } from '@/contexts/footer';
import useKakaoShare from '@/hooks/useKakaoShare';
import { auth } from '@/lib/auth';
import cn from '@/lib/cn';
import { EventType, ScheduleType } from '@/lib/types';
import { IconPlus } from '@tabler/icons-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

export function BottomButtons({ schedules }: { schedules: ScheduleType[] }) {
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);

  const { isFooterShown } = useContext(FooterContext);

  const router = useRouter();
  const params = useParams<{ id: string }>();

  const t = useTranslations('eventDetail');
  const locale = useLocale();

  async function handleBottomButtonClick() {
    if (await auth()) {
      router.push(`/events/${params.id}/schedules/new`);
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
            <span>{t('addSchedule')}</span>
            <span>
              <IconPlus size={24} />
            </span>
          </span>
        </Button>
      </div>
      {/* Bottom Button for Desktop */}
      <BadgeFloatingBottomButton
        name={t('addSchedule')}
        variant="black"
        onClick={handleBottomButtonClick}
        className={cn('hidden duration-150 md:block', {
          'pointer-events-none opacity-0': isFooterShown,
        })}
      />

      {/* Alert and Pop Up */}
      {isLoginAlertOpen && <LoginAlert setIsOpen={setIsLoginAlertOpen} />}
      {isSharePopUpOpen && event && (
        <SharePopUp setIsOpen={setIsSharePopUpOpen} />
      )}
    </>
  );
}

export function ToolbarButtons({ event }: { event: EventType }) {
  const t = useTranslations('eventDetail');
  const locale = useLocale();

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
      <ShareKakaoButton event={event} />
      {event.event_status === 'CREATOR' && <ToolbarMenuDropdown />}
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

export function ShareKakaoButton({ event }: { event: EventType }) {
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
