'use client';

import { useState } from 'react';

import BottomButton from '../components/confirm/BottomButton';
import DesktopHeader from '../components/confirm/DesktopHeader';
import DesktopNavBar from '../components/confirm/DesktopNavBar';
import MobileHeader from '../components/confirm/MobileHeader';
import PickersSection from '../components/confirm/PickersSection';
import RecommendedTimesSection from '../components/confirm/RecommendedTimesSection';
import { defaultSelectedDateTime } from '../constants';
import GrayBackground from '@/components/GrayBackground';
import { useRouter } from '@/i18n/navigation';

export default function EventConfirmPage() {
  const [selectedDateTime, setSelectedDateTime] = useState(
    defaultSelectedDateTime,
  );
  const [finalDateTime, setFinalDateTime] = useState(defaultSelectedDateTime);

  const router = useRouter();

  const isDisabled =
    finalDateTime.start.date.length === 0 ||
    finalDateTime.start.time.length === 0 ||
    finalDateTime.end.date.length === 0 ||
    finalDateTime.end.time.length === 0;

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
        disabled={isDisabled}
      />
      <main className="flex flex-col items-center pb-10">
        <div className="mx-auto flex w-full max-w-[825px] flex-col items-center justify-center md:pt-6">
          <DesktopHeader onBackButtonClick={handleBackButtonClick} />
          <div className="flex w-full flex-col gap-8 rounded-3xl bg-gray-00 md:flex-row">
            <PickersSection
              selectedDateTime={selectedDateTime}
              setSelectedDateTime={setSelectedDateTime}
              finalDateTime={finalDateTime}
              setFinalDateTime={setFinalDateTime}
            />
            <RecommendedTimesSection
              setSelectedDateTime={setSelectedDateTime}
              setFinalDateTime={setFinalDateTime}
            />
          </div>
        </div>
        <BottomButton
          onBackButtonClick={handleBackButtonClick}
          disabled={isDisabled}
        />
      </main>
    </div>
  );
}
