'use client';

import { createContext, useEffect, useState } from 'react';

import { useUserPolicyQuery } from '@/features/user/api/user.query';
import { defaultPolicy } from '@/features/user/constants';
import { PolicySchema } from '@/features/user/types';
import { useAuth } from '@/lib/auth/auth.client';

export const PolicyContext = createContext<{
  policyValue: PolicySchema;
  setPolicyValue: React.Dispatch<React.SetStateAction<PolicySchema>>;
  policyData: PolicySchema;
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
  const [policyValue, setPolicyValue] = useState<PolicySchema>(defaultPolicy);

  const { isLoggedIn } = useAuth();

  const { data: policyData, isPending: isPolicyPending } = useUserPolicyQuery({
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
