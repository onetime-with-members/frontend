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

export const speechBalloonMotionProps = ({
  vertical,
  offset,
}: {
  vertical: 'top' | 'bottom';
  offset: number;
}) => {
  const ANIMATION_OFFSET = 20;
  const TRIANGLE_HEIGHT = 6;

  return {
    variants: {
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
    },
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    transition: {
      duration: 0.5,
    },
  };
};
