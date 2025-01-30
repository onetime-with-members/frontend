import { useEffect, useState } from 'react';

import ScreenLayout from '../ScreenLayout';
import AllCheckItem from './AllCheckItem';
import CheckItem from './CheckItem';
import PrivacyDetail from './PrivacyDetail';

interface PrivacyScreenProps {
  isVisible: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export type CheckedType = {
  agreement: boolean;
  privacy: boolean;
  marketing: boolean;
};

export type PageDetailType = 'agreement' | 'privacy' | null;

export default function PrivacyScreen({
  isVisible,
  setPage,
}: PrivacyScreenProps) {
  const [disabled, setDisabled] = useState(true);
  const [checked, setChecked] = useState<CheckedType>({
    agreement: false,
    privacy: false,
    marketing: false,
  });
  const [pageDetail, setPageDetail] = useState<PageDetailType>(null);

  function handleNextButtonClick() {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    setDisabled(!checked.agreement || !checked.privacy);
  }, [checked]);

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
        handleNextButtonClick={handleNextButtonClick}
      >
        <div className="flex flex-col gap-6">
          <AllCheckItem checked={checked} setChecked={setChecked} />
          <div className="flex flex-col gap-6 px-4">
            <CheckItem
              checkedKey="agreement"
              checked={checked}
              setChecked={setChecked}
              setPageDetail={setPageDetail}
            >
              서비스 이용약관(필수)
            </CheckItem>
            <CheckItem
              checkedKey="privacy"
              checked={checked}
              setChecked={setChecked}
              setPageDetail={setPageDetail}
            >
              개인정보 수집 및 이용 동의(필수)
            </CheckItem>
            <CheckItem
              checkedKey="marketing"
              checked={checked}
              setChecked={setChecked}
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
