import { useTranslations } from 'next-intl';
import { useState } from 'react';

import ScreenLayout from './screen-layout';
import NicknameFormControl from '@/components/user/nickname-form-control';
import { OnboardingValueType } from '@/lib/types';

export default function NicknameFormScreen({
  isVisible,
  page,
  value,
  setValue,
  onNextButtonClick: handleNextButtonClick,
  onBackButtonClick: handleBackButtonClick,
}: {
  isVisible: boolean;
  page: number;
  value: OnboardingValueType;
  setValue: React.Dispatch<React.SetStateAction<OnboardingValueType>>;
  onNextButtonClick: (disabled: boolean) => void;
  onBackButtonClick: () => void;
}) {
  const [disabled, setDisabled] = useState(true);

  const t = useTranslations('onboarding');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <ScreenLayout
      isVisible={isVisible}
      page={page}
      title={t.rich('title2', {
        br: () => <br className="md:hidden" />,
      })}
      disabled={disabled}
      onNextButtonClick={() => handleNextButtonClick(disabled)}
      onBackButtonClick={handleBackButtonClick}
    >
      <NicknameFormControl
        value={value.nickname}
        onChange={handleInputChange}
        setSubmitDisabled={setDisabled}
      />
    </ScreenLayout>
  );
}
