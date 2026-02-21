import { getCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import ScreenLayout from '../ScreenLayout';
import { REDIRECT_URL } from '@/features/auth/constants';
import PolicyCheckboxContent from '@/features/user/components/shared/PolicyCheckboxContent';
import PolicyDetailScreen from '@/features/user/components/shared/PolicyDetailScreen';
import { OnboardingContext } from '@/features/user/contexts/OnboardingContext';
import usePolicyScreenForm from '@/features/user/hooks/usePolicyScreenForm';
import { PolicySchema } from '@/features/user/types';
import { useProgressRouter } from '@/navigation';

export default function PolicyScreen() {
  const { moveToNextPage, onboardingValue, setOnboardingValue } =
    useContext(OnboardingContext);

  const [pageDetail, setPageDetail] = useState<keyof PolicySchema | null>(null);

  const t = useTranslations('OnboardingPage');

  const progressRouter = useProgressRouter();

  const {
    setValue,
    watch,
    formState: { isValid },
    handleSubmit,
  } = usePolicyScreenForm({ onboardingValue });

  const redirectUrl = getCookie(REDIRECT_URL);
  const pageTitle =
    pageDetail === 'servicePolicy' ? t('termsOfService') : t('privacyPolicy');

  function handlePageDetailClose() {
    setPageDetail(null);
  }

  function handleSetValues(newValues: PolicySchema) {
    setValue('servicePolicy', newValues.servicePolicy, {
      shouldValidate: true,
    });
    setValue('privacyPolicy', newValues.privacyPolicy, {
      shouldValidate: true,
    });
    setValue('marketingPolicy', newValues.marketingPolicy, {
      shouldValidate: true,
    });
  }

  const onSubmit: SubmitHandler<PolicySchema> = ({
    servicePolicy,
    privacyPolicy,
    marketingPolicy,
  }) => {
    setOnboardingValue('servicePolicy', servicePolicy);
    setOnboardingValue('privacyPolicy', privacyPolicy);
    setOnboardingValue('marketingPolicy', marketingPolicy);
    moveToNextPage();
  };

  return (
    <>
      <ScreenLayout
        title={t.rich('title1', {
          br: () => <br />,
        })}
        disabled={!isValid}
        onBackButtonClick={() =>
          progressRouter.push(`/login?redirect_url=${redirectUrl}`)
        }
        onSubmit={handleSubmit(onSubmit)}
      >
        <PolicyCheckboxContent
          value={watch()}
          setValue={handleSetValues}
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
