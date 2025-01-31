import { OnboardingValueType } from '..';
import { useState } from 'react';

import ScreenLayout from '../ScreenLayout';
import NicknameFormControl from '@/components/NicknameFormControl';

interface NicknameFormProps {
  isVisible: boolean;
  value: OnboardingValueType;
  setValue: React.Dispatch<React.SetStateAction<OnboardingValueType>>;
  handleNextButtonClick: (disabled: boolean) => void;
  page: number;
}

export default function NicknameFormScreen({
  isVisible,
  value,
  setValue,
  handleNextButtonClick,
  page,
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
      title={
        <>
          회원님의 <br className="md:hidden" />
          이름을 알려주세요
        </>
      }
      disabled={disabled}
      handleNextButtonClick={() => handleNextButtonClick(disabled)}
      page={page}
    >
      <NicknameFormControl
        value={value.nickname}
        onChange={handleInputChange}
        setSubmitDisabled={setDisabled}
      />
    </ScreenLayout>
  );
}
