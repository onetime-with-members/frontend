import { useTranslations } from 'next-intl';

import Checkbox from '../Checkbox';
import { PolicySchema } from '@/features/user/types';

export default function AllCheckItem({
  value,
  setValue,
}: {
  value: PolicySchema;
  setValue: (newValue: PolicySchema) => void;
}) {
  const t = useTranslations('policyEdit');

  function handleAllCheckboxClick() {
    const isNewAllChecked =
      !value.servicePolicy || !value.privacyPolicy || !value.marketingPolicy;

    setValue({
      ...value,
      servicePolicy: isNewAllChecked,
      privacyPolicy: isNewAllChecked,
      marketingPolicy: isNewAllChecked,
    });
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-xl bg-gray-05 p-4"
      onClick={handleAllCheckboxClick}
    >
      <Checkbox
        checked={
          value.servicePolicy && value.privacyPolicy && value.marketingPolicy
        }
      />
      <span className="text-gray-90 text-md-300">{t('all')}</span>
    </div>
  );
}
