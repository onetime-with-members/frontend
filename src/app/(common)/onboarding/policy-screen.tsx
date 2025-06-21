import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import ScreenLayout from './screen-layout';
import PolicyCheckboxContent from '@/components/user/policy-checkbox-content';
import PolicyDetailScreen from '@/components/user/policy-detail-screen';
import {
  OnboardingValueType,
  PolicyKeyType,
  PolicyType,
  UserType,
} from '@/lib/types';

export default function PolicyScreen({
  isVisible,
  page,
  value,
  setValue,
  onNextButtonClick: handleNextButtonClick,
  onBackButtonClick: handleBackButtonClick,
  user,
}: {
  isVisible: boolean;
  page: number;
  value: OnboardingValueType;
  setValue: React.Dispatch<React.SetStateAction<OnboardingValueType>>;
  onNextButtonClick: (disabled: boolean) => void;
  onBackButtonClick: () => void;
  user: UserType | null;
}) {
  const [disabled, setDisabled] = useState(true);
  const [pageDetail, setPageDetail] = useState<PolicyKeyType | null>(null);
  const [policyValue, setPolicyValue] = useState<PolicyType>({
    service_policy_agreement: false,
    privacy_policy_agreement: false,
    marketing_policy_agreement: false,
  });

  const t = useTranslations('onboarding');

  const pageTitle =
    pageDetail === 'service_policy_agreement'
      ? t('termsOfService')
      : t('privacyPolicy');

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
  }, [policyValue, setValue]);

  return (
    <>
      <ScreenLayout
        isVisible={isVisible}
        page={page}
        title={t.rich('title1', {
          br: () => <br className="hidden xs:block" />,
        })}
        disabled={disabled}
        onNextButtonClick={() => handleNextButtonClick(disabled)}
        onBackButtonClick={handleBackButtonClick}
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
          user={user}
        />
      )}
    </>
  );
}
