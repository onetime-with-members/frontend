import clsx from 'clsx';

interface AvailableToggleProps {
  isAvailable: boolean;
  onToggle: () => void;
}

export default function AvailableToggle({
  isAvailable,
  onToggle,
}: AvailableToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={clsx(
          'flex h-6 w-12 cursor-pointer items-center rounded-full px-1 duration-150',
          {
            'bg-primary-50': isAvailable,
            'bg-danger-50': !isAvailable,
          },
        )}
        onClick={onToggle}
      >
        <div
          className={clsx(
            'h-[18px] w-[18px] rounded-full bg-white duration-150',
            {
              'translate-x-0': isAvailable,
              'translate-x-[22px]': !isAvailable,
            },
          )}
        ></div>
      </div>
      <span className="text-md-200 text-gray-60">
        {isAvailable ? '되는' : '안되는'} 시간 체크
      </span>
    </div>
  );
}
