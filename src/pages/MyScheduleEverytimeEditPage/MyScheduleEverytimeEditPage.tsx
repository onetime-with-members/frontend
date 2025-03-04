import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BottomButton from './BottomButton/BottomButton';
import MainContent from './MainContent/MainContent';
import TopAppBar from './TopAppBar/TopAppBar';
import { DUMMY_EVERYTIME_SCHEDULE } from '@/data/everytime-schedule';
import { useEverytimeScheduleActions } from '@/stores/everytime-schedule';
import { EverytimeSchedule } from '@/types/schedule.type';
import { useMutation } from '@tanstack/react-query';

export default function MyScheduleEverytimeEditPage() {
  const [everytimeURL, setEverytimeURL] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(everytimeURL === '');

  const navigate = useNavigate();

  const { setEverytimeSchedule } = useEverytimeScheduleActions();

  const { mutate: submitEverytimeURL, isPending } =
    useMutation<EverytimeSchedule>({
      mutationFn: async () => {
        // const res = await axios.get(
        //   `${import.meta.env.VITE_CRAWLING_SERVER_API_URL}/schedule?url=${everytimeURL}`,
        // );
        // console.log(res.data.payload.schedules);

        return new Promise((resolve) =>
          setTimeout(() => resolve(DUMMY_EVERYTIME_SCHEDULE), 3000),
        );
      },
      onSuccess: (data) => {
        console.log(data);
        setEverytimeSchedule(data);
        navigate('/mypage/schedules/edit');
      },
    });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEverytimeURL(e.target.value);
    if (e.target.value === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }

  function handleButtonClick() {
    if (isPending) return;
    submitEverytimeURL();
  }

  return (
    <div>
      <TopAppBar />
      <main className="px-4 pb-20 pt-4">
        <MainContent
          everytimeURL={everytimeURL}
          onInputChange={handleInputChange}
        />
        <BottomButton
          disabled={buttonDisabled}
          onClick={handleButtonClick}
          isPending={isPending}
        />
      </main>
    </div>
  );
}
