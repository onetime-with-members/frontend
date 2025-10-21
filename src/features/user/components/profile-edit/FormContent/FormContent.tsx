import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import DesktopSubmitButton from './DesktopSubmitButton';
import MobileSubmitButton from './MobileSubmitButton';
import NicknameFormControl from '@/components/user/nickname-form-control';
import { useEditProfileMutation } from '@/features/user/api';
import { UserType } from '@/features/user/models';
import { ProfileNicknameFormType } from '@/lib/validation/form-types';
import { profileNicknameSchema } from '@/lib/validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

export default function FormContent({ user }: { user: UserType }) {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<ProfileNicknameFormType>({
    mode: 'onChange',
    resolver: zodResolver(profileNicknameSchema),
    defaultValues: {
      nickname: user.nickname,
    },
    criteriaMode: 'all',
  });

  const { editUserName, isPending } = useEditProfileMutation();

  const onSubmit: SubmitHandler<ProfileNicknameFormType> = async ({
    nickname,
  }) => {
    await editUserName(nickname);
    router.back();
  };

  useEffect(() => {
    if (user) reset(user);
  }, [user, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
    >
      <div className="mx-auto flex flex-col gap-[3.75rem] bg-gray-00 px-4 pb-40 pt-8 sm:max-w-[480px] sm:rounded-3xl sm:px-9 sm:py-10">
        <NicknameFormControl
          registerNickname={register('nickname')}
          errors={errors}
        />
        <DesktopSubmitButton isValid={isValid} />
      </div>
      <MobileSubmitButton isValid={isValid} isPending={isPending} />
    </form>
  );
}
