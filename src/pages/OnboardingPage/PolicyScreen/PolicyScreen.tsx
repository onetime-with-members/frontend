import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import ScreenLayout from '../ScreenLayout/ScreenLayout';
import PolicyCheckboxContent from '@/components/policy/PolicyCheckboxContent/PolicyCheckboxContent';
import PolicyDetailScreen from '@/components/policy/PolicyDetailScreen/PolicyDetailScreen';
import {
  OnboardingValueType,
  PolicyKeyType,
  PolicyType,
} from '@/types/user.type';

interface PolicyScreenProps {
  isVisible: boolean;
  page: number;
  value: OnboardingValueType;
  setValue: React.Dispatch<React.SetStateAction<OnboardingValueType>>;
  handleNextButtonClick: (disabled: boolean) => void;
  handleBackButtonClick: () => void;
}

export default function PolicyScreen({
  isVisible,
  page,
  value,
  setValue,
  handleNextButtonClick,
  handleBackButtonClick,
}: PolicyScreenProps) {
  const [disabled, setDisabled] = useState(true);
  const [pageDetail, setPageDetail] = useState<PolicyKeyType | null>(null);
  const [policyValue, setPolicyValue] = useState<PolicyType>({
    service_policy_agreement: false,
    privacy_policy_agreement: false,
    marketing_policy_agreement: false,
  });

  const { t } = useTranslation();

  const pageTitle =
    pageDetail === 'service_policy_agreement'
      ? t('onboarding.termsOfService')
      : t('onboarding.privacyPolicy');

  function handlePageDetailClose() {
    setPageDetail(null);
  }

  useEffect(() => {
    setDisabled(
      !value.service_policy_agreement || !value.privacy_policy_agreement,
    );
  }, [value]);

  useEffect(() => {
    setValue((prevValue) => ({
      ...prevValue,
      ...policyValue,
    }));
  }, [policyValue]);

  return (
    <>
      <ScreenLayout
        isVisible={isVisible}
        page={page}
        title={
          <Trans i18nKey="onboarding.title1">
            서비스 이용을 위해 <br />
            약관에 동의해주세요
          </Trans>
        }
        disabled={disabled}
        handleNextButtonClick={() => handleNextButtonClick(disabled)}
        handleBackButtonClick={handleBackButtonClick}
      >
        <PolicyCheckboxContent
          value={policyValue}
          setValue={setPolicyValue}
          setPageDetail={setPageDetail}
        />
      </ScreenLayout>

      {pageDetail && (
        <PolicyDetailScreen
          page={pageDetail}
          pageTitle={pageTitle}
          onClose={handlePageDetailClose}
        />
      )}
    </>
  );
}
