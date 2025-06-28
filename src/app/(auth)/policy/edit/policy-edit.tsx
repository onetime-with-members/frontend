'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import Button from '@/components/button';
import NavBar from '@/components/nav-bar';
import PolicyCheckboxContent from '@/components/user/policy-checkbox-content';
import { PolicyContext } from '@/contexts/policy';
import { defaultUser } from '@/lib/constants';
import { editUserPolicyApi } from '@/lib/mutation';
import { userQueryOption } from '@/lib/query-data';
import { PolicyKeyType } from '@/lib/types';
import { useProgressRouter } from '@/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';

export default function PolicyEditPage() {
  const [pageDetail, setPageDetail] = useState<PolicyKeyType | null>(null);
  const [disabled, setDisabled] = useState(false);

  const { policyValue, setPolicyValue, policyData, isPolicyPending } =
    useContext(PolicyContext);

  const queryClient = useQueryClient();
  const router = useRouter();
  const progressRouter = useProgressRouter();
  const t = useTranslations('policyEdit');

  const { data: user } = useQuery({
    ...userQueryOption,
  });

  const { mutateAsync: editPolicy } = useMutation({
    mutationFn: editUserPolicyApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      router.back();
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await editPolicy(policyValue);
  }

  useEffect(() => {
    if (
      policyData.privacy_policy_agreement &&
      policyData.service_policy_agreement
    ) {
      notFound();
    }
  }, [policyData]);

  useEffect(() => {
    setDisabled(
      !policyValue.privacy_policy_agreement ||
        !policyValue.service_policy_agreement,
    );
  }, [policyValue]);

  useEffect(() => {
    if (pageDetail === 'service_policy_agreement') {
      progressRouter.push('/policy/service');
    } else if (pageDetail === 'privacy_policy_agreement') {
      progressRouter.push('/policy/privacy');
    }
  }, [pageDetail, progressRouter]);

  return (
    <>
      <NavBar user={user || defaultUser} disabled />
      {!isPolicyPending && (
        <div className="px-4 py-12">
          <div className="mx-auto flex w-full max-w-screen-xs flex-col gap-12">
            <h1 className="text-center text-gray-90 title-lg-300">
              {t.rich('title', { br: () => <br /> })}
            </h1>
            <form
              onSubmit={handleSubmit}
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
                  disabled={disabled}
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
      )}
    </>
  );
}
