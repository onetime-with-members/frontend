import TopDateLabel from './TopDateLabel/TopDateLabel';
import { EventType } from '@/types/event.type';

interface TopDateLabelGroupProps {
  topLabelRef: React.RefObject<HTMLDivElement>;
  dayLineGap: number;
  dayLineWidth: number;
  timePointChunks: string[][];
  category: EventType['category'];
  innerContentProportion: number;
}

export default function TopDateLabelGroup({
  topLabelRef,
  dayLineGap,
  dayLineWidth,
  timePointChunks,
  category,
  innerContentProportion,
}: TopDateLabelGroupProps) {
  return (
    <div className="pl-6">
      <div
        ref={topLabelRef}
        className="flex items-center overflow-x-hidden"
        style={{
          gap: dayLineGap,
        }}
      >
        {timePointChunks.map((timePointChunk, index) => (
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
            {timePointChunk.map((timePoint) => (
              <TopDateLabel
                key={timePoint}
                category={category}
                timePoint={timePoint}
                className="flex-1 py-2 text-center"
                style={{
                  minWidth: dayLineWidth,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
