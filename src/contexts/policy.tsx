'use client';

import { getCookie } from 'cookies-next';
import { createContext, useEffect, useState } from 'react';

import axios from '@/lib/axios';
import { defaultPolicy } from '@/lib/constants';
import { PolicyType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export const PolicyContext = createContext<{
  policyValue: PolicyType;
  setPolicyValue: React.Dispatch<React.SetStateAction<PolicyType>>;
}>({
  policyValue: defaultPolicy,
  setPolicyValue: () => {},
});

export default function PolicyContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [policyValue, setPolicyValue] = useState<PolicyType>(defaultPolicy);

  const isLoggedIn = !!getCookie('session');

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
    setPolicyValue(policyData);
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
