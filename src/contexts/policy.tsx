'use client';

import { getCookie } from 'cookies-next';
import { createContext, useEffect, useState } from 'react';

import axios from '@/lib/axios';
import { PolicyType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

interface PolicyContextType {
  policyValue: PolicyType;
  setPolicyValue: React.Dispatch<React.SetStateAction<PolicyType>>;
}

export const PolicyContext = createContext<PolicyContextType>({
  policyValue: {
    service_policy_agreement: false,
    privacy_policy_agreement: false,
    marketing_policy_agreement: false,
  },
  setPolicyValue: () => {},
});

export default function PolicyContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [policyValue, setPolicyValue] = useState<PolicyType>({
    service_policy_agreement: false,
    privacy_policy_agreement: false,
    marketing_policy_agreement: false,
  });

  const isLoggedIn = !!getCookie('access-token');

  const { data: policyData } = useQuery<PolicyType>({
    queryKey: ['users', 'policy'],
    queryFn: async () => {
      const res = await axios.get('/users/policy');
      return res.data.payload;
    },
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (!policyData) return;
    setPolicyValue({
      ...policyData,
    });
  }, [policyData]);

  return (
    <PolicyContext.Provider
      value={{
        policyValue,
        setPolicyValue,
      }}
    >
      {children}
    </PolicyContext.Provider>
  );
}
