'use client';

import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import Button from '@/components/button';
import FloatingBottomButton from '@/components/button/floating-bottom-button';
import NicknameFormControl from '@/components/user/nickname-form-control';
import { CurrentUserContext } from '@/contexts/current-user';
import { editProfile } from '@/lib/actions';
import { UserType } from '@/lib/types';
import { useRouter } from '@/navigation';

export default function FormContent({ user }: { user: UserType }) {
  const [value, setValue] = useState(user.nickname);
  const [isDisabled, setIsDisabled] = useState(true);

  const router = useRouter();

  const { setUser } = useContext(CurrentUserContext);

  const t = useTranslations('profileEdit');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isDisabled) return;
    const formData = new FormData(e.currentTarget);
    await editProfile(formData);

    setUser({
      ...user,
      nickname: value,
    });
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
        <Button
          type="submit"
          variant="dark"
          className="hidden sm:flex"
          fullWidth
          disabled={isDisabled}
        >
          {t('save')}
        </Button>
      </div>

      <FloatingBottomButton
        type="submit"
        variant="dark"
        className="sm:hidden"
        disabled={isDisabled}
      >
        {t('save')}
      </FloatingBottomButton>
    </form>
  );
}
