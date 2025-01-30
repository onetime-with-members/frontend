import { CheckedType } from '..';

import Checkbox from '../Checkbox';

interface CheckItemProps {
  checked: CheckedType;
  setChecked: React.Dispatch<React.SetStateAction<CheckedType>>;
}

export default function AllCheckItem({ checked, setChecked }: CheckItemProps) {
  function handleAllCheckboxClick() {
    const isNewAllChecked =
      !checked.agreement || !checked.privacy || !checked.marketing;
    setChecked({
      agreement: isNewAllChecked,
      privacy: isNewAllChecked,
      marketing: isNewAllChecked,
    });
  }

  return (
    <div className="all-check-item flex items-center gap-3 rounded-xl bg-gray-05 p-4">
      <Checkbox
        checked={checked.agreement && checked.privacy && checked.marketing}
        handleCheckboxClick={handleAllCheckboxClick}
      />
      <span className="text-gray-90 text-md-300">전체 동의</span>
    </div>
  );
}
