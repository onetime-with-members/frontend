import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import BottomButton from './BottomButton';
import ImageGuide from './ImageGuide';
import InputContent from './InputContent';
import { useSubmitEverytimeURLMutation } from '@/features/my-schedule/api';
import { EverytimeUrlFormType } from '@/lib/validation/form-types';
import { everytimeUrlSchema } from '@/lib/validation/schema';
import { useProgressRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FormContent() {
  const [isTouched, setIsTouched] = useState(false);

  const router = useRouter();
  const progressRouter = useProgressRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<EverytimeUrlFormType>({
    resolver: zodResolver(everytimeUrlSchema),
  });

  const { submitEverytimeUrl, error, isPending } =
    useSubmitEverytimeURLMutation();

  const onSubmit: SubmitHandler<EverytimeUrlFormType> = async ({ url }) => {
    setIsTouched(false);
    await submitEverytimeUrl(url);

    const editPagePathname = '/mypage/schedule/edit';
    if (searchParams.get('from') !== editPagePathname) {
      progressRouter.replace(editPagePathname);
    } else {
      router.back();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
    >
      <div className="mx-auto flex max-w-screen-sm flex-col gap-6">
        <InputContent
          registerUrl={register('url')}
          onTouched={() => setIsTouched(true)}
        />
        <ImageGuide />
      </div>
      <BottomButton
        disabled={!isValid}
        errorCode={error?.response.data.code || null}
        isTouched={isTouched}
        isPending={isPending}
      />
    </form>
  );
}
