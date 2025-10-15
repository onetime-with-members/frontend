import { MotionProps } from 'framer-motion';

export const opacityMotionProps: MotionProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.15 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export const translateYMotionProps: MotionProps = {
  initial: {
    transform: 'translateY(0)',
  },
  animate: {
    transform: 'translateY(-100%)',
  },
  exit: {
    transform: 'translateY(0)',
  },
};
