import { useState } from 'react';

import EditButtonGroup from './EditButtonGroup';
import EditDropdownContent from './EditDropdownContent';
import PenIcon from '@/components/icon/PenIcon';
import SleepIcon from '@/components/icon/SleepIcon';
import useSleepTime from '@/hooks/useSleepTime';
import { SleepTimeType } from '@/types/user.type';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface SleepTimeUIProps {
  sleepTime: SleepTimeType;
  setSleepTime: React.Dispatch<React.SetStateAction<SleepTimeType>>;
}

export default function SleepTimeUI({
  sleepTime,
  setSleepTime,
}: SleepTimeUIProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { sleepTimeData, defaultSleepTime } = useSleepTime();

  const queryClient = useQueryClient();

  const editSleepTime = useMutation({
    mutationFn: async () => {
      const res = await axios.put('/users/sleep-time', sleepTime);
      return res.data.payload;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsEditing(false);
    },
  });

  function handleEditButtonClick() {
    setIsEditing(true);
  }

  function handleSubmitButtonClick() {
    editSleepTime.mutate();
  }

  function handleCancelButtonClick() {
    setIsEditing(false);
    setSleepTime(sleepTimeData || defaultSleepTime);
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
          <EditDropdownContent
            sleepTime={sleepTime}
            setSleepTime={setSleepTime}
          />
        ) : (
          <span className="text-gray-80 text-lg-200">
            {sleepTime.sleep_start_time} - {sleepTime.sleep_end_time}
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
