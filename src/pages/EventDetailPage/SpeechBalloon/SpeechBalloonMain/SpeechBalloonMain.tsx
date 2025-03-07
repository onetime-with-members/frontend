import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import RoundedTriangle from './RoundedTriangle/RoundedTriangle';
import cn from '@/utils/cn';

interface SpeechBalloonProps extends HTMLMotionProps<'div'> {
  width: number;
  offset: number;
  position?: 'top' | 'bottom';
  children: React.ReactNode;
}

export default function SpeechBalloonMain({
  children,
  className,
  style,
  width,
  offset,
  position = 'top',
  ...props
}: SpeechBalloonProps) {
  const [isShown, setIsShown] = useState(true);

  const speechBalloonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        speechBalloonRef.current &&
        !speechBalloonRef.current.contains(e.target as Node)
      ) {
        setIsShown(false);
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
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
                  ? `translateY(calc(100% + ${offset + 20}px))`
                  : `translateY(calc(-100% - ${offset + 20}px))`,
            },
            visible: {
              opacity: 1,
              transform:
                position === 'bottom'
                  ? `translateY(calc(100% + ${offset}px))`
                  : `translateY(calc(-100% - ${offset}px))`,
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
            'absolute',
            {
              'top-0': position === 'top',
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
            <div className="ml-4">
              <RoundedTriangle className="rotate-180" />
            </div>
          )}
          <div className="w-full rounded-lg bg-primary-40 px-3 py-1.5 text-center text-gray-00 text-sm-200">
            {children}
          </div>
          {position === 'top' && (
            <div className="ml-4">
              <RoundedTriangle />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
