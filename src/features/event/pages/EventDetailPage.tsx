'use client';

import { useEffect, useState } from 'react';

import { useEventQuery } from '../api/event.query';
import BottomButtonsForDesktop from '../components/detail/BottomButtonsForDesktop';
import MainContent from '../components/detail/MainContent';
import RecommendedTimesBottomSheet from '../components/detail/RecommendedTimesBottomSheet';
import TopHeader from '../components/detail/TopHeader';
import TopNavBar from '../components/detail/TopNavBar';
import TalkCalendarShareModal from '../components/detail/shared/ConfirmedTime/ConfirmedTimeHeader/KakaoTalkButton/TalkCalendarShareModal';
import { SESSION_STORAGE_SHOW_KAKAO_AFTER_CONFIRM } from '../constants';
import useTalkCalendarToast from '../hooks/useTalkCalendarToast';
import GrayBackground from '@/components/GrayBackground';
import { useParams } from 'next/navigation';

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();

  const [isKakaoShareAfterConfirmOpen, setIsKakaoShareAfterConfirmOpen] =
    useState(false);

  useTalkCalendarToast();

  const { data: event } = useEventQuery(params.id);

  useEffect(() => {
    const storedId = sessionStorage.getItem(
      SESSION_STORAGE_SHOW_KAKAO_AFTER_CONFIRM,
    );
    if (storedId === params.id) {
      setIsKakaoShareAfterConfirmOpen(true);
    }
  }, [params.id]);

  function handleCloseKakaoShareAfterConfirm() {
    sessionStorage.removeItem(SESSION_STORAGE_SHOW_KAKAO_AFTER_CONFIRM);
    setIsKakaoShareAfterConfirmOpen(false);
  }

  return (
    <div className="flex min-h-[110vh] flex-col">
      <GrayBackground />
      <TopNavBar />
      <TopHeader />
      <MainContent />
      {event.event_status !== 'CONFIRMED' && <BottomButtonsForDesktop />}
      <RecommendedTimesBottomSheet />
      {isKakaoShareAfterConfirmOpen && (
        <TalkCalendarShareModal onClose={handleCloseKakaoShareAfterConfirm} />
      )}
    </div>
  );
}
