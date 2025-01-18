import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BottomButtonForDesktop from './BottomButtonForDesktop';
import BottomButtonForMobile from './BottomButtonForMobile';
import InputContent from './InputContent';
import TopAppBar from './TopAppBar';
import axios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

export interface NicknameFormType {
  name: string;
}

interface NicknameFormProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  isVisible: boolean;
  value: NicknameFormType;
  setValue: React.Dispatch<React.SetStateAction<NicknameFormType>>;
  registerToken: string;
}

export default function NicknameFormScreen({
  page,
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
      setPage(page + 1);
    },
    onError: () => {
      const redirectUrl = localStorage.getItem('redirect-url');
      navigate(`/login?redirect_url=${redirectUrl}`);
    },
  });

  function handleNextButtonClick() {
    if (disabled) return;
    registerNickname.mutate();
  }

  return (
    <div
      className={clsx({
        hidden: !isVisible,
      })}
    >
      <TopAppBar />
      <main className="flex flex-col gap-3">
        <InputContent
          value={value}
          setValue={setValue}
          setDisabled={setDisabled}
        />
        <>
          <BottomButtonForMobile
            disabled={disabled}
            handleNextButtonClick={handleNextButtonClick}
          />
          <BottomButtonForDesktop
            disabled={disabled}
            handleNextButtonClick={handleNextButtonClick}
          />
        </>
      </main>
    </div>
  );
}
