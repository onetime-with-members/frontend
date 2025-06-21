'use client';

import { createContext, useEffect, useState } from 'react';

import { auth } from '@/lib/auth';
import { defaultPolicy } from '@/lib/constants';
import { fetchPolicy } from '@/lib/data';
import { PolicyType } from '@/lib/types';

export const PolicyContext = createContext<{
  policyValue: PolicyType;
  setPolicyValue: React.Dispatch<React.SetStateAction<PolicyType>>;
  revalidatePolicy: () => void;
}>({
  policyValue: defaultPolicy,
  setPolicyValue: () => {},
  revalidatePolicy: () => {},
});

export default function PolicyContextProvider({
  children,
  defaultPolicy: fetchedPolicy,
}: {
  children: React.ReactNode;
  defaultPolicy: PolicyType | undefined;
}) {
  const [policyValue, setPolicyValue] = useState<PolicyType>(
    fetchedPolicy || defaultPolicy,
  );

  async function revalidatePolicy() {
    if (!(await auth())) return;
    const data = await fetchPolicy();
    if (!data) return;
    setPolicyValue(data);
  }

  useEffect(() => {
    revalidatePolicy();
  }, []);

  return (
    <PolicyContext.Provider
      value={{
        policyValue,
        setPolicyValue,
        revalidatePolicy,
      }}
    >
      {children}
    </PolicyContext.Provider>
  );
}
