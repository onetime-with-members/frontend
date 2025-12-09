import { SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form';

import { profileNicknameSchema } from '@/features/user/schemas';
import { OnboardingSchema, ProfileNicknameSchema } from '@/features/user/types';
import { zodResolver } from '@hookform/resolvers/zod';

export default function useNicknameForm({
  onboardingValue,
  setOnboardingValue,
  setPageIndex,
}: {
  onboardingValue: OnboardingSchema;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setOnboardingValue: UseFormSetValue<OnboardingSchema>;
}) {
  const form = useForm<ProfileNicknameSchema>({
    resolver: zodResolver(profileNicknameSchema),
    defaultValues: { nickname: onboardingValue.nickname },
  });

  const onSubmit: SubmitHandler<ProfileNicknameSchema> = ({ nickname }) => {
    setOnboardingValue('nickname', nickname);
    setPageIndex((prev) => prev + 1);
  };

  return {
    ...form,
    onSubmit,
  };
}
