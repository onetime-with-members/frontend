import { HTMLMotionProps, motion } from 'framer-motion';

import cn from '@/utils/cn';
import { IconTriangleInvertedFilled } from '@tabler/icons-react';

interface CircleArrowButtonProps extends HTMLMotionProps<'button'> {
  direction?: 'left' | 'right';
}

export default function CircleArrowButton({
  direction = 'right',
  className,
  ...rest
}: CircleArrowButtonProps) {
  return (
    <motion.button
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-full bg-gray-00 shadow-lg drop-shadow-[0_0_24px_rgba(0,0,0,0.25)]',
        className,
      )}
      {...rest}
    >
      <IconTriangleInvertedFilled
        size={12}
        className={cn({
          'rotate-90': direction === 'left',
          '-rotate-90': direction === 'right',
        })}
      />
    </motion.button>
  );
}
