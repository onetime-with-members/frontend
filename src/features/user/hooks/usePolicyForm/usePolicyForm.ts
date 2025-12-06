import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { policySchema } from '../../schemas';
import { PolicyContext } from '@/features/user/contexts/PolicyContext';
import type { PolicySchema } from '@/features/user/types';
import { zodResolver } from '@hookform/resolvers/zod';

export default function usePolicyForm() {
  const { policyValue, setPolicyValue } = useContext(PolicyContext);

  const form = useForm<PolicySchema>({
    resolver: zodResolver(policySchema),
    mode: 'onChange',
    defaultValues: policyValue,
  });

  const { setValue } = form;

  useEffect(() => {
    setValue('servicePolicy', policyValue.servicePolicy, {
      shouldValidate: true,
    });
    setValue('privacyPolicy', policyValue.privacyPolicy, {
      shouldValidate: true,
    });
    setValue('marketingPolicy', policyValue.marketingPolicy, {
      shouldValidate: true,
    });
  }, [policyValue, setValue]);

  return {
    ...form,
    policyValue,
    setPolicyValue,
  };
}
