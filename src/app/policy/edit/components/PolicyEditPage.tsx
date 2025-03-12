'use client';

import { getCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import NavBar from '@/components/NavBar/NavBar';
import Button from '@/components/button/Button/Button';
import PolicyCheckboxContent from '@/components/policy/PolicyCheckboxContent/PolicyCheckboxContent';
import { PolicyContext } from '@/contexts/PolicyContext';
import { Link, useRouter } from '@/navigation';
import { PolicyKeyType, PolicyType } from '@/types/user.type';
import axios from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

export default function PolicyEditPage() {
  const [pageDetail, setPageDetail] = useState<PolicyKeyType | null>(null);
  const [disabled, setDisabled] = useState(false);

  const { policyValue, setPolicyValue } = useContext(PolicyContext);

  const isLoggedIn = !!getCookie('access-token');

  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations('policyEdit');

  const { data: policyData } = useQuery<PolicyType>({
    queryKey: ['users', 'policy'],
    queryFn: async () => {
      const res = await axios.get('/users/policy');
      return res.data.payload;
    },
    enabled: isLoggedIn,
  });

  const { mutate: agreePolicies } = useMutation({
    mutationFn: async () => {
      const res = await axios.put('/users/policy', policyValue);
      return res.data.payload;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      router.back();
    },
  });

  function handleSubmitButtonClick() {
    agreePolicies();
  }

  useEffect(() => {
    if (!isLoggedIn) {
      notFound();
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (!policyData) return;
    if (
      policyData.privacy_policy_agreement &&
      policyData.service_policy_agreement
    ) {
      notFound();
    }
  }, [policyData, router]);

  useEffect(() => {
    setDisabled(
      !policyValue.privacy_policy_agreement ||
        !policyValue.service_policy_agreement,
    );
  }, [policyValue]);

  useEffect(() => {
    if (pageDetail === 'service_policy_agreement') {
      router.push('/policy/service');
    } else if (pageDetail === 'privacy_policy_agreement') {
      router.push('/policy/privacy');
    }
  }, [pageDetail, router]);

  return (
    <>
      <NavBar disabled />
      <div className="px-4 py-12">
        <div className="mx-auto flex w-full max-w-screen-xs flex-col gap-12">
          <h1 className="text-center text-gray-90 title-lg-300">
            {t.rich('title', { br: () => <br /> })}
          </h1>
          <PolicyCheckboxContent
            value={policyValue}
            setValue={setPolicyValue}
            setPageDetail={setPageDetail}
          />
          <div className="flex flex-col items-center gap-3">
            <Button
              variant="black"
              onClick={handleSubmitButtonClick}
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
        </div>
      </div>
    </>
  );
}
