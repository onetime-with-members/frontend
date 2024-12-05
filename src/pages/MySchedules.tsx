import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import MyScheduleBottomSheet from '../components/MyScheduleBottomSheet';
import MyScheduleList from '../components/MyScheduleList';
import MyTimeBlockBoard from '../components/MyTimeBlockBoard';
import MyScheduleDeleteAlert from '../components/alert/MyScheduleDeleteAlert';
import BadgeFloatingBottomButton from '../components/floating-button/BadgeFloatingBottomButton';
import ListIcon from '../components/icon/ListIcon';
import TimeBlockIcon from '../components/icon/TimeBlockIcon';
import { MyScheduleContext } from '../contexts/MyScheduleContext';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function MySchedules() {
  const [isMyScheduleDeleteAlertOpen, setIsMyScheduleDeleteAlertOpen] =
    useState(false);
  const [selectedTimeBlockName, setSelectedTimeBlockName] = useState<
    string | null
  >(null);
  const [viewMode, setViewMode] = useState<'timeblock' | 'list'>('timeblock');

  const { selectedTimeBlockId, setSelectedTimeBlockId, selectedTimeBlock } =
    useContext(MyScheduleContext);

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

  function handleMyScheduleDeleteAlertClose() {
    setIsMyScheduleDeleteAlertOpen(false);
  }

  function handleMyScheduleDelete() {
    deleteMySchedule.mutate();
  }

  function handleViewModeButtonClick() {
    if (viewMode === 'timeblock') {
      setViewMode('list');
    } else {
      setViewMode('timeblock');
    }
  }

  function handleBottomSheetClose() {
    setSelectedTimeBlockId(null);
  }

  function handleBottomSheetDeleteButtonClick() {
    setIsMyScheduleDeleteAlertOpen(true);
  }

  function handleBottomSheetEditButtonClick() {
    navigate(`/mypage/schedules/${selectedTimeBlockId}/edit`);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewMode]);

  return (
    <>
      <div>
        <nav className="h-[64px]">
          <div className="fixed z-[9999] flex w-full flex-col justify-center bg-gray-00">
            {selectedTimeBlockId !== null && (
              <div className="absolute left-0 top-0 h-full w-full bg-gray-90 bg-opacity-30" />
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
                <div className="flex items-center justify-end">
                  <button onClick={handleViewModeButtonClick}>
                    {
                      {
                        timeblock: <TimeBlockIcon />,
                        list: <ListIcon />,
                      }[viewMode]
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="px-4">
          <div className="mx-auto w-full max-w-screen-sm pb-32">
            {
              {
                timeblock: (
                  <MyTimeBlockBoard
                    mode="view"
                    mySchedules={mySchedules}
                    setSelectedTimeBlockName={setSelectedTimeBlockName}
                    className="pt-3"
                  />
                ),
                list: <MyScheduleList />,
              }[viewMode]
            }
            <BadgeFloatingBottomButton
              variant="black"
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
      {selectedTimeBlockId !== null && (
        <MyScheduleBottomSheet
          onClose={handleBottomSheetClose}
          handleDeleteButtonClick={handleBottomSheetDeleteButtonClick}
          handleEditButtonClick={handleBottomSheetEditButtonClick}
          title={selectedTimeBlock?.title || ''}
          mode="view"
          overlay={false}
        />
      )}
    </>
  );
}
