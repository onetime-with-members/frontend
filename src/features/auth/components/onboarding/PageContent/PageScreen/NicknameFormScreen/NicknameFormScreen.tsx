import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import ScreenLayout from '../ScreenLayout';
import NicknameFormControl from '@/features/user/components/shared/NicknameFormControl';
import { OnboardingContext } from '@/features/user/contexts/OnboardingContext';
import useNicknameForm from '@/features/user/hooks/useNicknameForm';

export default function NicknameFormScreen() {
  const {
    moveToPrevPage,
    onboardingValue,
    handleSubmit: handleOnboardingSubmit,
    setOnboardingValue,
  } = useContext(OnboardingContext);

  const {
    register,
    formState: { errors, isValid },
  } = useNicknameForm({ onboardingValue });

  const t = useTranslations('auth.pages.OnboardingPage');

  function handleChange(value: string) {
    setOnboardingValue('nickname', value);
  }

  return (
    <ScreenLayout
      title={t.rich('title2', {
        br: () => <br className="md:hidden" />,
      })}
      disabled={!isValid}
      onBackButtonClick={moveToPrevPage}
      onSubmit={handleOnboardingSubmit}
    >
      <NicknameFormControl
        registerNickname={register('nickname')}
        errors={errors}
        onChange={(e) => handleChange(e.target.value)}
      />
    </ScreenLayout>
  );
}
