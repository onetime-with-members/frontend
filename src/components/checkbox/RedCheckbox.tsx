import clsx from 'clsx';
import React from 'react';

import checkIcon from '../../assets/red-checkbox-check-icon.svg';

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
      className={clsx(
        'flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border',
        {
          'border-danger-50 bg-danger-50': isChecked,
          'border-danger-20 bg-gray-00': !isChecked,
        },
        className,
      )}
      {...rest}
    >
      {isChecked && <img src={checkIcon} alt="체크 아이콘" />}
    </div>
  );
}
