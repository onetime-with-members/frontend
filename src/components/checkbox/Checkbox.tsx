import cn from '@/utils/cn';
import { IconCheck } from '@tabler/icons-react';

interface CheckboxProps {
  isChecked: boolean;
  onClick?: () => void;
}

export default function Checkbox({ isChecked, onClick }: CheckboxProps) {
  return (
    <div
      className={cn(
        'h-5 w-5 cursor-pointer rounded border-2 border-gray-20 bg-gray-00',
        {
          'flex items-center justify-center border-primary-50 bg-primary-50':
            isChecked,
        },
      )}
      onClick={onClick}
    >
      {isChecked && <IconCheck size={12} className="text-gray-00" stroke={4} />}
    </div>
  );
}
