import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/button/Button/Button';
import { FooterContext } from '@/contexts/FooterContext';

interface BottomButtonProps {
  disabled: boolean;
  onClick: () => void;
  isPending: boolean;
}

export default function BottomButton({
  disabled,
  onClick,
  isPending,
}: BottomButtonProps) {
  const { isFooterShown } = useContext(FooterContext);

  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {!isFooterShown && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { duration: 0.15 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.15 },
          }}
          className="fixed inset-x-0 bottom-0 z-20 px-4 py-3"
        >
          <AnimatePresence>
            {isPending && (
              <motion.div
                initial={{
                  transform: 'translateY(0)',
                }}
                animate={{
                  transform: 'translateY(-100%)',
                }}
                exit={{
                  transform: 'translateY(0)',
                }}
                className="absolute left-0 top-0 w-full -translate-y-full rounded-t-lg bg-primary-50 px-4 py-1.5 text-center text-gray-00 text-md-300"
              >
                {t('MyScheduleEverytimeEditPage.pendingMessage')}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute left-0 top-0 h-full w-full bg-gray-00" />
          <Button
            variant="black"
            onClick={onClick}
            fullWidth
            disabled={disabled}
            className="relative"
          >
            {isPending
              ? t('MyScheduleEverytimeEditPage.submitting')
              : t('MyScheduleEverytimeEditPage.submit')}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
