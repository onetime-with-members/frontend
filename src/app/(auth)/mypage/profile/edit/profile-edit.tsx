'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/button';
import FloatingBottomButton from '@/components/button/floating-bottom-button';
import GrayBackground from '@/components/gray-background';
import NavBar from '@/components/nav-bar';
import NicknameFormControl from '@/components/user/nickname-form-control';
import { editUserNameAction } from '@/lib/api/actions';
import { userQueryOptions } from '@/lib/api/query-options';
import { defaultUser } from '@/lib/constants';
import { UserType } from '@/lib/types';
import { ProfileNicknameFormType } from '@/lib/validation/form-types';
import { profileNicknameSchema } from '@/lib/validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function ProfileEditPage() {
  const router = useRouter();

  const t = useTranslations('profileEdit');

  const { data: user } = useQuery({ ...userQueryOptions });

  return (
    <>
      {/* Gray Background */}
      <GrayBackground device="desktop" breakpoint="sm" />

      {/* Navigation Bar for Desktop */}
      <NavBar className="hidden sm:flex" />

      {/* App Bar for Mobile */}
      <header className="block h-[67px] sm:hidden">
        <div className="fixed left-0 top-0 z-40 w-full bg-white px-4">
          <div className="mx-auto grid max-w-screen-sm grid-cols-3 py-5">
            <div className="flex items-center">
              <button onClick={() => router.back()}>
                <IconChevronLeft size={24} className="text-gray-80" />
              </button>
            </div>
            <h2 className="flex items-center justify-center whitespace-nowrap text-center text-gray-90 text-lg-300">
              {t('editProfile')}
            </h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Header for Desktop */}
        <div className="mx-auto hidden w-full max-w-[480px] items-center gap-0.5 pb-8 pt-10 text-gray-90 sm:flex">
          <button className="text-gray-90" onClick={() => router.back()}>
            <IconChevronLeft size={32} />
          </button>
          <h1 className="title-lg-300">{t('editProfile')}</h1>
        </div>

        {/* Form Content */}
        <FormContent user={user || defaultUser} />
      </main>
    </>
  );
}

function FormContent({ user }: { user: UserType }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations();

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

  const { mutateAsync: editUserName } = useMutation({
    mutationFn: (data: string) => editUserNameAction(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      router.back();
    },
  });

  const onSubmit: SubmitHandler<ProfileNicknameFormType> = async ({
    nickname,
  }) => {
    await editUserName(nickname);
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
        {/* Nickname Form Control */}
        <NicknameFormControl
          registerNickname={register('nickname')}
          errors={errors}
        />
        {/* Desktop Submit Button */}
        <Button
          type="submit"
          variant="dark"
          className="hidden sm:flex"
          fullWidth
          disabled={!isValid}
        >
          {t('profileEdit.save')}
        </Button>
      </div>
      {/* Mobile Submit Button */}
      <FloatingBottomButton
        type="submit"
        variant="dark"
        className="sm:hidden"
        disabled={!isValid}
      >
        {t('profileEdit.save')}
      </FloatingBottomButton>
    </form>
  );
}
