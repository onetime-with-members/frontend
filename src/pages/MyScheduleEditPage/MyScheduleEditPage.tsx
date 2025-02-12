import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SleepTimeAccordion from './SleepTimeAccordion/SleepTimeAccordion';
import TopAppBar from './TopAppBar/TopAppBar';
import BackButtonAlert from '@/components/alert/BackButtonAlert/BackButtonAlert';
import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard/MyTimeBlockBoard';
import { AppDispatch, RootState } from '@/store';
import {
  editFixedSchedules,
  getFixedSchedules,
} from '@/store/fixedSchedulesSlice';
import { editSleepTime, getSleepTime } from '@/store/sleepTimeSlice';
import cn from '@/utils/cn';

export default function MyScheduleEditPage() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);

  const { isEdited } = useSelector((state: RootState) => state.fixedSchedules);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  function handleCloseButtonClick() {
    if (isEdited) {
      setIsBackButtonAlertOpen(true);
    } else {
      navigate(-1);
    }
  }

  async function handleSubmitButtonClick() {
    await dispatch(editFixedSchedules());
    await dispatch(editSleepTime());
    navigate(-1);
  }

  useEffect(() => {
    dispatch(getFixedSchedules());
    dispatch(getSleepTime());
  }, []);

  return (
    <>
      <Helmet>
        <title>내 스케줄 수정 | OneTime</title>
      </Helmet>

      <div className="flex flex-col">
        <TopAppBar
          onBackButtonClick={handleCloseButtonClick}
          onSubmitButtonClick={handleSubmitButtonClick}
        />

        <main className="pb-24">
          <div className="mx-auto max-w-screen-sm">
            <SleepTimeAccordion
              isAccordionOpen={isAccordionOpen}
              setIsAccordionOpen={setIsAccordionOpen}
            />
            <MyTimeBlockBoard
              mode="edit"
              className="pb-16 pl-2 pr-3"
              topDateGroupClassName={cn('sticky top-[120px] z-10 bg-gray-00', {
                'top-[183px] ': isAccordionOpen,
              })}
            />
          </div>
        </main>
      </div>

      {isBackButtonAlertOpen && (
        <BackButtonAlert backHref={-1} setIsOpen={setIsBackButtonAlertOpen} />
      )}
    </>
  );
}
