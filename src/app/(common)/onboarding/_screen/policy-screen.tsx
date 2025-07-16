import { getCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import ScreenLayout from './screen-layout';
import PolicyCheckboxContent from '@/components/user/policy-checkbox-content';
import PolicyDetailScreen from '@/components/user/policy-detail-screen';
import { OnboardingType } from '@/lib/types';
import { PolicyFormType } from '@/lib/validation/form-types';
import { policySchema } from '@/lib/validation/schema';
import { useProgressRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

export default function PolicyScreen({
  page,
  setPage,
  onboardingValue,
  setOnboardingValue,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onboardingValue: OnboardingType;
  setOnboardingValue: React.Dispatch<React.SetStateAction<OnboardingType>>;
}) {
  const [pageDetail, setPageDetail] = useState<keyof PolicyFormType | null>(
    null,
  );

  const {
    reset,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm<PolicyFormType>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      servicePolicy: onboardingValue.servicePolicy,
      privacyPolicy: onboardingValue.privacyPolicy,
      marketingPolicy: onboardingValue.marketingPolicy,
    },
  });

  const t = useTranslations('onboarding');
  const progressRouter = useProgressRouter();

  const redirectUrl = getCookie('redirect-url');

  const pageTitle =
    pageDetail === 'servicePolicy' ? t('termsOfService') : t('privacyPolicy');

  const onSubmit: SubmitHandler<PolicyFormType> = ({
    servicePolicy,
    privacyPolicy,
    marketingPolicy,
  }) => {
    setOnboardingValue((prev) => ({
      ...prev,
      servicePolicy,
      privacyPolicy,
      marketingPolicy,
    }));
    setPage((prev) => prev + 1);
  };

  function handlePageDetailClose() {
    setPageDetail(null);
  }

  return (
    <>
      <ScreenLayout
        pageIndex={page}
        title={t.rich('title1', {
          br: () => <br className="hidden xs:block" />,
        })}
        disabled={!isValid}
        onBackButtonClick={() =>
          progressRouter.push(`/login?redirect_url=${redirectUrl}`)
        }
        onSubmit={handleSubmit(onSubmit)}
      >
        <PolicyCheckboxContent
          value={watch()}
          setValue={reset}
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
