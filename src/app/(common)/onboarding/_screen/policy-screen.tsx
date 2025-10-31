import { getCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form';

import ScreenLayout from './screen-layout';
import PolicyCheckboxContent from '@/components/user/PolicyCheckboxContent';
import PolicyDetailScreen from '@/components/user/PolicyDetailScreen';
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
    reset,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm<PolicySchema>({
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
