import { createContext, useEffect, useState } from 'react';

import { PolicyType } from '@/types/user.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

interface PolicyContextType {
  policyValue: PolicyType;
  setPolicyValue: React.Dispatch<React.SetStateAction<PolicyType>>;
}

interface PolicyContextProps {
  children: React.ReactNode;
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
}: PolicyContextProps) {
  const [policyValue, setPolicyValue] = useState<PolicyType>({
    service_policy_agreement: false,
    privacy_policy_agreement: false,
    marketing_policy_agreement: false,
  });

  const isLoggedIn = localStorage.getItem('access-token') !== null;

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
