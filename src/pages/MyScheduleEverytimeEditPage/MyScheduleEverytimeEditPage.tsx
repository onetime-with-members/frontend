import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import BottomButton from './BottomButton/BottomButton';
import MainContent from './MainContent/MainContent';
import TopAppBar from './TopAppBar/TopAppBar';
import { useEverytimeScheduleActions } from '@/stores/everytime-schedule';
import { EverytimeSchedule } from '@/types/schedule.type';
import { useMutation } from '@tanstack/react-query';

export default function MyScheduleEverytimeEditPage() {
  const [everytimeURL, setEverytimeURL] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(everytimeURL === '');
  const [isTouched, setIsTouched] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { setEverytimeSchedule } = useEverytimeScheduleActions();

  const {
    mutate: submitEverytimeURL,
    isPending,
    isError,
    error,
  } = useMutation<EverytimeSchedule>({
    mutationFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_CRAWLING_SERVER_API_URL}/schedule?url=${everytimeURL}`,
      );
      return res.data.payload.schedules;
    },
    onSuccess: (data) => {
      setEverytimeSchedule(data);
      const editPagePathname = '/mypage/schedules/edit';
      if (searchParams.get('from') !== editPagePathname) {
        navigate(editPagePathname, { replace: true });
      } else {
        navigate(-1);
      }
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
    if (isPending) return;
    setIsTouched(false);
    submitEverytimeURL();
  }

  function handleBackButtonClick() {
    navigate(-1);
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
          isPending={isPending}
          isError={isError}
          error={error as AxiosError}
          isTouched={isTouched}
        />
      </main>
    </div>
  );
}
