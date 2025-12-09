import { useTranslations } from 'next-intl';
import { UseFormSetValue } from 'react-hook-form';

import ScreenLayout from '../ScreenLayout';
import useNicknameForm from '@/features/onboarding/hooks/useNicknameForm';
import NicknameFormControl from '@/features/user/components/shared/NicknameFormControl';
import { OnboardingSchema } from '@/features/user/types';

export default function NicknameFormScreen({
  pageIndex,
  setPageIndex,
  onboardingValue,
  setOnboardingValue,
}: {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  onboardingValue: OnboardingSchema;
  setOnboardingValue: UseFormSetValue<OnboardingSchema>;
}) {
  // const {
  //   register,
  //   formState: { errors, isValid },
  //   handleSubmit,
  // } = useForm<ProfileNicknameSchema>({
  //   resolver: zodResolver(profileNicknameSchema),
  //   defaultValues: { nickname: onboardingValue.nickname },
  // });

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    onSubmit,
  } = useNicknameForm({ onboardingValue, setOnboardingValue, setPageIndex });

  const t = useTranslations('onboarding');

  // const onSubmit: SubmitHandler<ProfileNicknameSchema> = ({ nickname }) => {
  //   setOnboardingValue('nickname', nickname);
  //   setPageIndex((prev) => prev + 1);
  // };

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
