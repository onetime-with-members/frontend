'use client';

import MainContent from '../components/detail/MainContent';
import TopHeader from '../components/detail/TopHeader';
import TopNavBar from '../components/detail/TopNavBar';
import RecommendedTimesBottomSheet from '@/app/(common)/events/[id]/_ui/bottom-sheet/RecommendedTimesBottomSheet';
import { BottomButtonsForDesktop } from '@/app/(common)/events/[id]/_ui/button';
import GrayBackground from '@/components/gray-background';

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
