'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import TopAppBarForMobile from './TopAppBarForMobile/TopAppBarForMobile';
import TopHeaderForDesktop from './TopHeaderForDesktop/TopHeaderForDesktop';
import TopNavBarForDesktop from './TopNavBarForDesktop/TopNavBarForDesktop';
import Button from '@/components/button/Button/Button';
import FloatingBottomButton from '@/components/button/FloatingBottomButton/FloatingBottomButton';
import NicknameFormControl from '@/components/form-control/NicknameFormControl/NicknameFormControl';
import useGrayBackground from '@/hooks/useGrayBackground';
import { useRouter } from '@/navigation';
import { UserType } from '@/types/user.type';
import axios from '@/utils/axios';
import breakpoint from '@/utils/breakpoint';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function ProfileEditPage() {
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useGrayBackground({
    breakpointCondition: () => window.innerWidth >= breakpoint.sm,
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations('profileEdit');

  const { data: user } = useQuery<UserType>({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
  });

  const { mutate: editProfile } = useMutation({
    mutationFn: async () => {
      const res = await axios.patch('/users/profile/action-update', {
        nickname: value,
      });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      router.back();
    },
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit() {
    editProfile();
  }

  useEffect(() => {
    if (user) {
      setValue(user.nickname);
    }
  }, [user]);

  return (
    <>
      <TopNavBarForDesktop />
      <TopAppBarForMobile />

      <main>
        <TopHeaderForDesktop />

        <div className="mx-auto flex flex-col gap-[3.75rem] bg-gray-00 px-4 pb-40 pt-8 sm:max-w-[480px] sm:rounded-3xl sm:px-9 sm:py-10">
          <NicknameFormControl
            value={value}
            onChange={handleInputChange}
            setSubmitDisabled={setIsDisabled}
          />
          <Button
            variant="dark"
            onClick={handleSubmit}
            className="hidden sm:flex"
            fullWidth
            disabled={isDisabled}
          >
            {t('save')}
          </Button>
        </div>

        <FloatingBottomButton
          variant="dark"
          className="sm:hidden"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          저장
        </FloatingBottomButton>
      </main>
    </>
  );
}
