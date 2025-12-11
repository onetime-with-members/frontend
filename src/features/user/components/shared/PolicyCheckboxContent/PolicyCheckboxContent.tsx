import { useTranslations } from 'next-intl';

import AllCheckItem from './AllCheckItem';
import CheckItem from './CheckItem';
import { PolicySchema } from '@/features/user/types';

export default function PolicyCheckboxContent({
  value,
  setValue,
  setPageDetail,
}: {
  value: PolicySchema;
  setValue: (newValue: PolicySchema) => void;
  setPageDetail: React.Dispatch<
    React.SetStateAction<keyof PolicySchema | null>
  >;
}) {
  const t = useTranslations('policyEdit');

  return (
    <div className="flex flex-col gap-6">
      <AllCheckItem value={value} setValue={setValue} />
      <div
        className="flex flex-col gap-6 px-4"
        data-testid="policy-single-checkbox-list"
      >
        <CheckItem
          checkedKey="servicePolicy"
          value={value}
          setValue={setValue}
          setPageDetail={setPageDetail}
          hasPageDetail
        >
          {t('termsOfService')}
        </CheckItem>
        <CheckItem
          checkedKey="privacyPolicy"
          value={value}
          setValue={setValue}
          setPageDetail={setPageDetail}
          hasPageDetail
        >
          {t('privacyPolicy')}
        </CheckItem>
        <CheckItem
          checkedKey="marketingPolicy"
          value={value}
          setValue={setValue}
          setPageDetail={setPageDetail}
        >
          {t('marketing')}
        </CheckItem>
      </div>
    </div>
  );
}
