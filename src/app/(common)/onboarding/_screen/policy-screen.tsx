import { getCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form';

import ScreenLayout from './screen-layout';
import PolicyCheckboxContent from '@/components/user/policy-checkbox-content';
import PolicyDetailScreen from '@/components/user/policy-detail-screen';
import {
  OnboardingFormType,
  PolicyFormType,
} from '@/lib/validation/form-types';
import { policySchema } from '@/lib/validation/schema';
import { useProgressRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

export default function PolicyScreen({
  isVisible,
  page,
  setPage,
  setOnboardingValue,
}: {
  isVisible: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setOnboardingValue: UseFormSetValue<OnboardingFormType>;
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
      servicePolicy: false,
      privacyPolicy: false,
      marketingPolicy: false,
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
        type="submit"
        isVisible={isVisible}
        page={page}
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
