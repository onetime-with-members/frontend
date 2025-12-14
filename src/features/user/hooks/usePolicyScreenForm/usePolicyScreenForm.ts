import { useForm } from 'react-hook-form';

import { policySchema } from '@/features/user/schemas';
import { OnboardingSchema, PolicySchema } from '@/features/user/types';
import { zodResolver } from '@hookform/resolvers/zod';

export default function usePolicyScreenForm({
  onboardingValue,
}: {
  onboardingValue: OnboardingSchema;
}) {
  return useForm<PolicySchema>({
    resolver: zodResolver(policySchema),
    mode: 'onChange',
    defaultValues: {
      servicePolicy: onboardingValue.servicePolicy,
      privacyPolicy: onboardingValue.privacyPolicy,
      marketingPolicy: onboardingValue.marketingPolicy,
    },
  });
}
