import { AxiosError } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import Button from '@/components/button/button';
import { FooterContext } from '@/contexts/FooterContext';
import cn from '@/lib/cn';

interface BottomButtonProps {
  disabled: boolean;
  onClick: () => void;
  isPending: boolean;
  isError: boolean;
  error: AxiosError | null;
  isTouched: boolean;
}

export default function BottomButton({
  disabled,
  onClick,
  isPending,
  isError,
  error,
  isTouched,
}: BottomButtonProps) {
  const { isFooterShown } = useContext(FooterContext);

  const t = useTranslations('MyScheduleEverytimeEditPage');

  const errorData = error?.response?.data as { code: string };

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
          className="fixed inset-x-0 bottom-0 z-20 bg-gray-00"
        >
          <div className="relative mx-auto max-w-screen-sm px-4 py-3">
            <AnimatePresence>
              {(isPending || isError) && !isTouched && (
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
                  className={cn(
                    'absolute left-0 right-0 top-0 -translate-y-full rounded-t-xl bg-primary-50 px-4 py-1.5 text-center text-gray-00 text-md-300',
                    {
                      'bg-danger-50': isError,
                    },
                  )}
                >
                  {t.rich(
                    isPending
                      ? 'pendingMessage'
                      : errorData?.code === 'CRAWLING-002'
                        ? 'invalidURLMessage'
                        : errorData?.code === 'CRAWLING-003'
                          ? 'privateURLMessage'
                          : 'serverErrorMessage',
                    {
                      br: () => (
                        <br
                          className={cn('hidden', {
                            'min-[250px]:block min-[415px]:hidden': isPending,
                            'min-[295px]:block min-[495px]:hidden':
                              !isPending && errorData?.code === 'CRAWLING-002',
                            'min-[400px]:block sm:hidden':
                              !isPending && errorData?.code === 'CRAWLING-003',
                            'min-[405px]:block min-[530px]:hidden':
                              !isPending &&
                              !['CRAWLING-002', 'CRAWLING-003'].includes(
                                errorData?.code,
                              ),
                          })}
                        />
                      ),
                    },
                  )}
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
              {isPending ? t('submitting') : t('submit')}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
