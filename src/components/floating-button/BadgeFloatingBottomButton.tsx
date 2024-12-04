import clsx from 'clsx';

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
      <section
        className={clsx(
          'fixed bottom-8 left-1/2 flex -translate-x-1/2 justify-center',
          className,
        )}
      >
        <button
          onClick={onClick}
          className={clsx(
            'flex items-center gap-1 rounded-full px-6 py-3 text-gray-00 shadow-[0_0_30px_0_rgba(0,0,0,0.15)]',
            {
              'bg-primary-50': variant === 'primary',
              'bg-gray-90': variant === 'black',
            },
          )}
        >
          <span className="text-md-200">{name}</span>
          <IconPlus size={20} />
        </button>
      </section>
    </>
  );
}
