'use client';

import BottomButton from '../components/confirm/BottomButton';
import DesktopHeader from '../components/confirm/DesktopHeader';
import DesktopNavBar from '../components/confirm/DesktopNavBar';
import MobileHeader from '../components/confirm/MobileHeader';
import PickersSection from '../components/confirm/PickersSection';
import RecommendedTimesSection from '../components/confirm/RecommendedTimesSection';
import GrayBackground from '@/components/GrayBackground';
import { useRouter } from '@/i18n/navigation';

export default function EventConfirmPage() {
  const router = useRouter();

  function handleBackButtonClick() {
    router.back();
  }

  return (
    <div className="flex flex-col bg-gray-00 md:bg-gray-05">
      <GrayBackground device="desktop" breakpoint="md" />
      <DesktopNavBar />
      <MobileHeader
        onBackButtonClick={handleBackButtonClick}
        onComplete={handleBackButtonClick}
        disabled={false}
      />
      <main className="flex flex-col items-center pb-10">
        <div className="mx-auto flex w-full max-w-[825px] flex-col items-center justify-center md:pt-6">
          <DesktopHeader onBackButtonClick={handleBackButtonClick} />
          <div className="flex w-full flex-col gap-8 rounded-3xl bg-gray-00 md:flex-row">
            <PickersSection />
            <RecommendedTimesSection />
          </div>
        </div>
        <BottomButton
          onBackButtonClick={handleBackButtonClick}
          disabled={false}
        />
      </main>
    </div>
  );
}
