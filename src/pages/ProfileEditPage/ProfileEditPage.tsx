import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import TopAppBarForMobile from './TopAppBarForMobile/TopAppBarForMobile';
import TopHeaderForDesktop from './TopHeaderForDesktop/TopHeaderForDesktop';
import TopNavBarForDesktop from './TopNavBarForDesktop/TopNavBarForDesktop';
import NicknameFormControl from '@/components/NicknameFormControl/NicknameFormControl';
import Button from '@/components/button/Button/Button';
import FloatingBottomButton from '@/components/button/FloatingBottomButton/FloatingBottomButton';
import useGrayBackground from '@/hooks/useGrayBackground';
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
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: user } = useQuery<UserType>({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
  });

  const editProfile = useMutation({
    mutationFn: async () => {
      const res = await axios.patch('/users/profile/action-update', {
        nickname: value,
      });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate(-1);
    },
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit() {
    editProfile.mutate();
  }

  useEffect(() => {
    if (user) {
      setValue(user.nickname);
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>{t('profileEdit.editProfile')} | OneTime</title>
      </Helmet>

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
            {t('profileEdit.save')}
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
