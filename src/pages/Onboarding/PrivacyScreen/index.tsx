import React, { useEffect, useState } from 'react';

import ScreenLayout from '../ScreenLayout';
import AgreementDetailScreen from '@/components/agreement/AgreementDetailScreen';
import AgreementsContent from '@/components/agreement/AgreementsContent';
import { AgreementKeyType, OnboardingValueType } from '@/types/user.type';

interface PrivacyScreenProps {
  isVisible: boolean;
  page: number;
  value: OnboardingValueType;
  setValue: React.Dispatch<React.SetStateAction<OnboardingValueType>>;
  handleNextButtonClick: (disabled: boolean) => void;
  handleBackButtonClick: () => void;
}

export default function PrivacyScreen({
  isVisible,
  page,
  value,
  setValue,
  handleNextButtonClick,
  handleBackButtonClick,
}: PrivacyScreenProps) {
  const [disabled, setDisabled] = useState(true);
  const [pageDetail, setPageDetail] = useState<AgreementKeyType | null>(null);

  function handlePageDetailClose() {
    setPageDetail(null);
  }

  useEffect(() => {
    setDisabled(
      !value.service_policy_agreement || !value.privacy_policy_agreement,
    );
  }, [value]);

  return (
    <>
      <ScreenLayout
        isVisible={isVisible}
        page={page}
        title={
          <>
            서비스 이용을 위해 <br />
            약관에 동의해주세요
          </>
        }
        disabled={disabled}
        handleNextButtonClick={() => handleNextButtonClick(disabled)}
        handleBackButtonClick={handleBackButtonClick}
      >
        <AgreementsContent
          value={value}
          setValue={(value) =>
            setValue((prevValue) => ({ ...prevValue, ...value }))
          }
          setPageDetail={setPageDetail}
        />
      </ScreenLayout>

      {pageDetail && (
        <AgreementDetailScreen
          page={pageDetail}
          onClose={handlePageDetailClose}
        />
      )}
    </>
  );
}
