'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import NavBar from '@/components/NavBar';
import Button from '@/components/button';
import PolicyCheckboxContent from '@/components/user/PolicyCheckboxContent';
import { PolicyContext } from '@/features/user/contexts/PolicyContext';
import { policySchema } from '@/features/user/schemas';
import { PolicySchema } from '@/features/user/types';
import { editUserPolicyAction } from '@/lib/api/actions';
import { useProgressRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PolicyEditPage() {
  const [pageDetail, setPageDetail] = useState<keyof PolicySchema | null>(null);

  const { policyValue, setPolicyValue, policyData } = useContext(PolicyContext);

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<PolicySchema>({
    resolver: zodResolver(policySchema),
    defaultValues: policyValue,
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const progressRouter = useProgressRouter();
  const t = useTranslations('policyEdit');

  const { mutateAsync: editPolicy } = useMutation({
    mutationFn: editUserPolicyAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      router.back();
    },
  });

  const onSubmit: SubmitHandler<PolicySchema> = async (data) => {
    await editPolicy(data);
  };

  useEffect(() => {
    if (policyData.privacyPolicy && policyData.servicePolicy) router.push('/');
  }, [policyData]);

  useEffect(() => {
    reset(policyValue);
  }, [policyValue]);

  useEffect(() => {
    if (pageDetail === 'servicePolicy') {
      progressRouter.push('/policy/service');
    } else if (pageDetail === 'privacyPolicy') {
      progressRouter.push('/policy/privacy');
    }
  }, [pageDetail, progressRouter]);

  return (
    <>
      <NavBar disabled />
      <div className="px-4 py-12">
        <div className="mx-auto flex w-full max-w-screen-xs flex-col gap-12">
          <h1 className="text-center text-gray-90 title-lg-300">
            {t.rich('title', { br: () => <br /> })}
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
            className="flex flex-col gap-12"
          >
            <PolicyCheckboxContent
              value={policyValue}
              setValue={setPolicyValue}
              setPageDetail={setPageDetail}
            />
            <div className="flex flex-col items-center gap-3">
              <Button
                type="submit"
                variant="black"
                fullWidth
                disabled={!isValid}
              >
                {t('submit')}
              </Button>
              <div className="flex items-center gap-1.5 px-4 text-gray-50 text-sm-200">
                <span>{t('toWithdrawText')}</span>
                <Link href="/withdraw" className="text-danger-50 text-sm-200">
                  {t('toWithdrawLink')}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
