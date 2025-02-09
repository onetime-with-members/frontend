import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import NavBar from '@/components/NavBar';
import Button from '@/components/button/Button';
import PolicyCheckboxContent from '@/components/policy/PolicyCheckboxContent';
import { PolicyContext } from '@/contexts/PolicyContext';
import { PolicyKeyType } from '@/types/user.type';
import axios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function PolicyEditPage() {
  const { policyValue, setPolicyValue } = useContext(PolicyContext);

  const isLoggedIn = localStorage.getItem('access-token') !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(-1);
    }
  }, []);

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

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(
      !policyValue.privacy_policy_agreement ||
        !policyValue.service_policy_agreement,
    );
  }, [policyValue]);

  const [pageDetail, setPageDetail] = useState<PolicyKeyType | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (pageDetail === 'service_policy_agreement') {
      navigate('/policy/service');
    } else if (pageDetail === 'privacy_policy_agreement') {
      navigate('/policy/privacy');
    }
  }, [pageDetail]);

  return (
    <>
      <NavBar disabled />
      <div className="px-4 py-12">
        <div className="mx-auto flex w-full max-w-screen-xs flex-col gap-12">
          <h1 className="text-center text-gray-90 title-lg-300">
            서비스 이용을 위해 <br />
            약관에 동의해주세요
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
              확인
            </Button>
            <div className="flex items-center gap-1.5 px-4 text-gray-50 text-sm-200">
              <span>약관에 동의하지 않으시나요?</span>
              <Link to="/withdraw" className="text-danger-50 text-sm-200">
                탈퇴 페이지로 이동
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
