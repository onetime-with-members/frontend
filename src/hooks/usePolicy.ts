import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AgreementType } from '@/types/user.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function usePolicy() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem('access-token') !== null;

  const { data: policyData } = useQuery<AgreementType>({
    queryKey: ['users', 'policy'],
    queryFn: async () => {
      const res = await axios.get('/users/policy');
      return res.data.payload;
    },
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (!policyData || !isLoggedIn) return;
    if (
      !policyData.service_policy_agreement ||
      !policyData.privacy_policy_agreement
    ) {
      if (
        !location.pathname.startsWith('/policy') &&
        location.pathname !== '/withdraw'
      ) {
        navigate('/policy/edit');
      }
    }
  }, [location, policyData, isLoggedIn]);

  return {
    policyData,
    isLoggedIn,
  };
}
