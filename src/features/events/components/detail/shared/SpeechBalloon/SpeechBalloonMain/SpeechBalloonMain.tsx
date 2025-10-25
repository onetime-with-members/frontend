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
  position = 'top',
  tilt = 'none',
  ...props
}: {
  width: number;
  offset: number;
  position?: 'top' | 'bottom';
  tilt?: 'right' | 'left' | 'none';
  children: React.ReactNode;
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
                position === 'bottom'
                  ? `translate(4px, calc(100% + ${offset + ANIMATION_OFFSET + TRIANGLE_HEIGHT}px))`
                  : `translate(4px, calc(-100% - ${offset + ANIMATION_OFFSET + TRIANGLE_HEIGHT}px))`,
            },
            visible: {
              opacity: 1,
              transform:
                position === 'bottom'
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
              '-left-1/2 top-0': position === 'top',
              '-left-1/2 bottom-0': position === 'bottom',
            },
            className,
          )}
          style={{
            ...style,
            width,
          }}
          {...props}
        >
          {position === 'bottom' && (
            <div className="absolute left-1/2 -translate-x-1/2">
              <RoundedTriangle className="rotate-180" />
            </div>
          )}
          <div
            className={cn(
              'w-full rounded-lg bg-primary-50 px-3 py-1.5 text-center text-gray-00 text-sm-200',
              {
                'translate-x-6': tilt === 'right',
                '-translate-x-6': tilt === 'left',
              },
            )}
          >
            {children}
          </div>
          {position === 'top' && (
            <div className="absolute left-1/2 -translate-x-1/2">
              <RoundedTriangle />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
