import { useTranslations } from 'next-intl';

import AllCheckItem from './AllCheckItem/AllCheckItem';
import CheckItem from './CheckItem/CheckItem';
import { PolicyKeyType, PolicyType } from '@/lib/types';

interface PolicyCheckboxContentProps {
  value: PolicyType;
  setValue: React.Dispatch<React.SetStateAction<PolicyType>>;
  setPageDetail: React.Dispatch<React.SetStateAction<PolicyKeyType | null>>;
}

export default function PolicyCheckboxContent({
  value,
  setValue,
  setPageDetail,
}: PolicyCheckboxContentProps) {
  const t = useTranslations('policyEdit');

  return (
    <div className="flex flex-col gap-6">
      <AllCheckItem value={value} setValue={setValue} />
      <div className="flex flex-col gap-6 px-4">
        <CheckItem
          checkedKey="service_policy_agreement"
          value={value}
          setValue={setValue}
          setPageDetail={setPageDetail}
          hasPageDetail
        >
          {t('termsOfService')}
        </CheckItem>
        <CheckItem
          checkedKey="privacy_policy_agreement"
          value={value}
          setValue={setValue}
          setPageDetail={setPageDetail}
          hasPageDetail
        >
          {t('privacyPolicy')}
        </CheckItem>
        <CheckItem
          checkedKey="marketing_policy_agreement"
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
