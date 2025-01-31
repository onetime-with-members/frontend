import { OnboardingValueType } from '../..';
import Checkbox from '../Checkbox';

interface CheckItemProps {
  value: OnboardingValueType;
  setValue: React.Dispatch<React.SetStateAction<OnboardingValueType>>;
}

export default function AllCheckItem({ value, setValue }: CheckItemProps) {
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
    <div className="all-check-item flex items-center gap-3 rounded-xl bg-gray-05 p-4">
      <Checkbox
        checked={
          value.service_policy_agreement &&
          value.privacy_policy_agreement &&
          value.marketing_policy_agreement
        }
        handleCheckboxClick={handleAllCheckboxClick}
      />
      <span className="text-gray-90 text-md-300">전체 동의</span>
    </div>
  );
}
