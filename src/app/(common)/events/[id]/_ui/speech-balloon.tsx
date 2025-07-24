'use client';

import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import cn from '@/lib/cn';

const ANIMATION_OFFSET = 20;
const TRIANGLE_HEIGHT = 6;

export default function SpeechBalloon() {
  return <></>;
}

SpeechBalloon.Container = SpeechBalloonContainer;
SpeechBalloon.Wrapper = SpeechBalloonWrapper;
SpeechBalloon.Main = SpeechBalloonMain;

function SpeechBalloonContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('relative', className)} {...props}>
      {children}
    </div>
  );
}

function SpeechBalloonWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SpeechBalloonMain({
  children,
  className,
  style,
  width,
  offset,
  position = 'top',
  ...props
}: {
  width: number;
  offset: number;
  position?: 'top' | 'bottom';
  children: React.ReactNode;
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
          variants={{
            hidden: {
              opacity: 0,
              transform:
                position === 'bottom'
                  ? `translateY(calc(100% + ${offset + ANIMATION_OFFSET + TRIANGLE_HEIGHT}px))`
                  : `translateY(calc(-100% - ${offset + ANIMATION_OFFSET + TRIANGLE_HEIGHT}px))`,
            },
            visible: {
              opacity: 1,
              transform:
                position === 'bottom'
                  ? `translateY(calc(100% + ${offset + TRIANGLE_HEIGHT}px))`
                  : `translateY(calc(-100% - ${offset + TRIANGLE_HEIGHT}px))`,
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
              'bottom-0': position === 'bottom',
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
          <div className="w-full rounded-lg bg-primary-50 px-3 py-1.5 text-center text-gray-00 text-sm-200">
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

function RoundedTriangle({
  width = 8,
  height = 6,
  fill = '#677CEE',
  className,
}: {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 8 6"
      fill="none"
      className={className}
    >
      <path
        d="M8 0H0L3.16795 4.75192C3.56377 5.34566 4.43623 5.34566 4.83205 4.75192L8 0Z"
        fill={fill}
      />
    </svg>
  );
}
