'use client';

import BottomButtonsForDesktop from '../components/detail/BottomButtonsForDesktop';
import MainContent from '../components/detail/MainContent';
import RecommendedTimesBottomSheet from '../components/detail/RecommendedTimesBottomSheet';
import TopHeader from '../components/detail/TopHeader';
import TopNavBar from '../components/detail/TopNavBar';
import GrayBackground from '@/components/GrayBackground';

export default function EventDetailPage() {
  return (
    <div className="flex min-h-[110vh] flex-col">
      <GrayBackground />
      <TopNavBar />
      <TopHeader />
      <MainContent />
      <BottomButtonsForDesktop />
      <RecommendedTimesBottomSheet />
    </div>
  );
}
