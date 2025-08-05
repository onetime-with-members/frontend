'use client';

import { createContext, useEffect, useState } from 'react';

import { userPolicyQueryOptions } from '@/lib/api/query-options';
import { useAuth } from '@/lib/auth/auth.client';
import { defaultPolicy } from '@/lib/constants';
import { PolicyFormType } from '@/lib/validation/form-types';
import { useQuery } from '@tanstack/react-query';

export const PolicyContext = createContext<{
  policyValue: PolicyFormType;
  setPolicyValue: React.Dispatch<React.SetStateAction<PolicyFormType>>;
  policyData: PolicyFormType;
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
  const [policyValue, setPolicyValue] = useState<PolicyFormType>(defaultPolicy);

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
