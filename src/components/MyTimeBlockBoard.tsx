import clsx from 'clsx';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import axios from '../api/axios';
import { MyNewSchedule } from '../types/schedule.type';
import { getBlockTimeList, getLabelTimeList } from '../utils/time-block';
import MyScheduleBottomSheet from './MyScheduleBottomSheet';
import { useQuery } from '@tanstack/react-query';

interface MyTimeBlockBoard {
  mode: 'view' | 'create' | 'edit';
  mySchedules: {
    id: number;
    start_time: string;
    end_time: string;
    schedules: {
      time_point: string;
      times: string[];
    }[];
  }[];
  setMyNewSchedule?: (newSchedule: MyNewSchedule['schedules']) => void;
  selectedTimeBlockId?: number | null;
  setSelectedTimeBlockId?: React.Dispatch<React.SetStateAction<number | null>>;
  handleDeleteButtonClick?: () => void;
  handleEditButtonClick?: () => void;
  setSelectedTimeBlockName?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  editedScheduleId?: number;
}

export default function MyTimeBlockBoard({
  mode,
  mySchedules,
  setMyNewSchedule,
  selectedTimeBlockId,
  setSelectedTimeBlockId,
  handleDeleteButtonClick,
  handleEditButtonClick,
  setSelectedTimeBlockName,
  editedScheduleId = -1,
}: MyTimeBlockBoard) {
  const [timeBlockData, setTimeBlockData] = useState(
    mySchedules.flatMap((schedule) =>
      schedule.schedules.map((s) => ({
        id: schedule.id,
        time_point: s.time_point,
        times: s.times,
      })),
    ),
  );
  const [drageStatus, setDragStatus] = useState<{
    isDragging: boolean;
    isFilling: boolean;
    weekday: string;
    times: string[];
  }>({
    isDragging: false, // 드래그 중 여부
    isFilling: false, // 채우기 중 여부
    weekday: '', // 드래그 중인 요일
    times: [], // 드래그된 시간 리스트 ex) ['10:00', '10:30']
  });

  const timeBlockList = getBlockTimeList('00:00', '24:00', '30m');
  const labelTimeList = getLabelTimeList('00:00', '24:00', '1h');

  const editedId = mode === 'edit' ? editedScheduleId : -1;

  const { data, isLoading } = useQuery({
    queryKey: ['fixed-schedules', selectedTimeBlockId],
    queryFn: async () => {
      const res = await axios.get(`/fixed-schedules/${selectedTimeBlockId}`);
      return res.data;
    },
    enabled: mode === 'view' && selectedTimeBlockId !== null,
  });

  const selectedTimeBlock = data?.payload;

  function changeTimeBlock(
    weekday: string,
    times: string[],
    isFilling: boolean,
  ) {
    // 뷰 모드일 때 종료
    if (mode === 'view') return;

    // 요일과 시간이 없으면 종료
    if (weekday === '' || times.length === 0) return;

    // 타임 블록 리스트 데이터 복사
    const newTimeBlockData = [...timeBlockData];

    // 타임 블록 객체가 있는지 확인
    const searchedIndex = newTimeBlockData.findIndex(
      (data) => data.id === editedId && data.time_point === weekday,
    );

    // 타임 블록 객체가 없으면
    if (searchedIndex === -1) {
      // 새로운 타임 블록 객체 추가
      newTimeBlockData.push({
        id: editedId,
        time_point: weekday,
        times: times,
      });
      setTimeBlockData([...newTimeBlockData]);
    }
    // 타임 블록 객체가 있으면
    else {
      // 채우기 중이면
      if (isFilling) {
        // 드래그된 시간 중 기존 타임 블록 객체의 시간 리스트에 없는 시간만 추가
        newTimeBlockData[searchedIndex].times = [
          ...new Set([...newTimeBlockData[searchedIndex].times, ...times]),
        ].sort();
      }
      // 채우기 중이 아니면
      else {
        // 기존 타임 블록 객체의 시간 중 드래그된 시간 제거
        newTimeBlockData[searchedIndex].times = newTimeBlockData[
          searchedIndex
        ].times
          .filter((time) => !times.includes(time))
          .sort();
      }
      setTimeBlockData([...newTimeBlockData]);
    }

    // 새 스케줄 데이터의 상태 변화된 값으로 업데이트
    if (setMyNewSchedule) {
      setMyNewSchedule(getMyNewSchedule(newTimeBlockData));
    }
  }

  function getMyNewSchedule(newTimeBlockData: typeof timeBlockData) {
    // 수정 중이면서 채워져 있는 고정 스케줄 데이터만 필터링해 새 스케줄 데이터 형식으로 변환하여 반환
    return newTimeBlockData
      .filter((data) => {
        return data.id === editedId && data.times.length > 0;
      })
      .map((data) => ({
        time_point: data.time_point,
        times: data.times,
      }));
  }

  function isTimeBlockExist(weekday: string, time: string) {
    // 타임 블록 데이터 중 해당 요일에 해당 시간이 있는지 확인
    return timeBlockData.some(
      (r) => r.time_point === weekday && r.times.includes(time),
    );
  }

  function isTimeBlockInOtherSchedule(weekday: string, time: string) {
    // 타임 블록 데이터 중 해당 요일에 해당 시간이 있지만 다른 고정 스케줄에 있는지 확인
    return timeBlockData.some(
      (r) =>
        r.time_point === weekday && r.times.includes(time) && r.id !== editedId,
    );
  }

  function handleTimeBlockDragStart(weekday: string, time: string) {
    // 뷰 모드일 때 종료
    if (mode === 'view') return;

    // 드래그 중인 타임 블록이 다른 고정 스케줄에 이미 포함되어 있으면 드래그 종료
    if (isTimeBlockInOtherSchedule(weekday, time)) {
      return;
    }

    // 드래그 시작
    setDragStatus({
      isDragging: true,
      isFilling: !isTimeBlockExist(weekday, time),
      weekday: weekday,
      times: [time],
    });
  }

  function handleTimeBlockDragMove(weekday: string, time: string) {
    // 뷰 모드일 때 종료
    if (mode === 'view') return;

    // 드래그 중이 아닐 때 종료
    if (!drageStatus.isDragging) return;

    // 드래그 중인 타임 블록이 다른 고정 스케줄에 이미 포함되어 있으면 드래그 종료
    if (isTimeBlockInOtherSchedule(weekday, time)) {
      handleTimeBlockDragEnd();
      return;
    }

    // 드래그 인덱스 변경
    setDragStatus({
      ...drageStatus,
      times: [...new Set([...drageStatus.times, time])].sort(),
    });
  }

  function handleTimeBlockDragEnd() {
    // 뷰 모드일 때 종료
    if (mode === 'view') return;

    // 드래그 중이 아닐 때 종료
    if (!drageStatus.isDragging) return;

    // 드래그 종료
    setDragStatus({
      isDragging: false,
      isFilling: false,
      weekday: '',
      times: [],
    });
  }

  function handleBottomSheetClose() {
    if (setSelectedTimeBlockId) {
      setSelectedTimeBlockId(null);
    }
  }

  useEffect(() => {
    // 드래그 상태가 변경되면 타임 블록 변경
    changeTimeBlock(
      drageStatus.weekday,
      drageStatus.times,
      drageStatus.isFilling,
    );
  }, [drageStatus]);

  useEffect(() => {
    setTimeBlockData(
      mySchedules.flatMap((schedule) =>
        schedule.schedules.map((s) => ({
          id: schedule.id,
          time_point: s.time_point,
          times: s.times,
        })),
      ),
    );
  }, [mySchedules]);

  useEffect(() => {
    if (selectedTimeBlock && setSelectedTimeBlockName) {
      setSelectedTimeBlockName(selectedTimeBlock.title);
    }
  }, [selectedTimeBlock]);

  return (
    <>
      {mode === 'view' && selectedTimeBlockId !== null && (
        <div className="fixed left-0 top-0 h-screen w-screen bg-gray-90 bg-opacity-30"></div>
      )}
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <div className="h-[1.5rem]"></div>
          <div>
            {labelTimeList.map((time, index) => (
              <div
                key={time}
                className={clsx('h-[6rem] text-center', {
                  'h-0': index === labelTimeList.length - 1,
                })}
              >
                <span
                  className={clsx(
                    'block -translate-y-1/2 text-gray-30 text-sm-200',
                    {
                      'translate-y-0': index === 0,
                      '-translate-y-full': index === labelTimeList.length - 1,
                    },
                  )}
                >
                  {time === '24:00'
                    ? '24시'
                    : dayjs(time, 'HH:mm').format('H시')}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid flex-1 grid-cols-7 gap-2">
          {dayjs.weekdaysMin().map((weekday) => (
            <div key={weekday} className="flex flex-col gap-2">
              <div
                key={weekday}
                className="text-center text-gray-30 text-md-200"
              >
                {weekday}
              </div>
              <div
                className="overflow-hidden rounded-lg"
                onMouseLeave={() => handleTimeBlockDragEnd()}
              >
                {timeBlockList.map((timeBlock, index) => (
                  <div
                    key={index}
                    onClick={
                      mode === 'view' && setSelectedTimeBlockId
                        ? () =>
                            setSelectedTimeBlockId(
                              timeBlockData.find(
                                (tb) =>
                                  tb.time_point === weekday &&
                                  tb.times.includes(timeBlock),
                              )?.id || null,
                            )
                        : undefined
                    }
                    onMouseDown={() =>
                      handleTimeBlockDragStart(weekday, timeBlock)
                    }
                    onMouseMove={() =>
                      handleTimeBlockDragMove(weekday, timeBlock)
                    }
                    onMouseUp={() => handleTimeBlockDragEnd()}
                    className={clsx(
                      'h-[3rem] last:border-b-0',
                      {
                        'cursor-pointer border-b border-gray-10 bg-gray-05 odd:border-dashed even:border-solid':
                          mode !== 'view' &&
                          !isTimeBlockExist(weekday, timeBlock),
                        'border-b border-gray-10 bg-gray-05 odd:border-dashed even:border-solid':
                          mode === 'view' &&
                          !isTimeBlockExist(weekday, timeBlock),
                        'cursor-pointer border-l border-r border-gray-00 bg-primary-40':
                          (mode === 'view' &&
                            isTimeBlockExist(weekday, timeBlock)) ||
                          (mode !== 'view' &&
                            isTimeBlockExist(weekday, timeBlock) &&
                            !isTimeBlockInOtherSchedule(weekday, timeBlock)),
                        'bg-primary-20':
                          mode !== 'view' &&
                          isTimeBlockExist(weekday, timeBlock) &&
                          isTimeBlockInOtherSchedule(weekday, timeBlock),
                        'relative z-[100] bg-primary-40':
                          mode === 'view' &&
                          selectedTimeBlockId ===
                            timeBlockData.find(
                              (tb) =>
                                tb.time_point === weekday &&
                                tb.times.includes(timeBlock),
                            )?.id,
                      },
                      {
                        'rounded-t-lg border-t border-gray-00':
                          timeBlockData.some(
                            (r) =>
                              r.time_point === weekday &&
                              r.times.includes(timeBlock) &&
                              r.times[0] === timeBlock,
                          ),
                      },
                      {
                        'rounded-b-lg border-b border-gray-00':
                          timeBlockData.some(
                            (r) =>
                              r.time_point === weekday &&
                              r.times.includes(timeBlock) &&
                              r.times[r.times.length - 1] === timeBlock,
                          ),
                      },
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {mode === 'view' && selectedTimeBlockId !== null && (
        <MyScheduleBottomSheet
          onClose={handleBottomSheetClose}
          title={
            isLoading || selectedTimeBlock === undefined
              ? ' '
              : selectedTimeBlock.title
          }
          mode="view"
          overlay={false}
          placeholder=""
          handleDeleteButtonClick={handleDeleteButtonClick}
          handleEditButtonClick={handleEditButtonClick}
        />
      )}
    </>
  );
}
