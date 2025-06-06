'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import { BottomButton } from './button';
import Input from '@/components/input';
import { EverytimeScheduleContext } from '@/contexts/everytime-schedule';
import { submitEverytimeUrl } from '@/lib/actions';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FormContent() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [everytimeUrl, setEverytimeUrl] = useState('');
  const [error, setError] = useState<{ code: string } | null>(null);

  const { setEverytimeSchedule } = useContext(EverytimeScheduleContext);

  const router = useRouter();
  const searchParams = useSearchParams();

  const t = useTranslations('everytimeScheduleEdit');
  const locale = useLocale();

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

    const formData = new FormData();
    formData.set('everytimeUrl', everytimeUrl);
    const { everytimeSchedule: data, error: errorData } =
      await submitEverytimeUrl(formData);

    if (!data) {
      setError(errorData);
      return;
    }

    setEverytimeSchedule(data);
    const editPagePathname = '/mypage/schedules/edit';
    if (searchParams.get('from') !== editPagePathname) {
      router.replace(editPagePathname);
    } else {
      router.back();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
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
        error={error}
        isTouched={isTouched}
      />
    </form>
  );
}
