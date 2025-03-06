import { HTMLMotionProps, motion } from 'framer-motion';

import RoundedTriangle from './RoundedTriangle/RoundedTriangle';
import cn from '@/utils/cn';

interface SpeechBalloonProps extends HTMLMotionProps<'div'> {
  width: number;
  offset: number;
  children: React.ReactNode;
}

export default function SpeechBalloonMain({
  children,
  className,
  style,
  width,
  offset,
  ...props
}: SpeechBalloonProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        transform: `translateY(calc(-100% - ${offset + 20}px))`,
      }}
      animate={{
        opacity: 1,
        transform: `translateY(calc(-100% - ${offset}px))`,
      }}
      exit={{
        opacity: 0,
        transform: `translateY(calc(-100% - ${offset + 20}px))`,
      }}
      transition={{
        duration: 0.5,
      }}
      className={cn('absolute top-0', className)}
      style={{
        ...style,
        width,
        transform: `translateY(calc(-100% - ${offset}px))`,
      }}
      {...props}
    >
      <div className="w-full rounded-lg bg-primary-40 px-3 py-1.5 text-center text-gray-00 text-sm-200">
        {children}
      </div>
      <div className="ml-4">
        <RoundedTriangle />
      </div>
    </motion.div>
  );
}
