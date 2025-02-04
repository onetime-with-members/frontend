import { useEffect, useState } from 'react';

import EditButtonGroup from './EditButtonGroup';
import EditDropdownContent from './EditDropdownContent';
import PenIcon from '@/components/icon/PenIcon';
import SleepIcon from '@/components/icon/SleepIcon';
import { SleepTime } from '@/types/user.type';
import axios from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function SleepTimeUI() {
  const [isEditing, setIsEditing] = useState(false);
  const [sleepTime, setSleepTime] = useState<SleepTime>({
    sleep_start_time: '00:00',
    sleep_end_time: '00:00',
  });

  const queryClient = useQueryClient();

  const { data } = useQuery<SleepTime>({
    queryKey: ['users', 'sleep-time'],
    queryFn: async () => {
      const res = await axios.get('/users/sleep-time');
      return res.data.payload;
    },
  });

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
  }

  useEffect(() => {
    if (!data) return;
    setSleepTime(data);
  }, [data]);

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
          <span className="text-gray-80 text-lg-200">
            {data?.sleep_start_time} - {data?.sleep_end_time}
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
