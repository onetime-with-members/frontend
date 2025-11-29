import { getCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form';

import ScreenLayout from './screen-layout';
import { REDIRECT_URL } from '@/features/auth/constants';
import PolicyCheckboxContent from '@/features/user/components/shared/PolicyCheckboxContent';
import PolicyDetailScreen from '@/features/user/components/shared/PolicyDetailScreen';
import { policySchema } from '@/features/user/schemas';
import { OnboardingSchema, PolicySchema } from '@/features/user/types';
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
  onboardingValue: OnboardingSchema;
  setOnboardingValue: UseFormSetValue<OnboardingSchema>;
}) {
  const [pageDetail, setPageDetail] = useState<keyof PolicySchema | null>(null);

  const {
    setValue,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm<PolicySchema>({
    resolver: zodResolver(policySchema),
    mode: 'onChange',
    defaultValues: {
      servicePolicy: onboardingValue.servicePolicy,
      privacyPolicy: onboardingValue.privacyPolicy,
      marketingPolicy: onboardingValue.marketingPolicy,
    },
  });

  const t = useTranslations('onboarding');
  const progressRouter = useProgressRouter();

  const redirectUrl = getCookie(REDIRECT_URL);

  const pageTitle =
    pageDetail === 'servicePolicy' ? t('termsOfService') : t('privacyPolicy');

  const onSubmit: SubmitHandler<PolicySchema> = ({
    servicePolicy,
    privacyPolicy,
    marketingPolicy,
  }) => {
    setOnboardingValue('servicePolicy', servicePolicy);
    setOnboardingValue('privacyPolicy', privacyPolicy);
    setOnboardingValue('marketingPolicy', marketingPolicy);
    setPage((prev) => prev + 1);
  };

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
