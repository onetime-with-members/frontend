import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';

import ScreenLayout from '../ScreenLayout';
import NicknameFormControl from '@/features/user/components/shared/NicknameFormControl';
import { OnboardingContext } from '@/features/user/contexts/OnboardingContext';
import useNicknameForm from '@/features/user/hooks/useNicknameForm';
import { ProfileNicknameSchema } from '@/features/user/types';

export default function NicknameFormScreen() {
  const {
    moveToNextPage,
    moveToPrevPage,
    onboardingValue,
    setOnboardingValue,
  } = useContext(OnboardingContext);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useNicknameForm({ onboardingValue });

  const t = useTranslations('auth.pages.OnboardingPage');

  const onSubmit: SubmitHandler<ProfileNicknameSchema> = ({ nickname }) => {
    setOnboardingValue('nickname', nickname);
    moveToNextPage();
  };

  return (
    <ScreenLayout
      title={t.rich('title2', {
        br: () => <br className="md:hidden" />,
      })}
      disabled={!isValid}
      onBackButtonClick={moveToPrevPage}
      onSubmit={handleSubmit(onSubmit)}
    >
      <NicknameFormControl
        registerNickname={register('nickname')}
        errors={errors}
      />
    </ScreenLayout>
  );
}
