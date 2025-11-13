import { useState } from 'react';

import { ClickedTimeBlock } from '../../types';
import { timeLabelList as timeListBetween } from '@/features/schedule/utils';
import { maxOf, minOf } from '@/utils';

export default function useTimeBlockFill({
  isFilled,
  fillTimeBlocks,
}: {
  isFilled: ({
    timePoint,
    time,
  }: {
    timePoint: string;
    time: string;
  }) => boolean;
  fillTimeBlocks: (params: {
    timePoint: string;
    times: string[];
    isFilling: boolean;
  }) => void;
}) {
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
        isFilling: !isFilled({
          timePoint: newClickedTimeBlock().timePoint,
          time: newClickedTimeBlock().startTime,
        }),
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
