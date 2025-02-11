import clsx from 'clsx';

import Checkbox from '../Checkbox/Checkbox';
import { PolicyKeyType, PolicyType } from '@/types/user.type';
import { IconChevronRight } from '@tabler/icons-react';

interface CheckItemProps {
  children: React.ReactNode;
  checkedKey: keyof PolicyType;
  value: PolicyType;
  setValue: React.Dispatch<React.SetStateAction<PolicyType>>;
  setPageDetail: React.Dispatch<React.SetStateAction<PolicyKeyType | null>>;
  hasPageDetail?: boolean;
}

export default function CheckItem({
  children,
  checkedKey,
  value,
  setValue,
  setPageDetail,
  hasPageDetail,
}: CheckItemProps) {
  function handleCheckboxClick(event: React.MouseEvent) {
    event.stopPropagation();
    setValue((prevValue) => ({
      ...prevValue,
      [checkedKey]: !prevValue[checkedKey],
    }));
  }

  function handlePageDetailOpen() {
    if (
      checkedKey === 'service_policy_agreement' ||
      checkedKey === 'privacy_policy_agreement'
    ) {
      setPageDetail(checkedKey);
    } else {
      setPageDetail(null);
    }
  }

  return (
    <div
      className={clsx('flex items-center justify-between', {
        'cursor-pointer': hasPageDetail,
      })}
      onClick={handlePageDetailOpen}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={value[checkedKey] as boolean}
          onCheck={handleCheckboxClick}
        />
        <span className="text-gray-60 text-md-200">{children}</span>
      </div>
      {hasPageDetail && (
        <span>
          <IconChevronRight className="text-gray-20" />
        </span>
      )}
    </div>
  );
}
