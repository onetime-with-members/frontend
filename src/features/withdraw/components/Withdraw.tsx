'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { GrayBox } from './GrayBox';
import { RedCheckbox } from './RedCheckbox';
import Button from '@/components/button';
import { useRouter } from '@/i18n/navigation';
import { withdrawAction } from '@/lib/api/actions';
import { useAuth } from '@/lib/auth';
import { IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';

export default function Withdraw() {
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();
  const t = useTranslations('withdraw');

  const { withdraw: afterWithdraw } = useAuth();

  const { mutateAsync: withdraw } = useMutation({
    mutationFn: withdrawAction,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isChecked) return;
    await withdraw();
    await afterWithdraw();
  }

  return (
    <>
      {/* Top App Bar */}
      <header className="h-[4rem]">
        <div className="fixed h-[4rem] w-full bg-gray-00 px-4">
          <div className="mx-auto w-full max-w-screen-sm">
            <div className="flex w-full items-center justify-end py-5">
              <button onClick={() => router.back()}>
                <IconX size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-24">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-screen-sm flex-col items-center gap-10"
        >
          {/* Information */}
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-8">
              <div className="h-[160px] w-[160px]">
                <Image
                  src="/images/withdraw-clock.svg"
                  alt="깨진 시계 이미지"
                  width={160}
                  height={160}
                  className="h-full w-full"
                />
              </div>
              <h1 className="text-center text-gray-90 title-md-300">
                {t('mainTitle')}
              </h1>
            </div>
            <div className="flex w-full flex-col gap-4">
              <GrayBox title={t('title1')} description={t('description1')} />
              <GrayBox title={t('title2')} description={t('description2')} />
              <div
                className="flex cursor-pointer items-center gap-4 rounded-xl bg-danger-10 p-4"
                onClick={() => setIsChecked((prev) => !prev)}
              >
                <RedCheckbox isChecked={isChecked} />
                <div className="text-danger-60 text-md-200">
                  {t('agreeText')}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="danger"
            disabled={!isChecked}
            fullWidth
          >
            {t('withdraw')}
          </Button>
        </form>
      </main>
    </>
  );
}
