import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ScreenLayout from '../ScreenLayout';
import NicknameFormControl from '@/components/NicknameFormControl';
import axios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

export interface NicknameFormType {
  name: string;
}

interface NicknameFormProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  isVisible: boolean;
  value: NicknameFormType;
  setValue: React.Dispatch<React.SetStateAction<NicknameFormType>>;
  registerToken: string;
}

export default function NicknameFormScreen({
  setPage,
  setName,
  isVisible,
  value,
  setValue,
  registerToken,
}: NicknameFormProps) {
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const registerNickname = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/users/onboarding', {
        nickname: value.name,
        register_token: registerToken,
      });
      return res.data;
    },
    onSuccess: (data) => {
      const { access_token: accessToken, refresh_token: refreshToken } =
        data.payload;

      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('refresh-token', refreshToken);

      setName(value.name);
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
          회원님의 <br />
          이름을 알려주세요
        </>
      }
      disabled={disabled}
      handleNextButtonClick={handleNextButtonClick}
    >
      <NicknameFormControl
        value={value.name}
        onChange={handleInputChange}
        setSubmitDisabled={setDisabled}
      />
    </ScreenLayout>
  );
}
