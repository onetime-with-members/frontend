'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import Button from '@/components/button';
import PolicyCheckboxContent from '@/components/user/policy-checkbox-content';
import { PolicyContext } from '@/contexts/policy';
import { editPolicy } from '@/lib/actions';
import { PolicyKeyType } from '@/lib/types';
import { useProgressRouter } from '@/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FormContent() {
  const [pageDetail, setPageDetail] = useState<PolicyKeyType | null>(null);
  const [disabled, setDisabled] = useState(false);

  const { policyValue, setPolicyValue } = useContext(PolicyContext);

  const router = useRouter();
  const progressRouter = useProgressRouter();

  const t = useTranslations('policyEdit');

  async function handleSubmit() {
    const formData = new FormData();
    formData.set('policy', JSON.stringify(policyValue));
    await editPolicy(formData);

    router.back();
  }

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
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
    >
      <PolicyCheckboxContent
        value={policyValue}
        setValue={setPolicyValue}
        setPageDetail={setPageDetail}
      />
      <div className="flex flex-col items-center gap-3">
        <Button type="submit" variant="black" fullWidth disabled={disabled}>
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
  );
}
