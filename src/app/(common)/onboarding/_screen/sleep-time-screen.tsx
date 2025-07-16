import { getCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';

import ScreenLayout from './screen-layout';
import TimeDropdown from '@/components/dropdown/time-dropdown';
import SleepIcon from '@/components/icon/sleep';
import { createUserAction, signInAction } from '@/lib/api/actions';
import { OnboardingType } from '@/lib/types';
import { SleepTimeFormType } from '@/lib/validation/form-types';
import { sleepTimeSchema } from '@/lib/validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function SleepTimeScreen({
  pageIndex,
  setPageIndex,
  onboardingValue,
  setOnboardingValue,
}: {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  onboardingValue: OnboardingType;
  setOnboardingValue: React.Dispatch<React.SetStateAction<OnboardingType>>;
}) {
  const { handleSubmit, watch, setValue } = useForm<SleepTimeFormType>({
    resolver: zodResolver(sleepTimeSchema),
    defaultValues: {
      startSleepTime: onboardingValue.startSleepTime,
      endSleepTime: onboardingValue.endSleepTime,
    },
  });

  const t = useTranslations('onboarding');
  const router = useRouter();
  const queryClient = useQueryClient();

  const redirectUrl = getCookie('redirect-url');

  const { mutateAsync: createUser } = useMutation({
    mutationFn: createUserAction,
    onSuccess: async (data) => {
      await signInAction({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      setPageIndex((prev) => prev + 1);
    },
    onError: (error) => {
      console.error(error);
      router.replace(`/login?redirect_url=${redirectUrl || '/'}`);
    },
  });

  const onSubmit: SubmitHandler<SleepTimeFormType> = async ({
    startSleepTime,
    endSleepTime,
  }) => {
    const finalOnboardingValue = {
      ...onboardingValue,
      startSleepTime,
      endSleepTime,
    };
    setOnboardingValue(finalOnboardingValue);
    await createUser(finalOnboardingValue);
  };

  return (
    <ScreenLayout
      pageIndex={pageIndex}
      title={t.rich('title3', {
        br: () => <br />,
      })}
      onSubmit={handleSubmit(onSubmit)}
      onBackButtonClick={() => setPageIndex((prev) => prev - 1)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <span>
            <SleepIcon />
          </span>
          <span className="text-gray-80 text-md-300">{t('sleepTime')}</span>
        </div>
        <div className="flex items-center gap-4">
          <TimeDropdown
            time={watch('startSleepTime')}
            setTime={(time) => setValue('startSleepTime', time)}
            className="flex-1"
          />
          <span className="text-gray-40 text-md-300">-</span>
          <TimeDropdown
            time={watch('endSleepTime')}
            setTime={(time) => setValue('endSleepTime', time)}
            className="flex-1"
          />
        </div>
        <p className="text-gray-40 text-sm-200">{t('description3')}</p>
      </div>
    </ScreenLayout>
  );
}
