import TBDayLine, { TBDayLineProps } from '../TBDayLine';
import { EventType } from '@/types/event.type';

interface TBBoardContentProps {
  boardContentRef: React.RefObject<HTMLDivElement>;
  dayLineRef: React.RefObject<HTMLDivElement>;
  dayLineGap: number;
  dayLineWidth: number;
  timePointChunks: string[][];
  event: EventType;
  schedules: TBDayLineProps['schedules'];
  changeTimeBlockStatus: TBDayLineProps['changeTimeBlockStatus'];
  handleDialogOpen: TBDayLineProps['handleDialogOpen'];
  editable: boolean | undefined;
  innerContentProportion: number;
  isPossibleTime: TBDayLineProps['isPossibleTime'];
  backgroundColor: TBDayLineProps['backgroundColor'];
}

export default function TBBoardContent({
  boardContentRef,
  dayLineRef,
  dayLineGap,
  dayLineWidth,
  timePointChunks,
  event,
  schedules,
  changeTimeBlockStatus,
  handleDialogOpen,
  editable,
  innerContentProportion,
  isPossibleTime,
  backgroundColor,
}: TBBoardContentProps) {
  return (
    <div
      ref={boardContentRef}
      className="flex flex-1 overflow-hidden"
      style={{ gap: dayLineGap }}
    >
      {timePointChunks.map((timePoints, index) => (
        <div
          key={index}
          className="flex"
          style={{
            gap: dayLineGap,
            minWidth:
              index !== timePointChunks.length - 1 ||
              timePointChunks.length === 1
                ? `${innerContentProportion * 100}%`
                : undefined,
          }}
        >
          {timePoints.map((timePoint) => {
            return (
              <TBDayLine
                key={timePoint}
                ref={
                  index !== timePointChunks.length - 1 ? dayLineRef : undefined
                }
                timePoint={timePoint}
                startTime={event.start_time}
                endTime={event.end_time}
                schedules={schedules}
                changeTimeBlockStatus={changeTimeBlockStatus}
                handleDialogOpen={handleDialogOpen}
                editable={editable}
                minWidth={
                  index === timePointChunks.length - 1
                    ? dayLineWidth
                    : undefined
                }
                isPossibleTime={isPossibleTime}
                backgroundColor={backgroundColor}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
