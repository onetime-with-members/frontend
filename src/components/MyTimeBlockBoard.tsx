import clsx from 'clsx';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { getBlockTimeList, getLabelTimeList } from '../utils/time-block';

interface MyTimeBlockBoard {
  mode: 'view' | 'edit';
  mySchedules: {
    id: number;
    start_time: string;
    end_time: string;
    schedules: {
      time_point: string;
      times: string[];
    }[];
  }[];
}

// const mySchedules = [
//   {
//     id: 1,
//     start_time: '10:00',
//     end_time: '11:00',
//     schedules: [
//       {
//         time_point: '화',
//         times: ['09:30', '10:00', '10:30'],
//       },
//       {
//         time_point: '월',
//         times: ['10:00', '10:30'],
//       },
//       {
//         time_point: '수',
//         times: ['10:00', '10:30'],
//       },
//     ],
//   },
//   {
//     id: 2,
//     start_time: '11:00',
//     end_time: '12:00',
//     schedules: [
//       {
//         time_point: '화',
//         times: ['11:00', '11:30'],
//       },
//       {
//         time_point: '수',
//         times: ['11:00', '11:30'],
//       },
//     ],
//   },
//   {
//     id: 3,
//     start_time: '12:00',
//     end_time: '13:00',
//     schedules: [
//       {
//         time_point: '수',
//         times: ['12:00', '12:30'],
//       },
//       {
//         time_point: '목',
//         times: ['12:00', '12:30'],
//       },
//     ],
//   },
// ];

export default function MyTimeBlockBoard({
  mode,
  mySchedules,
}: MyTimeBlockBoard) {
  const [timeBlockData, setTimeBlockData] = useState(
    mySchedules.flatMap((schedule) =>
      schedule.schedules.map((s) => ({
        id: schedule.id,
        time_point: s.time_point,
        times: s.times,
        isEditable: false, // 현재 수정 중인 고정 스케줄인지 여부
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

  function changeTimeBlock(
    weekday: string,
    times: string[],
    isFilling: boolean,
  ) {
    // 새로운 타임 블록 ID
    const newId = 4;

    // 타임 블록 리스트 데이터 복사
    const newTimeBlockData = [...timeBlockData];

    // 타임 블록 객체가 있는지 확인
    const searchedIndex = newTimeBlockData.findIndex(
      (data) => data.id === newId && data.time_point === weekday,
    );

    // 타임 블록 객체가 없으면
    if (searchedIndex === -1) {
      // 새로운 타임 블록 객체 추가
      newTimeBlockData.push({
        id: newId,
        time_point: weekday,
        times: times,
        isEditable: true,
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
        r.time_point === weekday && r.times.includes(time) && !r.isEditable,
    );
  }

  function handleTimeBlockDragStart(weekday: string, time: string) {
    // 수정 모드가 아닐 때 종료
    if (mode !== 'edit') return;

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
    // 수정 모드가 아닐 때 종료
    if (mode !== 'edit') return;

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
    // 수정 모드가 아닐 때 종료
    if (mode !== 'edit') return;

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
  useEffect(() => {
    // 드래그 상태가 변경되면 타임 블록 변경
    changeTimeBlock(
      drageStatus.weekday,
      drageStatus.times,
      drageStatus.isFilling,
    );
  }, [drageStatus]);

  return (
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
                {time === '24:00' ? '24시' : dayjs(time, 'HH:mm').format('H시')}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-7 gap-2">
        {dayjs.weekdaysMin().map((weekday) => (
          <div key={weekday} className="flex flex-col gap-2">
            <div key={weekday} className="text-center text-gray-30 text-md-200">
              {weekday}
            </div>
            <div
              className="overflow-hidden rounded-lg"
              onMouseLeave={() => handleTimeBlockDragEnd()}
            >
              {timeBlockList.map((timeBlock, index) => (
                <div
                  key={index}
                  onMouseDown={() =>
                    handleTimeBlockDragStart(weekday, timeBlock)
                  }
                  onMouseMove={() =>
                    handleTimeBlockDragMove(weekday, timeBlock)
                  }
                  onMouseUp={() => handleTimeBlockDragEnd()}
                  className={clsx(
                    'h-[3rem] border-b border-gray-10 bg-gray-05 last:border-b-0 odd:border-dashed even:border-solid',
                    {
                      'bg-primary-40':
                        (mode === 'view' &&
                          isTimeBlockExist(weekday, timeBlock)) ||
                        (isTimeBlockExist(weekday, timeBlock) &&
                          !isTimeBlockInOtherSchedule(weekday, timeBlock)),
                      'bg-primary-20':
                        mode === 'edit' &&
                        isTimeBlockExist(weekday, timeBlock) &&
                        isTimeBlockInOtherSchedule(weekday, timeBlock),
                    },
                    {
                      'rounded-t-lg': timeBlockData.some(
                        (r) =>
                          r.time_point === weekday &&
                          r.times.includes(timeBlock) &&
                          r.times[0] === timeBlock,
                      ),
                    },
                    {
                      'rounded-b-lg': timeBlockData.some(
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
  );
}
