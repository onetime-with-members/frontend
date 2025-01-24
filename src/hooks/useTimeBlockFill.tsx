import { useState } from 'react';

import { maxOf, minOf } from '@/utils/string-min-max';
import { getLabelTimeList as timeListBetween } from '@/utils/time-block';

interface useTimeBlockFillProps {
  isFilledFor: (time: string) => boolean;
  fillTimeBlock: (params: {
    timePoint: string;
    time: string;
    isFilling: boolean;
  }) => void;
}

type ClickedTimeBlock = {
  startTime: string;
  endTime: string;
  timePoint: string;
};

export default function useTimeBlockFill({
  isFilledFor,
  fillTimeBlock,
}: useTimeBlockFillProps) {
  const [clickedTimeBlock, setClickedTimeBlock] = useState<ClickedTimeBlock>({
    startTime: '',
    endTime: '',
    timePoint: '',
  });

  function handleTimeBlockClick({
    timePoint,
    time,
  }: {
    timePoint: string;
    time: string;
  }) {
    setClickedTimeBlock(newClickedTimeBlock());

    if (
      newClickedTimeBlock().startTime !== '' &&
      newClickedTimeBlock().endTime !== ''
    ) {
      timeListBetween(
        newClickedTimeBlock().startTime,
        newClickedTimeBlock().endTime,
      ).forEach((time) => {
        fillTimeBlock({
          timePoint: newClickedTimeBlock().timePoint,
          time,
          isFilling: !isFilledFor(newClickedTimeBlock().startTime),
        });
      });
      setClickedTimeBlock({
        startTime: '',
        endTime: '',
        timePoint: '',
      });
    }

    function newClickedTimeBlock(): ClickedTimeBlock {
      let result: ClickedTimeBlock = {
        ...clickedTimeBlock,
      };
      const newTime = time;
      if (timePoint !== result.timePoint) {
        result = {
          startTime: '',
          endTime: '',
          timePoint,
        };
      }
      result = {
        ...result,
        startTime:
          result.startTime === '' ? newTime : minOf(result.startTime, newTime),
        endTime:
          result.startTime === '' ? '' : maxOf(result.startTime, newTime),
      };
      return result;
    }
  }

  return { clickedTimeBlock, handleTimeBlockClick };
}
