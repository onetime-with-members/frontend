import { useForm } from 'react-hook-form';

import { profileNicknameSchema } from '@/features/user/schemas';
import { OnboardingSchema, ProfileNicknameSchema } from '@/features/user/types';
import { zodResolver } from '@hookform/resolvers/zod';

export default function useNicknameForm({
  onboardingValue,
}: {
  onboardingValue: OnboardingSchema;
}) {
  return useForm<ProfileNicknameSchema>({
    resolver: zodResolver(profileNicknameSchema),
    defaultValues: { nickname: onboardingValue.nickname },
    mode: 'onChange',
    criteriaMode: 'all',
  });
}
