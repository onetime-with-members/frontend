import React from 'react';

import checkIcon from '@/assets/red-checkbox-check-icon.svg';
import cn from '@/utils/cn';

interface RedCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  isChecked: boolean;
}

export default function RedCheckbox({
  isChecked,
  className,
  ...rest
}: RedCheckboxProps) {
  return (
    <div
      className={cn(
        'flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border border-danger-20 bg-gray-00',
        {
          'border-danger-50 bg-danger-50': isChecked,
        },
        className,
      )}
      {...rest}
    >
      {isChecked && <img src={checkIcon} alt="체크 아이콘" />}
    </div>
  );
}
