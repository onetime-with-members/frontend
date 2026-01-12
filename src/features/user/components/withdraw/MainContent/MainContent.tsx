import { useState } from 'react';

import Information from './Information';
import SubmitButton from './SubmitButton';
import { useWithdrawMutation } from '@/features/user/api/user.query';

export default function MainContent() {
  const [isChecked, setIsChecked] = useState(false);

  const { withdraw } = useWithdrawMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isChecked) return;
    await withdraw();
  }

  function toggleIsChecked() {
    setIsChecked((prev) => !prev);
  }

  return (
    <main className="px-4 pb-24">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-screen-sm flex-col items-center gap-10"
      >
        <Information isChecked={isChecked} onChecked={toggleIsChecked} />
        <SubmitButton disabled={!isChecked} />
      </form>
    </main>
  );
}
