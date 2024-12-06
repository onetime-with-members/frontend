import clsx from 'clsx';

import BadgeButton from '../button/BadgeButton';
import { IconPlus } from '@tabler/icons-react';

interface BadgeFloatingBottomButtonProps {
  onClick: () => void;
  name: string;
  className?: string;
  variant?: 'primary' | 'black';
}

export default function BadgeFloatingBottomButton({
  onClick,
  name,
  className,
  variant = 'primary',
}: BadgeFloatingBottomButtonProps) {
  return (
    <>
      <div
        className={clsx(
          'fixed bottom-8 left-1/2 flex -translate-x-1/2 justify-center',
          className,
        )}
      >
        <BadgeButton onClick={onClick} variant={variant}>
          <span className="flex items-center justify-center gap-1">
            <span>{name}</span>
            <span>
              <IconPlus size={24} />
            </span>
          </span>
        </BadgeButton>
      </div>
    </>
  );
}
