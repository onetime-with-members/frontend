import { useState } from 'react';
import { Trans } from 'react-i18next';

import ScreenLayout from '../ScreenLayout/ScreenLayout';
import NicknameFormControl from '@/components/NicknameFormControl/NicknameFormControl';
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
      title={
        <Trans i18nKey="onboarding.title2">
          회원님의 <br className="md:hidden" />
          이름을 알려주세요
        </Trans>
      }
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
