'use client';

import axios, { AxiosError } from 'axios';
import { useState } from 'react';

import BottomButton from './BottomButton/BottomButton';
import MainContent from './MainContent/MainContent';
import TopAppBar from './TopAppBar/TopAppBar';
import { useEverytimeScheduleActions } from '@/stores/everytime-schedule';
import { EverytimeSchedule } from '@/types/schedule.type';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MyScheduleEverytimeEditPage() {
  const [everytimeURL, setEverytimeURL] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(everytimeURL === '');
  const [isTouched, setIsTouched] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const { setEverytimeSchedule } = useEverytimeScheduleActions();

  const {
    mutate: submitEverytimeURL,
    isError,
    error,
  } = useMutation<EverytimeSchedule>({
    mutationFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_CRAWLING_SERVER_API_URL}/schedule?url=${everytimeURL}`,
      );
      return res.data.payload.schedules;
    },
    onSuccess: (data) => {
      setEverytimeSchedule(data);
      const editPagePathname = '/mypage/schedules/edit';
      if (searchParams.get('from') !== editPagePathname) {
        router.replace(editPagePathname);
      } else {
        router.back();
      }
    },
    onError: () => {
      setIsMutating(false);
    },
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEverytimeURL(e.target.value);
    setIsTouched(true);
    if (e.target.value === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }

  function handleSubmitButtonClick() {
    if (isMutating) return;
    setIsTouched(false);
    setIsMutating(true);
    submitEverytimeURL();
  }

  function handleBackButtonClick() {
    router.back();
  }

  return (
    <div>
      <TopAppBar onBackButtonClick={handleBackButtonClick} />
      <main className="px-4 pb-20 pt-4">
        <MainContent
          everytimeURL={everytimeURL}
          onInputChange={handleInputChange}
        />
        <BottomButton
          disabled={buttonDisabled}
          onClick={handleSubmitButtonClick}
          isPending={isMutating}
          isError={isError}
          error={error as AxiosError}
          isTouched={isTouched}
        />
      </main>
    </div>
  );
}
