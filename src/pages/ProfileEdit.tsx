import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import FloatingBottomButton from '../components/floating-button/FloatingBottomButton';
import { User } from '../types/user.type';
import axios from '../utils/axios';
import NicknameFormControl from '@/components/NicknameFormControl';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function ProfileEdit() {
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { data: user } = useQuery<User>({
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

  function handleBackButtonClick() {
    navigate(-1);
  }

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
        <title>프로필 수정 - OneTime</title>
      </Helmet>
      <header className="h-[67px]">
        <div className="fixed left-0 top-0 z-40 w-full bg-white px-4">
          <div className="mx-auto grid max-w-screen-sm grid-cols-3 py-5">
            <div className="flex items-center">
              <button onClick={handleBackButtonClick}>
                <IconChevronLeft size={24} className="text-gray-80" />
              </button>
            </div>
            <h2 className="text-center text-gray-90 text-lg-300">
              프로필 수정
            </h2>
          </div>
        </div>
      </header>
      <div className="px-4">
        {user && value && (
          <main className="mx-auto max-w-screen-sm pb-40 pt-8">
            <NicknameFormControl
              value={value}
              onChange={handleInputChange}
              setSubmitDisabled={setIsDisabled}
            />
            <FloatingBottomButton onClick={handleSubmit} disabled={isDisabled}>
              확인
            </FloatingBottomButton>
          </main>
        )}
      </div>
    </>
  );
}
