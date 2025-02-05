import AllCheckItem from './AllCheckItem';
import CheckItem from './CheckItem';
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
          서비스 이용약관(필수)
        </CheckItem>
        <CheckItem
          checkedKey="privacy_policy_agreement"
          value={value}
          setValue={setValue}
          setPageDetail={setPageDetail}
          hasPageDetail
        >
          개인정보 수집 및 이용 동의(필수)
        </CheckItem>
        <CheckItem
          checkedKey="marketing_policy_agreement"
          value={value}
          setValue={setValue}
          setPageDetail={setPageDetail}
        >
          마케팅 정보 수신 동의(선택)
        </CheckItem>
      </div>
    </div>
  );
}
