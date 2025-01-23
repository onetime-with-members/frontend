import { useState } from 'react';

import InfoContent from './InfoContent';
import TopAppBar from './TopAppBar';
import Button from '@/components/button/Button';
import axios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

export default function WithdrawPage() {
  const [isChecked, setIsChecked] = useState(false);

  const withdrawUser = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/users/action-withdraw');
      return res.data;
    },
    onSuccess: () => {
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
      location.href = '/';
    },
  });

  function handleWithdrawButtonClick() {
    if (!isChecked) return;
    withdrawUser.mutate();
  }

  return (
    <>
      <TopAppBar />
      <main className="px-4 pb-24">
        <div className="mx-auto flex w-full max-w-screen-sm flex-col items-center gap-10">
          <InfoContent isChecked={isChecked} setIsChecked={setIsChecked} />
          <Button
            variant="danger"
            disabled={!isChecked}
            onClick={handleWithdrawButtonClick}
            fullWidth
          >
            탈퇴하기
          </Button>
        </div>
      </main>
    </>
  );
}
