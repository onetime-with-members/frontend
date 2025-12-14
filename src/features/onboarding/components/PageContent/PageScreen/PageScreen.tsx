import { getCookie } from 'cookies-next';
import { useLocale } from 'next-intl';
import { SubmitHandler } from 'react-hook-form';

import NicknameFormScreen from './NicknameFormScreen';
import PolicyScreen from './PolicyScreen';
import SleepTimeScreen from './SleepTimeScreen';
import WelcomeScreen from './WelcomeScreen';
import { REDIRECT_URL } from '@/features/auth/constants';
import useHomeUrl from '@/features/home/hooks/useHomeUrl';
import useOnboardingForm from '@/features/onboarding/hooks/useOnboardingForm';
import { useCreateUserMutation } from '@/features/user/api/user.query';
import { OnboardingSchema } from '@/features/user/types';
import { useRouter } from '@/i18n/navigation';

export default function PageScreen({
  name,
  registerToken,
  pageIndex,
  setPageIndex,
  moveToNextPage,
}: {
  name: string;
  registerToken: string;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  moveToNextPage: () => void;
}) {
  const locale = useLocale();
  const router = useRouter();

  const homeUrl = useHomeUrl();

  const { createUser } = useCreateUserMutation();

  const redirectUrl = getCookie(REDIRECT_URL);

  const { handleSubmit, watch, setValue } = useOnboardingForm({ name });

  const onSubmit: SubmitHandler<OnboardingSchema> = async (data) => {
    try {
      await createUser({
        ...data,
        registerToken,
        language: locale === 'ko' ? 'KOR' : 'ENG',
      });
      moveToNextPage();
    } catch {
      router.replace(`/login?redirect_url=${redirectUrl || homeUrl}`);
    }
  };

  return (
    <>
      {pageIndex === 0 && (
        <PolicyScreen
          page={pageIndex}
          setPage={setPageIndex}
          onboardingValue={watch()}
          setOnboardingValue={setValue}
        />
      )}
      {pageIndex === 1 && (
        <NicknameFormScreen
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          onboardingValue={watch()}
          setOnboardingValue={setValue}
        />
      )}
      {pageIndex === 2 && (
        <SleepTimeScreen
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          onboardingValue={watch()}
          setOnboardingValue={setValue}
          onSubmit={handleSubmit(onSubmit)}
        />
      )}
      {pageIndex === 3 && <WelcomeScreen nickname={watch('nickname')} />}
    </>
  );
}
