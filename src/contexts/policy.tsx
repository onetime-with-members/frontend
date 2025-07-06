'use client';

import { createContext, useEffect, useState } from 'react';

import { useAuth } from '@/lib/api/auth.client';
import { userPolicyQueryOptions } from '@/lib/api/query-options';
import { defaultPolicy } from '@/lib/constants';
import { PolicyType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export const PolicyContext = createContext<{
  policyValue: PolicyType;
  setPolicyValue: React.Dispatch<React.SetStateAction<PolicyType>>;
  policyData: PolicyType;
  isPolicyPending: boolean;
}>({
  policyValue: defaultPolicy,
  setPolicyValue: () => {},
  policyData: defaultPolicy,
  isPolicyPending: true,
});

export default function PolicyContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [policyValue, setPolicyValue] = useState<PolicyType>(defaultPolicy);

  const { isLoggedIn } = useAuth();

  const { data: policyData, isPending: isPolicyPending } = useQuery({
    ...userPolicyQueryOptions,
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
        policyData: policyData || defaultPolicy,
        isPolicyPending,
      }}
    >
      {children}
    </PolicyContext.Provider>
  );
}
