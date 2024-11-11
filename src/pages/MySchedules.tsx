import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import MyTimeBlockBoard from '../components/MyTimeBlockBoard';
import MyScheduleDeleteAlert from '../components/alert/MyScheduleDeleteAlert';
import BlackFloatingBottomButton from '../components/floating-button/BlackFloatingBottomButton';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function MySchedules() {
  const [selectedTimeBlockId, setSelectedTimeBlockId] = useState<number | null>(
    null, // 선택된 타임 블록 ID
  );
  const [isMyScheduleDeleteAlertOpen, setIsMyScheduleDeleteAlertOpen] =
    useState(false);
  const [selectedTimeBlockName, setSelectedTimeBlockName] = useState<
    string | null
  >(
    null, // 선택된 타임 블록 이름
  );

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data;
    },
  });

  const mySchedules = isLoading || data === undefined ? [] : data.payload;

  const deleteMySchedule = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`/fixed-schedules/${selectedTimeBlockId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fixed-schedules'] });
      setIsMyScheduleDeleteAlertOpen(false);
      setSelectedTimeBlockId(null);
      setSelectedTimeBlockName(null);
    },
  });

  function handleBackButtonClick() {
    navigate(-1);
  }

  function handleFloatingButtonClick() {
    navigate('/mypage/schedules/new');
  }

  function handleMyScheduleDeleteAlertOpen() {
    setIsMyScheduleDeleteAlertOpen(true);
  }

  function handleMyScheduleDeleteAlertClose() {
    setIsMyScheduleDeleteAlertOpen(false);
  }

  function handleMyScheduleDelete() {
    deleteMySchedule.mutate();
  }

  function handleMyScheduleEdit() {
    navigate(`/mypage/schedules/${selectedTimeBlockId}/edit`);
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <nav className="h-[64px]">
          <div className="fixed z-[9999] flex w-full flex-col justify-center bg-gray-00">
            {selectedTimeBlockId !== null && (
              <div className="absolute left-0 top-0 h-full w-full bg-gray-90 bg-opacity-30"></div>
            )}
            <div className="flex justify-center px-4 text-center">
              <div className="grid h-[4rem] w-full max-w-screen-sm grid-cols-3">
                <div className="flex items-center justify-start">
                  <button onClick={handleBackButtonClick}>
                    <IconChevronLeft size={24} />
                  </button>
                </div>
                <div className="flex items-center justify-center text-gray-90 text-lg-300">
                  내 스케줄
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="px-4">
          <div className="mx-auto w-full max-w-screen-sm pb-32">
            <MyTimeBlockBoard
              mode="view"
              mySchedules={mySchedules}
              selectedTimeBlockId={selectedTimeBlockId}
              setSelectedTimeBlockId={setSelectedTimeBlockId}
              handleDeleteButtonClick={handleMyScheduleDeleteAlertOpen}
              handleEditButtonClick={handleMyScheduleEdit}
              setSelectedTimeBlockName={setSelectedTimeBlockName}
            />
            <BlackFloatingBottomButton
              name="스케줄 추가"
              onClick={handleFloatingButtonClick}
            />
          </div>
        </main>
      </div>
      {isMyScheduleDeleteAlertOpen && (
        <MyScheduleDeleteAlert
          onConfirm={handleMyScheduleDelete}
          onCancel={handleMyScheduleDeleteAlertClose}
          onClose={handleMyScheduleDeleteAlertClose}
          isDeleteLoading={deleteMySchedule.isPending}
          myScheduleName={selectedTimeBlockName || ''}
        />
      )}
    </>
  );
}
