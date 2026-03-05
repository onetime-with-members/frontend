import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import RoundedTriangle from './RoundedTriangle';
import cn from '@/lib/cn';
import { speechBalloonMotionProps } from '@/lib/motion-props';

export default function SpeechBalloonMain({
  children,
  className,
  style,
  width,
  offset,
  triangleOffset,
  vertical = 'top',
  horizontal = 'center',
  variant = 'primary',
  ...props
}: {
  width: number;
  offset: number;
  triangleOffset?: number;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
} & HTMLMotionProps<'div'>) {
  const [isShown, setIsShown] = useState(true);

  const speechBalloonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (
        speechBalloonRef.current &&
        !speechBalloonRef.current.contains(e.target as Node)
      ) {
        setIsShown(false);
      }
    }

    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.addEventListener('touchend', handleClickOutside);
    };
  }, []);

  return (
    <AnimatePresence>
      {isShown && (
        <motion.div
          ref={speechBalloonRef}
          {...speechBalloonMotionProps({ vertical, offset })}
          className={cn(
            'absolute z-10',
            {
              'top-0': vertical === 'top',
              'bottom-0': vertical === 'bottom',
            },
            {
              '-left-1/2': horizontal === 'center',
              'right-0': horizontal === 'right',
              'left-0': horizontal === 'left',
            },
            className,
          )}
          style={{
            ...style,
            width,
          }}
          {...props}
        >
          {vertical === 'bottom' && (
            <RoundedTriangle
              variant={variant}
              vertical={vertical}
              horizontal={horizontal}
              triangleOffset={triangleOffset}
            />
          )}
          <div
            className={cn(
              'w-full rounded-lg bg-primary-50 px-3 py-1.5 text-center text-gray-00 shadow-[0_2px_8px_0_rgba(0,0,0,0.15)] text-sm-200',
              {
                'bg-primary-50 text-gray-00': variant === 'primary',
                'bg-gray-00 text-primary-50': variant === 'secondary',
              },
            )}
          >
            {children}
          </div>
          {vertical === 'top' && (
            <RoundedTriangle
              variant={variant}
              vertical={vertical}
              horizontal={horizontal}
              triangleOffset={triangleOffset}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
