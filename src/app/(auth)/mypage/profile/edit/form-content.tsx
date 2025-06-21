'use client';

import { useState } from 'react';

import { DesktopSubmitButton, MobileSubmitButton } from './submit-button';
import NicknameFormControl from '@/components/user/nickname-form-control';
import { editProfile } from '@/lib/actions';
import { UserType } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function FormContent({ user }: { user: UserType }) {
  const [value, setValue] = useState(user.nickname);
  const [isDisabled, setIsDisabled] = useState(true);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isDisabled) return;

    const formData = new FormData(e.currentTarget);
    await editProfile(formData);

    router.back();
  }

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
    >
      <div className="mx-auto flex flex-col gap-[3.75rem] bg-gray-00 px-4 pb-40 pt-8 sm:max-w-[480px] sm:rounded-3xl sm:px-9 sm:py-10">
        <NicknameFormControl
          value={value}
          onChange={(e) => setValue(e.target.value)}
          setSubmitDisabled={setIsDisabled}
        />
        <DesktopSubmitButton isDisabled={isDisabled} />
      </div>
      <MobileSubmitButton isDisabled={isDisabled} />
    </form>
  );
}
