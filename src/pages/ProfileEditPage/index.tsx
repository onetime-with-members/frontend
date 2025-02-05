import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import TopAppBar from './TopAppBar';
import NicknameFormControl from '@/components/NicknameFormControl';
import FloatingBottomButton from '@/components/button/FloatingBottomButton';
import { UserType } from '@/types/user.type';
import axios from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function ProfileEditPage() {
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

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
        <title>프로필 수정 - OneTime</title>
      </Helmet>
      <>
        <TopAppBar />
      </>
      <div className="px-4">
        {user && (
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
