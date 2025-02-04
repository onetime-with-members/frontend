import { useState } from 'react';

import EditButtonGroup from './EditButtonGroup';
import EditDropdownContent from './EditDropdownContent';
import PenIcon from '@/components/icon/PenIcon';
import SleepIcon from '@/components/icon/SleepIcon';

export type SleepTime = {
  start: string;
  end: string;
};

export default function SleepTimeUI() {
  const [isEditing, setIsEditing] = useState(false);
  const [sleepTime, setSleepTime] = useState<SleepTime>({
    start: '03:00',
    end: '10:00',
  });

  function handleEditButtonClick() {
    setIsEditing(true);
  }

  function handleSubmitButtonClick() {
    setIsEditing(false);
  }

  function handleCancelButtonClick() {
    setIsEditing(false);
  }

  return (
    <div className="flex items-center justify-between px-6 pb-4 pt-5">
      <div className="flex items-center gap-1.5">
        <span>
          <SleepIcon fill="#31333F" size={20} />
        </span>
        {isEditing ? (
          <EditDropdownContent
            sleepTime={sleepTime}
            setSleepTime={setSleepTime}
          />
        ) : (
          <span className="text-gray-80 text-lg-200">03:00 - 10:00</span>
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
