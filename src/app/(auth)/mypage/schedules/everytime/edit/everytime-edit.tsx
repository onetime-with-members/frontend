'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import Button from '@/components/button';
import Input from '@/components/input';
import { EverytimeScheduleContext } from '@/contexts/everytime-schedule';
import { FooterContext } from '@/contexts/footer';
import { submitEverytimeUrlApi } from '@/lib/api/actions';
import cn from '@/lib/cn';
import { ExtendedAxiosError } from '@/lib/types';
import { useProgressRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MyScheduleEverytimeEditPage() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [everytimeUrl, setEverytimeUrl] = useState('');

  const { setEverytimeSchedule } = useContext(EverytimeScheduleContext);

  const router = useRouter();
  const progressRouter = useProgressRouter();
  const searchParams = useSearchParams();

  const t = useTranslations('everytimeScheduleEdit');
  const locale = useLocale();

  const {
    mutateAsync: submitEverytimeUrl,
    error,
    isPending,
  } = useMutation({
    mutationFn: submitEverytimeUrlApi,
    onSuccess: (data) => {
      setEverytimeSchedule(data);
      const editPagePathname = '/mypage/schedules/edit';
      if (searchParams.get('from') !== editPagePathname) {
        progressRouter.replace(editPagePathname);
      } else {
        router.back();
      }
    },
  });

  const axiosError = error as ExtendedAxiosError | null;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEverytimeUrl(e.target.value);
    setIsTouched(true);
    if (e.target.value === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsTouched(false);
    await submitEverytimeUrl(everytimeUrl);
  }

  return (
    <>
      {/* Top App Bar */}
      <nav className="h-[64px]">
        <div className="fixed z-10 flex h-[4rem] w-full justify-center bg-gray-00 px-4">
          <div className="relative mx-auto flex w-full max-w-screen-sm">
            <div className="absolute left-0 flex h-full items-center">
              <button onClick={() => progressRouter.back()}>
                <IconChevronLeft size={24} />
              </button>
            </div>
            <div className="flex w-full items-center justify-center whitespace-nowrap text-gray-90 text-lg-300">
              {t('title')}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 pb-20 pt-4">
        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
        >
          <div className="mx-auto flex max-w-screen-sm flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-gray-40 text-md-100">{t('description')}</p>
              <Input
                value={everytimeUrl}
                onChange={handleInputChange}
                placeholder={t('placeholder')}
              />
              <p className="text-gray-40 text-sm-100">* {t('publicWarning')}</p>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={
                  locale === 'ko'
                    ? '/images/everytime-url-guide-ko.png'
                    : '/images/everytime-url-guide-en.png'
                }
                alt="Setting Icon -> Copy URL"
                width={640}
                height={792}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <BottomButton
            disabled={buttonDisabled}
            errorCode={axiosError?.response.data.code || null}
            isTouched={isTouched}
            isPending={isPending}
          />
        </form>
      </main>
    </>
  );
}

function BottomButton({
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
              {(isPending || errorCode) && !isTouched && (
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
                      'bg-danger-50': errorCode,
                    },
                  )}
                >
                  {t.rich(
                    isPending
                      ? 'pendingMessage'
                      : errorCode === 'CRAWLING-002'
                        ? 'invalidURLMessage'
                        : errorCode === 'CRAWLING-003'
                          ? 'privateURLMessage'
                          : 'serverErrorMessage',
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
              {isPending ? t('submitting') : t('submit')}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
