import { useForm } from 'react-hook-form';

import { defaultOnboardingValue } from '@/features/user/constants';
import { onboardingSchema } from '@/features/user/schemas';
import { OnboardingSchema } from '@/features/user/types';
import { zodResolver } from '@hookform/resolvers/zod';

export default function useOnboardingForm({ name }: { name: string }) {
  return useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { ...defaultOnboardingValue, nickname: name },
  });
}
