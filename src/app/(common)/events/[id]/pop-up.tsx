'use client';

import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import ClockPattern from '@/components/clock-pattern';
import Input from '@/components/input';
import MemberBadge from '@/components/member-badge';
import useKakaoShare from '@/hooks/useKakaoShare';
import useToast from '@/hooks/useToast';
import axios from '@/lib/axios';
import cn from '@/lib/cn';
import { weekdaysShortKo } from '@/lib/constants';
import {
  useEventQuery,
  useRecommendedTimesQuery,
} from '@/queries/event.queries';
import {
  IconChevronDown,
  IconChevronUp,
  IconDots,
  IconLink,
  IconQrcode,
  IconX,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function SharePopUp({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isQrCodeScreenOpen, setIsQrCodeScreenOpen] = useState(false);

  const urlInputRef = useRef<HTMLInputElement>(null);

  const toast = useToast();

  const params = useParams<{ id: string }>();
  const t = useTranslations('sharePopUp');
  const tToast = useTranslations('toast');

  const { data: event } = useEventQuery(params.id);

  function handleCopyLink() {
    navigator.clipboard.writeText(event?.shortenUrl || '');
    if (urlInputRef.current) {
      urlInputRef.current.select();
    }
    toast(tToast('copiedLink'));
  }

  return (
    <>
      <div
        className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-4"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="flex w-full max-w-[35rem] cursor-auto flex-col overflow-hidden rounded-2xl bg-gray-00"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 pb-3 pt-4">
            <h2 className="text-gray-80 text-lg-300">{t('share')}</h2>
            <button className="text-gray-40" onClick={() => setIsOpen(false)}>
              <IconX size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-6 px-5 pb-8 pt-4">
            <div className="flex flex-col gap-3">
              <Input
                inputRef={urlInputRef}
                value={event?.shortenUrl || 'Loading...'}
                className="overflow-hidden text-sm-100"
                inputClassName="pr-0"
                inputMode="none"
                readOnly
              />
            </div>
            <div className="flex items-center justify-center gap-4 xs:gap-6 sm:gap-8">
              <ShareButtonWrapper label={t('copyLink')}>
                <ShareBlueButton onClick={handleCopyLink}>
                  <IconLink size={24} />
                </ShareBlueButton>
              </ShareButtonWrapper>
              <ShareButtonWrapper label={t('qrCode')}>
                <ShareBlueButton onClick={() => setIsQrCodeScreenOpen(true)}>
                  <IconQrcode size={24} />
                </ShareBlueButton>
              </ShareButtonWrapper>
              <ShareButtonWrapper label={t('kakao')}>
                <ShareKakaoButton />
              </ShareButtonWrapper>
              <ShareButtonWrapper label={t('more')}>
                <ShareMoreButton />
              </ShareButtonWrapper>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isQrCodeScreenOpen && (
          <QRCodeScreen onClose={() => setIsQrCodeScreenOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export function ShareButtonWrapper({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {children}
      <span className="whitespace-nowrap text-gray-30 text-sm-200">
        {label}
      </span>
    </div>
  );
}

export function ShareBlueButton({
  className,
  children,
  ...rest
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'rounded-full bg-primary-00 p-3 text-primary-40',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ShareKakaoButton({ size = 48 }: { size?: number }) {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  const { handleKakaoShare } = useKakaoShare({
    event,
  });

  return (
    <button
      className={cn(
        'overflow-hidden rounded-full bg-[#FFE80F] p-1.5 text-primary-40',
      )}
      onClick={handleKakaoShare}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/kakao-icon.svg"
        alt="카카오톡 아이콘"
        width={36}
        height={36}
      />
    </button>
  );
}

export function ShareMoreButton() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  function handleClick() {
    const shareData = {
      title: `${event?.title} - OneTime`,
      text: '스케줄 등록 요청이 도착했습니다.',
      url: event?.shortenUrl,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      alert('이 기능을 지원하지 않는 브라우저입니다.');
    }
  }

  return (
    <button
      className="rounded-full bg-gray-10 p-3 text-gray-40"
      onClick={handleClick}
    >
      <IconDots size={24} />
    </button>
  );
}

export function QRCodeScreen({ onClose }: { onClose?: () => void }) {
  const params = useParams<{ id: string }>();
  const t = useTranslations('sharePopUp');

  const { data: event } = useEventQuery(params.id);
  const { data: qrData, isLoading: isQrLoading } = useQuery({
    queryKey: ['events', 'qr', params.id],
    queryFn: async () => {
      const res = await axios.get(`/events/qr/${params.id}`);
      return res.data;
    },
  });

  const qr = qrData?.payload;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (isQrLoading) {
    return <></>;
  }

  return (
    <motion.div
      initial={{ transform: 'translateY(100%)' }}
      animate={{ transform: 'translateY(0)' }}
      exit={{ transform: 'translateY(100%)' }}
      className="fixed left-0 top-0 z-50 flex h-full w-full flex-col overflow-hidden bg-gray-00"
      style={{
        background: 'linear-gradient(180deg, #8898F2 0%, #4C65E5 100%)',
      }}
    >
      <div className="absolute z-50 flex h-full w-full flex-col">
        <header className="absolute flex w-full items-center justify-end px-5 py-4">
          <button className="text-gray-00" onClick={onClose}>
            <IconX size={24} />
          </button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            <div className="w-[12rem] sm:w-[15rem]">
              <Image
                src="/images/logo-white.svg"
                alt="OneTime 로고"
                className="h-full w-full object-cover"
                width={192}
                height={41}
              />
            </div>
            <div className="h-[230px] w-[230px] overflow-hidden rounded-3xl bg-gray-00 sm:h-[280px] sm:w-[280px]">
              <Image
                src={qr.qr_code_img_url}
                alt="QR 코드 이미지"
                className="h-full w-full object-cover"
                width={230}
                height={230}
              />
            </div>
            <p className="text-center text-primary-10 title-sm-300">
              {t.rich('qrCodeScreen', {
                eventName: event?.title,
                br: () => <br />,
                Name: (children) => (
                  <span className="text-primary-00">{children}</span>
                ),
              })}
            </p>
          </div>
        </div>
      </div>
      <ClockPattern className="opacity-50" />
    </motion.div>
  );
}

export function ParticipantsPopUp({
  onClose,
  participants,
}: {
  onClose: () => void;
  participants: string[];
}) {
  const t = useTranslations('eventDetail');

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[30rem] min-h-[131px] w-[23rem] cursor-auto overflow-y-auto rounded-2xl bg-gray-00 px-5 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="text-gray-80 text-lg-300">
              {t('peopleWhoAddedSchedules', {
                count: participants.length,
              })}
            </h2>
            <span className="text-primary-50 text-lg-300">
              {participants.length}
            </span>
          </div>
          <button className="cursor-pointer text-gray-40" onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-3">
          {participants.map((participant, index) => (
            <MemberBadge key={index}>{participant}</MemberBadge>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RecommendTimePopUp({ onClose }: { onClose: () => void }) {
  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');

  const { data: event } = useEventQuery(params.id);
  const { data: recommendTimes } = useRecommendedTimesQuery(params.id);

  const formattedRecommendTimes = recommendTimes
    ? [
        ...new Set(
          recommendTimes.map(
            (recommendSchedule) => recommendSchedule.time_point,
          ),
        ),
      ].map((timePoint) => ({
        timePoint,
        schedules: recommendTimes.filter(
          (recommendTime) => recommendTime.time_point === timePoint,
        ),
      }))
    : [];

  const style = {
    dateTitle: 'text-lg-300 text-gray-60',
    timeAccordionList: 'mt-3 flex flex-col gap-3',
  };

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-4"
      onClick={onClose}
    >
      <div
        className="w-[23rem] cursor-auto rounded-2xl bg-gray-00"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <h2 className="text-gray-80 text-lg-300">
            {t('whenAvailableTimes')}
          </h2>
          <button className="text-gray-40" onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>
        <div className="scrollbar-hidden flex max-h-[30rem] flex-col gap-8 overflow-y-auto px-5 pb-7 pt-4">
          {event &&
            formattedRecommendTimes.map((recommendSchedule) => (
              <div key={recommendSchedule.timePoint}>
                <h3 className={style.dateTitle}>
                  {event.category === 'DATE'
                    ? dayjs(recommendSchedule.timePoint, 'YYYY.MM.DD').format(
                        'YYYY.MM.DD (ddd)',
                      )
                    : dayjs()
                        .day(
                          weekdaysShortKo.findIndex(
                            (weekday) =>
                              weekday === recommendSchedule.timePoint,
                          ),
                        )
                        .format('dddd')}
                </h3>
                <ul className={style.timeAccordionList}>
                  {recommendSchedule.schedules.map((schedule, index) => (
                    <TimeAccordion
                      key={index}
                      startTime={schedule.start_time}
                      endTime={schedule.end_time}
                      members={{
                        possible: schedule.possible_names,
                        impossible: schedule.impossible_names,
                      }}
                    />
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export function TimeAccordion({
  startTime,
  endTime,
  members,
}: {
  startTime: string;
  endTime: string;
  members: {
    possible: string[];
    impossible: string[];
  };
}) {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations();

  const style = {
    title: 'text-md-300',
    badgeList: 'mt-2 flex flex-wrap gap-2',
  };

  function handleAccordionClick() {
    setIsOpen(!isOpen);
  }

  return (
    <li
      className={cn('rounded-2xl border border-gray-05 bg-gray-05', {
        'border-primary-50 bg-gray-00': isOpen,
      })}
    >
      <div
        className="flex cursor-pointer items-center gap-2 px-5 py-4"
        onClick={handleAccordionClick}
      >
        <span
          className={cn('flex-1 text-gray-50 text-lg-200', {
            'text-primary-50': isOpen,
          })}
        >
          {startTime} - {endTime}
        </span>
        <div className="rounded-full bg-primary-50 px-3 py-1 text-gray-00 text-sm-300">
          {t('common.participantCount', {
            count: members.possible.length,
          })}
        </div>
        {isOpen ? (
          <IconChevronUp size={24} className="text-primary-50" />
        ) : (
          <IconChevronDown size={24} className="text-gray-30" />
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-5 px-5 pb-4">
          {members.possible.length > 0 && (
            <div>
              <div className={cn(style.title, 'text-primary-60')}>
                {t('eventDetail.available')}
              </div>
              <div className={style.badgeList}>
                {members.possible.map((member) => (
                  <MemberBadge key={member} variant="primary">
                    {member}
                  </MemberBadge>
                ))}
              </div>
            </div>
          )}
          {members.impossible.length > 0 && (
            <div>
              <div className={cn(style.title, 'text-gray-50')}>
                {t('eventDetail.unavailable')}
              </div>
              <div className={style.badgeList}>
                {members.impossible.map((member) => (
                  <MemberBadge key={member} variant="gray">
                    {member}
                  </MemberBadge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
