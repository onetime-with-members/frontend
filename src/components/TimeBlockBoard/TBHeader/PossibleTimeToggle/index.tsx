import clsx from 'clsx';

interface AvailableToggleProps {
  isPossibleTime: boolean;
  onToggle: () => void;
}

export default function PossibleTimeToggle({
  isPossibleTime,
  onToggle,
}: AvailableToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={clsx(
          'flex h-6 w-12 cursor-pointer items-center rounded-full px-1 duration-150',
          {
            'bg-primary-50': isPossibleTime,
            'bg-danger-50': !isPossibleTime,
          },
        )}
        onClick={onToggle}
      >
        <div
          className={clsx(
            'h-[18px] w-[18px] rounded-full bg-white duration-150',
            {
              'translate-x-0': isPossibleTime,
              'translate-x-[22px]': !isPossibleTime,
            },
          )}
        ></div>
      </div>
      <span className="text-gray-60 text-md-200">
        {isPossibleTime ? '되는' : '안되는'} 시간 체크
      </span>
    </div>
  );
}
