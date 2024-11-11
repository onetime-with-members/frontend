import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import axios from '../../../api/axios';
import NicknameFormControl from '../../NicknameFormControl';
import FloatingBottomButton from '../../floating-button/FloatingBottomButton';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';

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
  const [value, setValue] = useState({
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
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }

  function handleBackButtonClick() {
    navigate('/login');
  }

  function handleNextButtonClick() {
    if (disabled) return;
    registerNickname.mutate();
  }

  useEffect(() => {
    if (!searchParams.get('register_token') || !searchParams.get('name')) {
      navigate('/login');
    }

    if (searchParams.get('register_token') || searchParams.get('name')) {
      if (searchParams.get('register_token')) {
        setRegisterToken(searchParams.get('register_token') as string);
      }
      if (searchParams.get('name')) {
        setValue({
          name: searchParams.get('name') as string,
        });
      }
      const newSearchParams = new URLSearchParams();
      newSearchParams.delete('register_token');
      newSearchParams.delete('name');
      setSearchParams(newSearchParams);
    }
  }, []);

  return (
    <div
      className={clsx({
        hidden: !isVisible,
      })}
    >
      <header className="py-5">
        <button onClick={handleBackButtonClick}>
          <IconChevronLeft />
        </button>
      </header>
      <main className="flex flex-col gap-8">
        <h1 className="text-gray-90 title-lg-300">
          시작하기 전,
          <br />
          당신의 이름을 알려주세요
        </h1>
        <NicknameFormControl
          value={value.name}
          onChange={handleInputChange}
          setSubmitDisabled={setDisabled}
        />
        <FloatingBottomButton
          onClick={handleNextButtonClick}
          disabled={disabled}
        >
          다음
        </FloatingBottomButton>
      </main>
    </div>
  );
}
