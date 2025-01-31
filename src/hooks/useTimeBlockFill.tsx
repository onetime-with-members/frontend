import { useState } from 'react';

import { maxOf, minOf } from '@/utils/string-min-max';
import { getLabelTimeList as timeListBetween } from '@/utils/time-block';

interface useTimeBlockFillProps {
  isFilled: (timePoint: string, time: string) => boolean;
  fillTimeBlocks: (params: {
    timePoint: string;
    times: string[];
    isFilling: boolean;
  }) => void;
}

type ClickedTimeBlock = {
  startTime: string;
  endTime: string;
  timePoint: string;
};

export default function useTimeBlockFill({
  isFilled,
  fillTimeBlocks,
}: useTimeBlockFillProps) {
  const [clickedTimeBlock, setClickedTimeBlock] = useState<ClickedTimeBlock>({
    startTime: '',
    endTime: '',
    timePoint: '',
  });

  function handleTimeBlockClick({
    timePoint: newTimePoint,
    time: newTime,
  }: {
    timePoint: string;
    time: string;
  }) {
    if (
      newClickedTimeBlock().startTime !== '' &&
      newClickedTimeBlock().endTime !== ''
    ) {
      fillTimeBlocks({
        timePoint: newClickedTimeBlock().timePoint,
        times: timeListBetween(
          newClickedTimeBlock().startTime,
          newClickedTimeBlock().endTime,
        ),
        isFilling: !isFilled(
          newClickedTimeBlock().timePoint,
          newClickedTimeBlock().startTime,
        ),
      });

      setClickedTimeBlock({
        startTime: '',
        endTime: '',
        timePoint: '',
      });

      return;
    }

    setClickedTimeBlock(newClickedTimeBlock());

    function newClickedTimeBlock(): ClickedTimeBlock {
      if (newTimePoint !== clickedTimeBlock.timePoint) {
        return {
          startTime: newTime,
          endTime: '',
          timePoint: newTimePoint,
        };
      }
      return {
        startTime: minOf(clickedTimeBlock.startTime, newTime),
        endTime: maxOf(clickedTimeBlock.startTime, newTime),
        timePoint: clickedTimeBlock.timePoint,
      };
    }
  }

  function isClickedFirst(timePoint: string, time: string) {
    return (
      clickedTimeBlock.timePoint === timePoint &&
      clickedTimeBlock.startTime === time
    );
  }

  return { clickedTimeBlock, handleTimeBlockClick, isClickedFirst };
}
