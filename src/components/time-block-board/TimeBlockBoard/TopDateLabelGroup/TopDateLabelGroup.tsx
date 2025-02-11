import TopDateLabel from './TopDateLabel/TopDateLabel';
import { EventType } from '@/types/event.type';

interface TopDateLabelGroupProps {
  topLabelRef: React.RefObject<HTMLDivElement>;
  dayLineGap: number;
  dayLineWidth: number;
  timePointChunks: string[][];
  category: EventType['category'];
}

export default function TopDateLabelGroup({
  topLabelRef,
  dayLineGap,
  dayLineWidth,
  timePointChunks,
  category,
}: TopDateLabelGroupProps) {
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
            <TopDateLabel
              key={timePoint}
              category={category}
              timePoint={timePoint}
              className="flex-1 py-2 text-center"
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
