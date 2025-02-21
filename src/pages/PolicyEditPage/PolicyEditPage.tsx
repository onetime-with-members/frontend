import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import NavBar from '@/components/NavBar/NavBar';
import Button from '@/components/button/Button/Button';
import PolicyCheckboxContent from '@/components/policy/PolicyCheckboxContent/PolicyCheckboxContent';
import { PolicyContext } from '@/contexts/PolicyContext';
import { PolicyKeyType, PolicyType } from '@/types/user.type';
import axios from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function PolicyEditPage() {
  const [pageDetail, setPageDetail] = useState<PolicyKeyType | null>(null);
  const [disabled, setDisabled] = useState(false);

  const { policyValue, setPolicyValue } = useContext(PolicyContext);

  const isLoggedIn = localStorage.getItem('access-token') !== null;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data: policyData } = useQuery<PolicyType>({
    queryKey: ['users', 'policy'],
    queryFn: async () => {
      const res = await axios.get('/users/policy');
      return res.data.payload;
    },
    enabled: isLoggedIn,
  });

  const agreePolicies = useMutation({
    mutationFn: async () => {
      const res = await axios.put('/users/policy', policyValue);
      return res.data.payload;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate(-1);
    },
  });

  function handleSubmitButtonClick() {
    agreePolicies.mutate();
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(-1);
    }
  }, []);

  useEffect(() => {
    if (!policyData) return;
    if (
      policyData.privacy_policy_agreement &&
      policyData.service_policy_agreement
    ) {
      navigate(-1);
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
      navigate('/policy/service');
    } else if (pageDetail === 'privacy_policy_agreement') {
      navigate('/policy/privacy');
    }
  }, [pageDetail]);

  return (
    <>
      <Helmet>
        <title>{t('policyEdit.agreeToTerms')} | OneTime</title>
      </Helmet>

      <NavBar disabled />
      <div className="px-4 py-12">
        <div className="mx-auto flex w-full max-w-screen-xs flex-col gap-12">
          <h1 className="text-center text-gray-90 title-lg-300">
            <Trans i18nKey="policyEdit.title">
              서비스 이용을 위해 <br />
              약관에 동의해주세요
            </Trans>
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
              {t('policyEdit.submit')}
            </Button>
            <div className="flex items-center gap-1.5 px-4 text-gray-50 text-sm-200">
              <span>{t('policyEdit.toWithdrawText')}</span>
              <Link to="/withdraw" className="text-danger-50 text-sm-200">
                {t('policyEdit.toWithdrawLink')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
