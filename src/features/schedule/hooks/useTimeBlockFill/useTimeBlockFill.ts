import { useContext, useState } from 'react';

import { TimeBlockBoardContext } from '../../contexts/TimeBlockBoardContext';
import { ClickedTimeBlock } from '../../types';
import {
  isFilled,
  timeLabelList as timeListBetween,
} from '@/features/schedule/utils';
import { maxOf, minOf } from '@/utils';

interface useTimeBlockFillProps {
  fillTimeBlocks: (params: {
    timePoint: string;
    times: string[];
    isFilling: boolean;
  }) => void;
}

export default function useTimeBlockFill({
  fillTimeBlocks,
}: useTimeBlockFillProps) {
  const [clickedTimeBlock, setClickedTimeBlock] = useState<ClickedTimeBlock>({
    startTime: '',
    endTime: '',
    timePoint: '',
  });

  const { schedules } = useContext(TimeBlockBoardContext);

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
          schedules,
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
