import { SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form';

import { policySchema } from '@/features/user/schemas';
import { OnboardingSchema, PolicySchema } from '@/features/user/types';
import { zodResolver } from '@hookform/resolvers/zod';

export default function usePolicyScreenForm({
  onboardingValue,
  setOnboardingValue,
  setPage,
}: {
  onboardingValue: OnboardingSchema;
  setOnboardingValue: UseFormSetValue<OnboardingSchema>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const form = useForm<PolicySchema>({
    resolver: zodResolver(policySchema),
    mode: 'onChange',
    defaultValues: {
      servicePolicy: onboardingValue.servicePolicy,
      privacyPolicy: onboardingValue.privacyPolicy,
      marketingPolicy: onboardingValue.marketingPolicy,
    },
  });

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

  return {
    ...form,
    onSubmit,
  };
}
