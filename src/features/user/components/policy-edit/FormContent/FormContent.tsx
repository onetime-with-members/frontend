import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import PolicyCheckboxContent from '../../shared/PolicyCheckboxContent';
import LinkToWithdraw from './LinkToWithdraw';
import SubmitButton from './SubmitButton';
import { useEditPolicyMutation } from '@/features/user/api/user.query';
import usePolicyForm from '@/features/user/hooks/usePolicyForm';
import { PolicySchema } from '@/features/user/types';
import { useProgressRouter } from '@/navigation';
import { useRouter } from 'next/navigation';

export default function FormContent() {
  const [pageDetail, setPageDetail] = useState<keyof PolicySchema | null>(null);

  const router = useRouter();

  const {
    handleSubmit,
    formState: { isValid },
    policyValue,
    setPolicyValue,
  } = usePolicyForm();
  const progressRouter = useProgressRouter();

  const { mutateAsync: editPolicy } = useEditPolicyMutation();

  const onSubmit: SubmitHandler<PolicySchema> = async () => {
    await editPolicy(policyValue);
    router.back();
  };

  useEffect(() => {
    if (pageDetail === 'servicePolicy') {
      progressRouter.push('/policy/service');
    } else if (pageDetail === 'privacyPolicy') {
      progressRouter.push('/policy/privacy');
    }
  }, [pageDetail, progressRouter]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
      className="flex flex-col gap-12"
    >
      <PolicyCheckboxContent
        value={policyValue}
        setValue={setPolicyValue}
        setPageDetail={setPageDetail}
      />
      <div className="flex flex-col items-center gap-3">
        <SubmitButton disabled={!isValid} />
        <LinkToWithdraw />
      </div>
    </form>
  );
}
