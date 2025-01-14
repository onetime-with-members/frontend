import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import axios from '../../../../api/axios';
import BottomButtonForDesktop from '../nickname-form/BottomButtonForDesktop';
import BottomButtonForMobile from '../nickname-form/BottomButtonForMobile';
import InputContent from '../nickname-form/InputContent';
import TopAppBar from '../nickname-form/TopAppBar';
import { useMutation } from '@tanstack/react-query';

export interface NicknameFormType {
  name: string;
}

interface NicknameFormProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  isVisible: boolean;
}

export default function NicknameFormScreen({
  page,
  setPage,
  setName,
  isVisible,
}: NicknameFormProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<NicknameFormType>({
    name: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [registerToken, setRegisterToken] = useState('');

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

  useEffect(() => {
    if (!searchParams.get('register_token') || !searchParams.get('name')) {
      return navigate('/login');
    }

    setRegisterToken(searchParams.get('register_token') as string);
    setValue({
      name: searchParams.get('name') as string,
    });

    const newSearchParams = new URLSearchParams();
    newSearchParams.delete('register_token');
    newSearchParams.delete('name');
    setSearchParams(newSearchParams);
  }, []);

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
