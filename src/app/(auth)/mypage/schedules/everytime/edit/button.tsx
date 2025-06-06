'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import { useFormStatus } from 'react-dom';

import Button from '@/components/button/button';
import { FooterContext } from '@/contexts/footer';
import cn from '@/lib/cn';
import { IconChevronLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <IconChevronLeft size={24} />
    </button>
  );
}

export function BottomButton({
  disabled,
  error,
  isTouched,
}: {
  disabled: boolean;
  error: { code: string } | null;
  isTouched: boolean;
}) {
  const { isFooterShown } = useContext(FooterContext);

  const { pending } = useFormStatus();

  const t = useTranslations('everytimeScheduleEdit');

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
              {(pending || error) && !isTouched && (
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
                      'bg-danger-50': error,
                    },
                  )}
                >
                  {t.rich(
                    pending
                      ? 'pendingMessage'
                      : error?.code === 'CRAWLING-002'
                        ? 'invalidURLMessage'
                        : error?.code === 'CRAWLING-003'
                          ? 'privateURLMessage'
                          : 'serverErrorMessage',
                    {
                      br: () => (
                        <br
                          className={cn('hidden', {
                            'min-[250px]:block min-[415px]:hidden': pending,
                            'min-[295px]:block min-[495px]:hidden':
                              !pending && error?.code === 'CRAWLING-002',
                            'min-[400px]:block sm:hidden':
                              !pending && error?.code === 'CRAWLING-003',
                            'min-[405px]:block min-[530px]:hidden':
                              !pending &&
                              !['CRAWLING-002', 'CRAWLING-003'].includes(
                                error?.code as string,
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
              type="submit"
              variant="black"
              fullWidth
              disabled={disabled}
              className="relative"
            >
              {pending ? t('submitting') : t('submit')}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
