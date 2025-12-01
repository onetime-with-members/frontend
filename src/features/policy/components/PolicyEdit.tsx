'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useEditPolicyMutation } from '../api/policy.query';
import usePolicyForm from '../hooks';
import NavBar from '@/components/NavBar';
import Button from '@/components/button';
import useHomeUrl from '@/features/home/hooks/useHomeUrl';
import PolicyCheckboxContent from '@/features/user/components/shared/PolicyCheckboxContent';
import { PolicySchema } from '@/features/user/types';
import { useRouter } from '@/i18n/navigation';
import { editUserPolicyAction } from '@/lib/api/actions';
import { ProgressLink, useProgressRouter } from '@/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function PolicyEdit() {
  const [pageDetail, setPageDetail] = useState<keyof PolicySchema | null>(null);

  const {
    handleSubmit,
    setValue,
    formState: { isValid },
    policyValue,
    setPolicyValue,
    policyData,
  } = usePolicyForm();

  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations('policyEdit');

  const progressRouter = useProgressRouter();
  const homeUrl = useHomeUrl();

  // const { mutateAsync: editPolicy } = useMutation({
  //   mutationFn: editUserPolicyAction,
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({ queryKey: ['users'] });
  //     router.back();
  //   },
  // });

  // const onSubmit: SubmitHandler<PolicySchema> = async (data) => {
  //   await editPolicy(data);
  // };

  const onSubmit: SubmitHandler<PolicySchema> = async () => {
    useEditPolicyMutation();
  };

  useEffect(() => {
    if (policyData.privacyPolicy && policyData.servicePolicy)
      router.push(homeUrl);
  }, [policyData]);

  // useEffect(() => {
  //   setValue('servicePolicy', policyValue.servicePolicy, {
  //     shouldValidate: true,
  //   });
  //   setValue('privacyPolicy', policyValue.privacyPolicy, {
  //     shouldValidate: true,
  //   });
  //   setValue('marketingPolicy', policyValue.marketingPolicy, {
  //     shouldValidate: true,
  //   });
  // }, [policyValue]);

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
                <ProgressLink
                  href="/withdraw"
                  className="text-danger-50 text-sm-200"
                >
                  {t('toWithdrawLink')}
                </ProgressLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
