import TBDayTopLabel from './TBDayTopLabel';
import { EventType } from '@/types/event.type';

interface TBDayTopLabelGroupProps {
  topLabelRef: React.RefObject<HTMLDivElement>;
  dayLineGap: number;
  dayLineWidth: number;
  timePointChunks: string[][];
  category: EventType['category'];
}

export default function TBDayTopLabelGroup({
  topLabelRef,
  dayLineGap,
  dayLineWidth,
  timePointChunks,
  category,
}: TBDayTopLabelGroupProps) {
  return (
    <div className="pl-[3.5rem]">
      <div
        ref={topLabelRef}
        className="flex items-center overflow-x-hidden"
        style={{
          gap: dayLineGap,
        }}
      >
        {timePointChunks.map((timePointChunk) =>
          timePointChunk.map((timePoint) => (
            <TBDayTopLabel
              key={timePoint}
              category={category}
              timePoint={timePoint}
              className="py-2 text-center"
              style={{
                minWidth: dayLineWidth,
              }}
            />
          )),
        )}
      </div>
    </div>
  );
}
