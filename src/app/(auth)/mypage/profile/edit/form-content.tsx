'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Button from '@/components/button';
import FloatingBottomButton from '@/components/button/floating-bottom-button';
import NicknameFormControl from '@/components/user/nickname-form-control';
import { editUserNameApi } from '@/lib/api/mutations';
import { UserType } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function FormContent({ user }: { user: UserType }) {
  const [value, setValue] = useState(user.nickname);
  const [isDisabled, setIsDisabled] = useState(true);

  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations('profileEdit');

  const { mutate: editUserName, isPending } = useMutation({
    mutationFn: (data: string) => editUserNameApi(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      router.back();
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isDisabled) return;
    const formData = new FormData(e.currentTarget);
    editUserName(formData.get('nickname') as string);
  }

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
    >
      <div className="mx-auto flex flex-col gap-[3.75rem] bg-gray-00 px-4 pb-40 pt-8 sm:max-w-[480px] sm:rounded-3xl sm:px-9 sm:py-10">
        {/* Nickname Form Control */}
        <NicknameFormControl
          value={value}
          onChange={(e) => setValue(e.target.value)}
          setSubmitDisabled={setIsDisabled}
        />
        {/* Desktop Submit Button */}
        <Button
          type="submit"
          variant="dark"
          className="hidden sm:flex"
          fullWidth
          disabled={isDisabled}
        >
          {isPending ? t('saving') : t('save')}
        </Button>
      </div>
      {/* Mobile Submit Button */}
      <FloatingBottomButton
        type="submit"
        variant="dark"
        className="sm:hidden"
        disabled={isDisabled}
      >
        {isPending ? t('saving') : t('save')}
      </FloatingBottomButton>
    </form>
  );
}
