import { CheckIcon } from '@/components/icon';
import cn from '@/lib/cn';

export default function Checkbox({
  checked,
  onCheck,
}: {
  checked: boolean;
  onCheck?: (event: React.MouseEvent) => void;
}) {
  return (
    <div
      className={cn(
        'policy-checkbox flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-gray-15 text-xl',
        {
          'bg-primary-40': checked,
        },
      )}
      onClick={onCheck}
    >
      <CheckIcon className="text-white" />
    </div>
  );
}
