import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import RoundedTriangle from './RoundedTriangle';
import cn from '@/lib/cn';

export default function SpeechBalloonMain({
  children,
  className,
  style,
  width,
  offset,
  vertical = 'top',
  horizontal = 'center',
  tilt = 'none',
  variant = 'primary',
  ...props
}: {
  width: number;
  offset: number;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
  tilt?: 'right' | 'left' | 'none';
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
} & HTMLMotionProps<'div'>) {
  const [isShown, setIsShown] = useState(true);

  const speechBalloonRef = useRef<HTMLDivElement | null>(null);

  const ANIMATION_OFFSET = 20;
  const TRIANGLE_HEIGHT = 6;

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
          variants={{
            hidden: {
              opacity: 0,
              transform:
                vertical === 'bottom'
                  ? `translate(4px, calc(100% + ${offset + ANIMATION_OFFSET + TRIANGLE_HEIGHT}px))`
                  : `translate(4px, calc(-100% - ${offset + ANIMATION_OFFSET + TRIANGLE_HEIGHT}px))`,
            },
            visible: {
              opacity: 1,
              transform:
                vertical === 'bottom'
                  ? `translate(4px, calc(100% + ${offset + TRIANGLE_HEIGHT}px))`
                  : `translate(4px, calc(-100% - ${offset + TRIANGLE_HEIGHT}px))`,
            },
            exit: {
              opacity: 0,
              transition: {
                duration: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: 0.5,
          }}
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
            <div
              className={cn('absolute -translate-y-full', {
                'left-1/2 -translate-x-1/2': horizontal === 'center',
                'right-10': horizontal === 'right',
                'left-10': horizontal === 'left',
              })}
            >
              <RoundedTriangle
                className="rotate-180"
                fill={variant === 'primary' ? '#4C65E5' : '#FFFFFF'}
              />
            </div>
          )}
          <div
            className={cn(
              'w-full rounded-lg bg-primary-50 px-3 py-1.5 text-center text-gray-00 shadow-[0_2px_8px_0_rgba(0,0,0,0.15)] text-sm-200',
              {
                'translate-x-6': tilt === 'right',
                '-translate-x-6': tilt === 'left',
              },
              {
                'bg-primary-50 text-gray-00': variant === 'primary',
                'bg-gray-00 text-primary-50': variant === 'secondary',
              },
            )}
          >
            {children}
          </div>
          {vertical === 'top' && (
            <div
              className={cn('absolute', {
                'left-1/2 -translate-x-1/2': horizontal === 'center',
                'right-10': horizontal === 'right',
                'left-10': horizontal === 'left',
              })}
            >
              <RoundedTriangle
                fill={variant === 'primary' ? '#4C65E5' : '#FFFFFF'}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
