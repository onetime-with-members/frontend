import { useTranslations } from 'next-intl';

import Checkbox from '../Checkbox';
import { PolicySchema } from '@/features/user/types';
import cn from '@/lib/cn';

export default function AllCheckItem({
  value,
  setValue,
}: {
  value: PolicySchema;
  setValue: (newValue: PolicySchema) => void;
}) {
  const t = useTranslations('PolicyEditPage');

  const isAllChecked =
    value.servicePolicy && value.privacyPolicy && value.marketingPolicy;

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
      className={cn('flex cursor-pointer items-center gap-3 rounded-xl p-4', {
        'bg-primary-00': isAllChecked,
        'bg-gray-05': !isAllChecked,
      })}
      onClick={handleAllCheckboxClick}
    >
      <Checkbox checked={isAllChecked} />
      <span className="text-gray-90 text-md-300">{t('all')}</span>
    </div>
  );
}
