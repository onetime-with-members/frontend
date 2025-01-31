import { OnboardingFormType } from '..';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ScreenLayout from '../ScreenLayout';
import NicknameFormControl from '@/components/NicknameFormControl';
import axios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

interface NicknameFormProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  isVisible: boolean;
  value: OnboardingFormType;
  setValue: React.Dispatch<React.SetStateAction<OnboardingFormType>>;
}

export default function NicknameFormScreen({
  setPage,
  setName,
  isVisible,
  value,
  setValue,
}: NicknameFormProps) {
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const registerNickname = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/users/onboarding', value);
      return res.data;
    },
    onSuccess: (data) => {
      const { access_token: accessToken, refresh_token: refreshToken } =
        data.payload;

      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('refresh-token', refreshToken);

      setName(value.nickname);
      setPage((prevPage) => prevPage + 1);
    },
    onError: () => {
      const redirectUrl = localStorage.getItem('redirect-url');
      navigate(`/login?redirect_url=${redirectUrl}`);
    },
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }

  function handleNextButtonClick() {
    if (disabled) return;
    registerNickname.mutate();
  }

  return (
    <ScreenLayout
      isVisible={isVisible}
      title={
        <>
          회원님의 <br className="md:hidden" />
          이름을 알려주세요
        </>
      }
      disabled={disabled}
      handleNextButtonClick={handleNextButtonClick}
    >
      <NicknameFormControl
        value={value.nickname}
        onChange={handleInputChange}
        setSubmitDisabled={setDisabled}
      />
    </ScreenLayout>
  );
}
