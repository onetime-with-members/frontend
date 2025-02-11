import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditButtonGroup from './EditButtonGroup/EditButtonGroup';
import EditDropdownContent from './EditDropdownContent/EditDropdownContent';
import PenIcon from '@/components/icon/PenIcon';
import SleepIcon from '@/components/icon/SleepIcon';
import { AppDispatch, RootState } from '@/store';
import { changeSleepTime, editSleepTime } from '@/store/sleep-time';
import cn from '@/utils/cn';

export default function SleepTimeUI() {
  const [isEditing, setIsEditing] = useState(false);

  const { sleepTime, originalSleepTime } = useSelector(
    (state: RootState) => state.sleepTime,
  );
  const dispatch = useDispatch<AppDispatch>();

  function handleEditButtonClick() {
    setIsEditing(true);
  }

  async function handleSubmitButtonClick() {
    await dispatch(editSleepTime());
    setIsEditing(false);
  }

  function handleCancelButtonClick() {
    setIsEditing(false);
    dispatch(changeSleepTime(originalSleepTime));
  }

  return (
    <div
      className={cn('flex items-stretch justify-between gap-3 px-6 pb-4 pt-5', {
        'flex-col sm:flex-row sm:items-center': isEditing,
      })}
    >
      <div className="flex items-center gap-1.5">
        <span>
          <SleepIcon fill="#31333F" size={20} />
        </span>
        {isEditing ? (
          <EditDropdownContent />
        ) : (
          <span className="text-gray-80 text-lg-200">
            {sleepTime.start} - {sleepTime.end}
          </span>
        )}
      </div>
      {isEditing ? (
        <EditButtonGroup
          onSubmit={handleSubmitButtonClick}
          onCancel={handleCancelButtonClick}
        />
      ) : (
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-05"
          onClick={handleEditButtonClick}
        >
          <PenIcon fill="#474A5C" size={24} />
        </button>
      )}
    </div>
  );
}
