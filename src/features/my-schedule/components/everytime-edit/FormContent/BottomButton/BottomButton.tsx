import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import Button from '@/components/button';
import { FooterContext } from '@/features/set-up/contexts/FooterContext';
import cn from '@/lib/cn';
import { opacityMotionProps, translateYMotionProps } from '@/lib/motion-props';

export default function BottomButton({
  disabled,
  errorCode,
  isTouched,
  isPending,
}: {
  disabled: boolean;
  errorCode: string | null;
  isTouched: boolean;
  isPending: boolean;
}) {
  const { isFooterShown } = useContext(FooterContext);

  const t = useTranslations('mySchedule.pages.MyScheduleEverytimeEditPage');

  const message = isPending
    ? t('pendingMessage')
    : errorCode === 'E_BAD_REQUEST'
      ? t('invalidURLMessage')
      : errorCode === 'FIXED-002'
        ? t('privateURLMessage')
        : errorCode === 'FIXED-005'
          ? t('emptyTimetable')
          : t('serverErrorMessage');

  return (
    <AnimatePresence>
      {!isFooterShown && (
        <motion.div
          {...opacityMotionProps}
          className="fixed inset-x-0 bottom-0 z-20 bg-gray-00"
        >
          <div className="relative mx-auto max-w-screen-sm px-4 py-3">
            <AnimatePresence>
              {(isPending || errorCode) && !isTouched && (
                <motion.div
                  {...translateYMotionProps}
                  className={cn(
                    'absolute left-0 right-0 top-0 -translate-y-full rounded-t-xl bg-primary-50 px-4 py-1.5 text-center text-gray-00 text-md-300',
                    {
                      'bg-danger-50': errorCode,
                    },
                  )}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute left-0 top-0 h-full w-full bg-gray-00" />
            <Button
              type="submit"
              variant="black"
              fullWidth
              disabled={disabled}
              className="relative"
            >
              {t('submit')}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
