'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useContext, useRef, useState } from 'react';

import { EventDeleteAlert, LoginAlert } from './alert';
import DesktopContents from './desktop-contents';
import MobileContents from './mobile-contents';
import SharePopUp from './pop-up';
import SpeechBalloon from '@/app/(common)/events/[id]/speech-balloon';
import BarBanner from '@/components/bar-banner';
import BadgeFloatingBottomButton from '@/components/button/badge-floating-bottom-button';
import Button from '@/components/button/button';
import EditIcon from '@/components/icon/edit';
import TrashIcon from '@/components/icon/trash';
import NavBar from '@/components/nav-bar';
import TimeBlockBoardSkeleton from '@/components/skeleton/time-block-board-skeleton';
import ToolbarTitleSkeleton from '@/components/skeleton/toolbar-title-skeleton';
import TimeBlockBoard from '@/components/time-block-board/event';
import { BarBannerContext } from '@/contexts/bar-banner';
import { FooterContext } from '@/contexts/footer';
import ParticipantContextProvider from '@/contexts/participant';
import useDropdown from '@/hooks/useDropdown';
import useKakaoShare from '@/hooks/useKakaoShare';
import { auth } from '@/lib/auth';
import cn from '@/lib/cn';
import { useRouter } from '@/navigation';
import { useEventQuery } from '@/queries/event.queries';
import { useScheduleQuery } from '@/queries/schedule.queries';
import { IconDots, IconPlus } from '@tabler/icons-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function EventDetailScreen() {
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { isFooterShown } = useContext(FooterContext);
  const { isBarBannerShown } = useContext(BarBannerContext);

  const params = useParams<{ id: string }>();
  const router = useRouter();

  const t = useTranslations('eventDetail');
  const locale = useLocale();

  const { isPending: isEventPending, data: event } = useEventQuery(params.id);
  const { isPending: isSchedulePending, data: schedules } =
    useScheduleQuery(event);

  const { handleKakaoShare } = useKakaoShare({
    event,
  });

  async function handleBottomButtonClick() {
    if (await auth()) {
      router.push(`/events/${params.id}/schedules/new`);
    } else {
      setIsLoginAlertOpen(true);
    }
  }

  return (
    <ParticipantContextProvider schedules={schedules}>
      <div className="flex min-h-[110vh] flex-col">
        {/* Navigation Bar */}
        <NavBar variant="default" className="hidden md:flex" />
        <NavBar variant="black" className="flex md:hidden" shadow={false} />

        {/* Top Toolbar and Bar Banner */}
        <header
          className={cn('flex h-[59px] w-full justify-center md:h-[72px]', {
            'h-[115px] md:h-[128px]': isBarBannerShown,
          })}
        >
          <div className="fixed z-30 mx-auto w-full max-w-[calc(768px+2rem)] bg-gray-00 duration-150">
            {/* Top Toolbar */}
            <div className="bg-gray-80 px-6 py-4 md:rounded-t-3xl">
              <div className="flex items-center justify-between md:h-10">
                <h1 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-00 text-lg-300 md:title-sm-300">
                  {event ? event.title : <ToolbarTitleSkeleton />}
                </h1>
                {event && (
                  <>
                    <div className="flex items-center gap-2">
                      <SpeechBalloon.Container className="hidden md:block">
                        <SpeechBalloon.Wrapper>
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
                        </SpeechBalloon.Wrapper>
                        {schedules?.length === 0 && (
                          <SpeechBalloon.Main
                            width={locale === 'ko' ? 101 : 111}
                            offset={4}
                            position="bottom"
                          >
                            {t('shareMessage')}
                          </SpeechBalloon.Main>
                        )}
                      </SpeechBalloon.Container>
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
                      {event.event_status === 'CREATOR' && (
                        <ToolbarMenuDropdown
                          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Bar Banner */}
            <BarBanner
              className="h-[56px]"
              innnerClassName="fixed max-w-[calc(768px+2rem)] w-full"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto flex w-full max-w-[calc(768px+2rem)] flex-col gap-6 bg-gray-05 px-4 pb-16 pt-6 md:px-6">
          {/* Time Block Board */}
          <div className="flex gap-6">
            <div className="w-full md:w-[55%]">
              {isEventPending || isSchedulePending || !event || !schedules ? (
                <TimeBlockBoardSkeleton count={6} />
              ) : (
                <TimeBlockBoard
                  event={event}
                  schedules={schedules}
                  backgroundColor="white"
                  topContentClassName={cn(
                    'top-[123px] bg-gray-05 md:top-[136px]',
                    {
                      'top-[179px] md:top-[192px]': isBarBannerShown,
                    },
                  )}
                />
              )}
            </div>
            {/* Right Contents for Desktop */}
            <DesktopContents event={event} schedules={schedules} />
          </div>
          {/* Bottom Contents for Mobile */}
          <MobileContents
            event={event}
            schedules={schedules}
            isSchedulesPending={isSchedulePending}
          />
        </main>

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
      </div>

      {/* Pop Up and Alert */}
      {isSharePopUpOpen && event && (
        <SharePopUp setIsOpen={setIsSharePopUpOpen} />
      )}
      {isLoginAlertOpen && <LoginAlert setIsOpen={setIsLoginAlertOpen} />}
      {isDeleteAlertOpen && (
        <EventDeleteAlert setIsEventDeleteAlertOpen={setIsDeleteAlertOpen} />
      )}
    </ParticipantContextProvider>
  );
}

function ToolbarMenuDropdown({
  setIsDeleteAlertOpen,
}: {
  setIsDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isDropdownMenuOpen, setIsDropdownMenuOpen, handleDropdownClick } =
    useDropdown({
      dropdownRef,
    });

  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');
  const locale = useLocale();

  function handleDeleteMenuItemClick() {
    setIsDropdownMenuOpen(false);
    setIsDeleteAlertOpen(true);
  }

  return (
    <div
      className="relative flex items-center justify-center"
      ref={dropdownRef}
    >
      <ToolbarButton
        variant="gray"
        onClick={handleDropdownClick}
        className="hidden md:flex"
      >
        <IconDots size={28} />
      </ToolbarButton>
      <button className="text-gray-00 md:hidden" onClick={handleDropdownClick}>
        <IconDots size={28} />
      </button>
      {isDropdownMenuOpen && (
        <div
          className={cn(
            'absolute right-0 top-8 z-30 w-[6.5rem] overflow-hidden rounded-xl bg-gray-00 py-1 shadow-lg md:top-12',
            {
              'w-[5.5rem]': locale === 'ko',
            },
          )}
        >
          <ul className="flex flex-col">
            <ToolbarMenuItem
              name={t('edit')}
              icon="edit"
              variant="default"
              href={`/events/${params.id}/edit`}
            />
            <ToolbarMenuItem
              name={t('delete')}
              icon="delete"
              variant="danger"
              onClick={handleDeleteMenuItemClick}
            />
          </ul>
        </div>
      )}
    </div>
  );
}

function ToolbarMenuItem({
  name,
  icon,
  href = '#',
  variant = 'default',
  ...props
}: {
  name: string;
  icon: 'edit' | 'delete';
  href?: string;
  variant?: 'default' | 'danger';
} & React.HTMLAttributes<HTMLLIElement>) {
  const router = useRouter();

  function handleMenuItemClick() {
    router.push(href);
  }

  return (
    <li
      className={cn(
        'flex w-full cursor-pointer items-center gap-1 py-1.5 pl-4 pr-5 pt-2 text-gray-60 duration-150 text-md-200 first:pt-2 last:pb-2',
        {
          'text-danger-50': variant === 'danger',
        },
      )}
      onClick={handleMenuItemClick}
      {...props}
    >
      <span>
        {icon === 'edit' && <EditIcon size={20} fill="#757A95" />}
        {icon === 'delete' && (
          <TrashIcon size={20} fill="#E4678D" innerFill="#FFFFFF" />
        )}
      </span>
      <span>{name}</span>
    </li>
  );
}

function ToolbarButton({
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
