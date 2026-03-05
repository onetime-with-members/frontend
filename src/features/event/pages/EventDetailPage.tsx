'use client';

import { useEventQuery } from '../api/event.query';
import BottomButtonsForDesktop from '../components/detail/BottomButtonsForDesktop';
import MainContent from '../components/detail/MainContent';
import RecommendedTimesBottomSheet from '../components/detail/RecommendedTimesBottomSheet';
import TopHeader from '../components/detail/TopHeader';
import TopNavBar from '../components/detail/TopNavBar';
import useTalkCalendarToast from '../hooks/useTalkCalendarToast';
import GrayBackground from '@/components/GrayBackground';
import { useParams } from 'next/navigation';

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();

  useTalkCalendarToast();

  const { data: event } = useEventQuery(params.id);

  return (
    <div className="flex min-h-[110vh] flex-col">
      <GrayBackground />
      <TopNavBar />
      <TopHeader />
      <MainContent />
      {event.event_status !== 'CONFIRMED' && <BottomButtonsForDesktop />}
      <RecommendedTimesBottomSheet />
    </div>
  );
}
