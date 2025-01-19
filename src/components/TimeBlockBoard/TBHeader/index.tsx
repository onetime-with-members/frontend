import PossibleTimeToggle from './PossibleTimeToggle';
import { IconTriangleFilled } from '@tabler/icons-react';

interface TBHeaderProps {
  editable: boolean | undefined;
  isPossibleTime: boolean;
  handleAvailableToggle: () => void;
  timePointChunks: string[][];
  chunkIndex: number;
  handleLeftScroll: () => void;
  handleRightScroll: () => void;
}

export default function TBHeader({
  editable,
  isPossibleTime,
  handleAvailableToggle,
  timePointChunks,
  chunkIndex,
  handleLeftScroll,
  handleRightScroll,
}: TBHeaderProps) {
  return (
    <div className="flex justify-between py-3">
      {editable ? (
        <PossibleTimeToggle
          isPossibleTime={isPossibleTime}
          onToggle={handleAvailableToggle}
        />
      ) : (
        <h2 className="text-gray-90 title-sm-300">가능한 스케줄</h2>
      )}
      {timePointChunks.length !== 1 && (
        <div className="flex items-center gap-4">
          <button
            onClick={handleLeftScroll}
            className="flex w-6 -rotate-90 items-center justify-center text-gray-90 disabled:text-gray-15"
            disabled={chunkIndex === 0}
          >
            <IconTriangleFilled size={12} />
          </button>
          <button
            onClick={handleRightScroll}
            className="flex w-6 rotate-90 items-center justify-center disabled:text-gray-15"
            disabled={chunkIndex === timePointChunks.length - 1}
          >
            <IconTriangleFilled size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
