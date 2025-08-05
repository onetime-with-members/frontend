import { useTranslations } from 'next-intl';
import { SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form';

import ScreenLayout from './screen-layout';
import NicknameFormControl from '@/components/user/nickname-form-control';
import {
  OnboardingFormType,
  ProfileNicknameFormType,
} from '@/lib/validation/form-types';
import { profileNicknameSchema } from '@/lib/validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function NicknameFormScreen({
  pageIndex,
  setPageIndex,
  onboardingValue,
  setOnboardingValue,
}: {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  onboardingValue: OnboardingFormType;
  setOnboardingValue: UseFormSetValue<OnboardingFormType>;
}) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ProfileNicknameFormType>({
    resolver: zodResolver(profileNicknameSchema),
    defaultValues: { nickname: onboardingValue.nickname },
  });

  const t = useTranslations('onboarding');

  const onSubmit: SubmitHandler<ProfileNicknameFormType> = ({ nickname }) => {
    setOnboardingValue('nickname', nickname);
    setPageIndex((prev) => prev + 1);
  };

  return (
    <ScreenLayout
      pageIndex={pageIndex}
      title={t.rich('title2', {
        br: () => <br className="md:hidden" />,
      })}
      disabled={!isValid}
      onBackButtonClick={() => setPageIndex((prev) => prev - 1)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <NicknameFormControl
        registerNickname={register('nickname')}
        errors={errors}
      />
    </ScreenLayout>
  );
}
