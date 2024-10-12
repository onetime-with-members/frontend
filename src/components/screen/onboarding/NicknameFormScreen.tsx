import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import axios from '../../../api/axios';
import FloatingBottomButton from '../../floating-button/FloatingBottomButton';
import Input from '../../form-control/input/Input';
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
  const [invalid, setInvalid] = useState({
    format: false,
    length: false,
    empty: false,
  });
  const [disabled, setDisabled] = useState(true);
  const [registerToken, setRegisterToken] = useState('');

  const navigate = useNavigate();

  const isInvalid = invalid.format || invalid.length || invalid.empty;

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

  useEffect(() => {
    const lettersOnly = /^[\p{L}]+$/u;

    setInvalid({
      format: !lettersOnly.test(value.name) && value.name !== '',
      length: value.name.length > 10,
      empty: value.name === '',
    });
  }, [value]);

  useEffect(() => {
    if (isInvalid) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [value, invalid]);

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
        <div className="flex flex-col gap-2">
          <label className="pl-1 text-gray-90 text-lg-200">이름</label>
          <div className="flex flex-col gap-2">
            <Input
              name="name"
              value={value.name}
              onChange={handleInputChange}
              placeholder="당신의 이름은 무엇인가요?"
              className={clsx({
                'ring-2 ring-danger-30': invalid.format || invalid.length,
              })}
            />
            <ul className="flex flex-col gap-1">
              {invalid.format && (
                <li className="text-danger-50 text-sm-200">
                  특수문자 및 숫자는 사용할 수 없어요
                </li>
              )}
              {invalid.length && (
                <li className="text-danger-50 text-sm-200">
                  10자 이내로 입력해주세요
                </li>
              )}
            </ul>
          </div>
        </div>
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
