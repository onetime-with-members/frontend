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
  isVisible,
  page,
  setPage,
  setOnboardingValue,
  initialNickname,
}: {
  isVisible: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setOnboardingValue: UseFormSetValue<OnboardingFormType>;
  initialNickname: string;
}) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ProfileNicknameFormType>({
    resolver: zodResolver(profileNicknameSchema),
    defaultValues: { nickname: initialNickname },
  });

  const t = useTranslations('onboarding');

  const onSubmit: SubmitHandler<ProfileNicknameFormType> = ({ nickname }) => {
    setOnboardingValue('nickname', nickname);
    setPage((prev) => prev + 1);
  };

  return (
    <ScreenLayout
      type="submit"
      isVisible={isVisible}
      page={page}
      title={t.rich('title2', {
        br: () => <br className="md:hidden" />,
      })}
      disabled={!isValid}
      onBackButtonClick={() => setPage((prev) => prev - 1)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <NicknameFormControl
        registerNickname={register('nickname')}
        errors={errors}
      />
    </ScreenLayout>
  );
}
