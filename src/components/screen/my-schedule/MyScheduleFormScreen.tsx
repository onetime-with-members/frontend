import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../../../api/axios';
import { MyNewSchedule } from '../../../types/schedule.type';
import MyScheduleBottomSheet from '../../MyScheduleBottomSheet';
import MyTimeBlockBoard from '../../MyTimeBlockBoard';
import { IconX } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface MyScheduleFormScreenProps {
  mode: 'create' | 'edit';
}

export default function MyScheduleFormScreen({
  mode,
}: MyScheduleFormScreenProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [myNewScheduleData, setMyNewScheduleData] = useState<MyNewSchedule>({
    title: '',
    schedules: [],
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const params = useParams<{ myScheduleId: string }>();

  const { data: mySchedulesData, isLoading: isMySchedulesLoading } = useQuery({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data;
    },
  });

  const mySchedules = mySchedulesData?.payload;

  const { data: myScheduleData, isLoading: isMyScheduleLoading } = useQuery({
    queryKey: ['fixed-schedules', params.myScheduleId],
    queryFn: async () => {
      const res = await axios.get(`/fixed-schedules/${params.myScheduleId}`);
      return res.data;
    },
    enabled: mode === 'edit',
  });

  const mySchedule = myScheduleData?.payload;

  const createMySchedule = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/fixed-schedules', myNewScheduleData);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fixed-schedules'] });
      navigate(-1);
    },
  });

  const editMySchedule = useMutation({
    mutationFn: async () => {
      const res = await axios.patch(
        `/fixed-schedules/${params.myScheduleId}`,
        myNewScheduleData,
      );
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fixed-schedules'] });
      navigate(-1);
    },
  });

  function setMyNewScheduleDataWithKey(key: keyof MyNewSchedule) {
    return (value: MyNewSchedule[keyof MyNewSchedule]) => {
      setMyNewScheduleData((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
  }

  function handleBottomSheetOpen() {
    setIsBottomSheetOpen(true);
  }

  function handleBottomSheetClose() {
    setIsBottomSheetOpen(false);
  }

  function handleCloseButtonClick() {
    navigate(-1);
  }

  function handleSaveButtonClick() {
    if (!myNewScheduleData.title || myNewScheduleData.schedules.length === 0) {
      return;
    }

    if (mode === 'create') {
      createMySchedule.mutate();
    } else if (mode === 'edit') {
      editMySchedule.mutate();
    }
  }

  useEffect(() => {
    if (mode === 'edit' && mySchedule) {
      setMyNewScheduleData({
        title: mySchedule.title,
        schedules: mySchedule.schedules,
      });
    }
  }, [mySchedule]);

  if (
    isMySchedulesLoading ||
    mySchedules === undefined ||
    (mode === 'edit' && (isMyScheduleLoading || mySchedule === undefined))
  )
    return <></>;

  return (
    <div className="flex flex-col gap-4">
      <nav className="h-[64px]">
        <div className="fixed z-10 flex w-full flex-col justify-center bg-primary-00">
          <div className="flex justify-center px-4 text-center">
            <div className="grid h-[4rem] w-full max-w-screen-sm grid-cols-3">
              <div className="flex items-center justify-start">
                <button onClick={handleCloseButtonClick}>
                  <IconX size={24} />
                </button>
              </div>
              <div className="flex items-center justify-center text-gray-90 text-lg-300">
                내 스케줄
              </div>
              <div className="flex items-center justify-end">
                <button
                  className={clsx('text-md-300', {
                    'cursor-default text-gray-40':
                      myNewScheduleData.schedules.length === 0,
                    'cursor-pointer text-primary-40':
                      myNewScheduleData.schedules.length > 0,
                  })}
                  onClick={handleBottomSheetOpen}
                  disabled={myNewScheduleData.schedules.length === 0}
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="px-4 pb-24">
        <div className="mx-auto max-w-screen-sm">
          <MyTimeBlockBoard
            mode={mode}
            mySchedules={mySchedules}
            setMyNewSchedule={setMyNewScheduleDataWithKey('schedules')}
            editedScheduleId={Number(params.myScheduleId)}
          />
        </div>
        {isBottomSheetOpen && (
          <MyScheduleBottomSheet
            onClose={handleBottomSheetClose}
            title={myNewScheduleData.title}
            setTitle={setMyNewScheduleDataWithKey('title')}
            mode="new"
            handleSubmit={handleSaveButtonClick}
            buttonDisabled={!myNewScheduleData.title}
          />
        )}
      </main>
    </div>
  );
}
