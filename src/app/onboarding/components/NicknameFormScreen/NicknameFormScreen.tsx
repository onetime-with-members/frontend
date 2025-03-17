import { useTranslations } from 'next-intl';
import { useState } from 'react';

import ScreenLayout from '../ScreenLayout/ScreenLayout';
import NicknameFormControl from '@/components/form-control/NicknameFormControl/NicknameFormControl';
import { OnboardingValueType } from '@/types/user.type';

interface NicknameFormProps {
  isVisible: boolean;
  page: number;
  value: OnboardingValueType;
  setValue: React.Dispatch<React.SetStateAction<OnboardingValueType>>;
  handleNextButtonClick: (disabled: boolean) => void;
  handleBackButtonClick: () => void;
}

export default function NicknameFormScreen({
  isVisible,
  page,
  value,
  setValue,
  handleNextButtonClick,
  handleBackButtonClick,
}: NicknameFormProps) {
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
      handleNextButtonClick={() => handleNextButtonClick(disabled)}
      handleBackButtonClick={handleBackButtonClick}
    >
      <NicknameFormControl
        value={value.nickname}
        onChange={handleInputChange}
        setSubmitDisabled={setDisabled}
      />
    </ScreenLayout>
  );
}
