import clsx from 'clsx';

import { IconCheck } from '@tabler/icons-react';

interface CheckboxProps {
  isChecked: boolean;
  onClick?: () => void;
}

export default function Checkbox({ isChecked, onClick }: CheckboxProps) {
  return (
    <div
      className={clsx('h-5 w-5 cursor-pointer rounded border-2', {
        'flex items-center justify-center border-primary-50 bg-primary-50':
          isChecked,
        'border-gray-20 bg-gray-00': !isChecked,
      })}
      onClick={onClick}
    >
      {isChecked && <IconCheck size={12} className="text-gray-00" stroke={4} />}
    </div>
  );
}
