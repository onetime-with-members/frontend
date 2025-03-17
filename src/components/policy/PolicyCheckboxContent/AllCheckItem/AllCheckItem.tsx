import { useTranslations } from 'next-intl';

import Checkbox from '../Checkbox/Checkbox';
import { PolicyType } from '@/types/user.type';

interface CheckItemProps {
  value: PolicyType;
  setValue: React.Dispatch<React.SetStateAction<PolicyType>>;
}

export default function AllCheckItem({ value, setValue }: CheckItemProps) {
  const t = useTranslations('policyEdit');

  function handleAllCheckboxClick() {
    const isNewAllChecked =
      !value.service_policy_agreement ||
      !value.privacy_policy_agreement ||
      !value.marketing_policy_agreement;

    setValue((prevValue) => ({
      ...prevValue,
      service_policy_agreement: isNewAllChecked,
      privacy_policy_agreement: isNewAllChecked,
      marketing_policy_agreement: isNewAllChecked,
    }));
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-xl bg-gray-05 p-4"
      onClick={handleAllCheckboxClick}
    >
      <Checkbox
        checked={
          value.service_policy_agreement &&
          value.privacy_policy_agreement &&
          value.marketing_policy_agreement
        }
      />
      <span className="text-gray-90 text-md-300">{t('all')}</span>
    </div>
  );
}
