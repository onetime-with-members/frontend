import { HumanIcon } from '@/components/icon';
import cn from '@/lib/cn';

export default function PaticipantStatus({
  participantCount,
}: {
  participantCount: { possible: number; total: number };
}) {
  const isAllPossible = participantCount.possible === participantCount.total;

  return (
    <div className="flex items-center">
      <span
        className={cn('text-lg text-gray-20', {
          'text-success-60': isAllPossible,
        })}
      >
        <HumanIcon />
      </span>
      <span
        className={cn('text-gray-30 text-sm-200', {
          'text-success-60': isAllPossible,
        })}
      >
        {participantCount.possible}/{participantCount.total}
      </span>
    </div>
  );
}
