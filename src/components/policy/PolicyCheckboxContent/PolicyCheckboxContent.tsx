import { useTranslation } from 'react-i18next';

import AllCheckItem from './AllCheckItem/AllCheckItem';
import CheckItem from './CheckItem/CheckItem';
import { PolicyKeyType, PolicyType } from '@/types/user.type';

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
  const { t } = useTranslation();

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
          {t('policyEdit.termsOfService')}
        </CheckItem>
        <CheckItem
          checkedKey="privacy_policy_agreement"
          value={value}
          setValue={setValue}
          setPageDetail={setPageDetail}
          hasPageDetail
        >
          {t('policyEdit.privacyPolicy')}
        </CheckItem>
        <CheckItem
          checkedKey="marketing_policy_agreement"
          value={value}
          setValue={setValue}
          setPageDetail={setPageDetail}
        >
          {t('policyEdit.marketing')}
        </CheckItem>
      </div>
    </div>
  );
}
