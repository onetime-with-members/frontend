'use client';

import { deleteCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Button from '@/components/button';
import { withdrawApi } from '@/lib/api/mutations';
import cn from '@/lib/cn';
import { IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function WithdrawPage() {
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();
  const t = useTranslations('withdraw');

  const { mutateAsync: withdraw } = useMutation({
    mutationFn: withdrawApi,
    onSuccess: async () => {
      await deleteCookie('session');
      router.push('/');
      router.refresh();
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isChecked) return;
    await withdraw();
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

export function GrayBox({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-gray-05 p-6">
      <h2 className="text-gray-60 text-lg-300">{title}</h2>
      <p className="text-gray-40 text-md-200">{description}</p>
    </div>
  );
}

export function RedCheckbox({
  isChecked,
  className,
  ...rest
}: {
  isChecked: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border border-danger-20 bg-gray-00',
        {
          'border-danger-50 bg-danger-50': isChecked,
        },
        className,
      )}
      {...rest}
    >
      {isChecked && (
        <Image
          src="/images/red-checkbox-check-icon.svg"
          alt="체크 아이콘"
          width={14}
          height={10}
        />
      )}
    </div>
  );
}
