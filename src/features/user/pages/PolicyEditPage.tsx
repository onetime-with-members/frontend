'use client';

import { useContext, useEffect } from 'react';

import FormContent from '../components/policy-edit/FormContent';
import Heading from '../components/policy-edit/Heading';
import { PolicyContext } from '../contexts/PolicyContext';
import NavBar from '@/components/NavBar';
import useHomeUrl from '@/features/home/hooks/useHomeUrl';
import { useRouter } from 'next/navigation';

export default function PolicyEditPage() {
  const { policyData } = useContext(PolicyContext);

  const router = useRouter();

  const homeUrl = useHomeUrl();

  useEffect(() => {
    if (policyData.privacyPolicy && policyData.servicePolicy) {
      router.push(homeUrl);
    }
  }, [policyData]);

  return (
    <>
      <NavBar disabled />
      <div className="px-4 py-12">
        <div className="mx-auto flex w-full max-w-screen-xs flex-col gap-12">
          <Heading />
          <FormContent />
        </div>
      </div>
    </>
  );
}
