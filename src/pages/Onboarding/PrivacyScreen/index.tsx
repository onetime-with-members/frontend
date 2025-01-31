import { OnboardingValueType } from '..';
import { useEffect, useState } from 'react';

import ScreenLayout from '../ScreenLayout';
import AllCheckItem from './AllCheckItem';
import CheckItem from './CheckItem';
import PrivacyDetail from './PrivacyDetail';

interface PrivacyScreenProps {
  isVisible: boolean;
  value: OnboardingValueType;
  setValue: React.Dispatch<React.SetStateAction<OnboardingValueType>>;
  handleNextButtonClick: (disabled: boolean) => void;
}

export type PageDetailType = keyof OnboardingValueType | null;

export default function PrivacyScreen({
  isVisible,
  value,
  setValue,
  handleNextButtonClick,
}: PrivacyScreenProps) {
  const [disabled, setDisabled] = useState(true);
  const [pageDetail, setPageDetail] = useState<PageDetailType>(null);

  useEffect(() => {
    setDisabled(
      !value.service_policy_agreement || !value.privacy_policy_agreement,
    );
  }, [value]);

  return (
    <>
      <ScreenLayout
        isVisible={isVisible}
        title={
          <>
            서비스 이용을 위해 <br />
            약관에 동의해주세요
          </>
        }
        disabled={disabled}
        handleNextButtonClick={() => handleNextButtonClick(disabled)}
      >
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
      </ScreenLayout>

      {pageDetail && (
        <PrivacyDetail pageDetail={pageDetail} setPageDetail={setPageDetail} />
      )}
    </>
  );
}
