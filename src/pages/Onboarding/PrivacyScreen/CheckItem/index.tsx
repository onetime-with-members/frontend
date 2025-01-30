import { CheckedType, PageDetailType } from '..';
import clsx from 'clsx';

import Checkbox from '../Checkbox';
import { IconChevronRight } from '@tabler/icons-react';

interface CheckItemProps {
  children: React.ReactNode;
  checkedKey: keyof CheckedType;
  checked: CheckedType;
  setChecked: React.Dispatch<React.SetStateAction<CheckedType>>;
  setPageDetail?: React.Dispatch<React.SetStateAction<PageDetailType>>;
}

export default function CheckItem({
  children,
  checkedKey,
  checked,
  setChecked,
  setPageDetail,
}: CheckItemProps) {
  function handleCheckboxClick(event: React.MouseEvent) {
    event.stopPropagation();
    setChecked((prevChecked) => ({
      ...prevChecked,
      [checkedKey]: !prevChecked[checkedKey],
    }));
  }

  function handlePageDetailOpen() {
    if (!setPageDetail) return;
    if (checkedKey === 'agreement' || checkedKey === 'privacy') {
      setPageDetail(checkedKey);
    } else {
      setPageDetail(null);
    }
  }

  return (
    <div
      className={clsx('flex items-center justify-between', {
        'cursor-pointer': setPageDetail,
      })}
      onClick={handlePageDetailOpen}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={checked[checkedKey]}
          handleCheckboxClick={handleCheckboxClick}
        />
        <span className="text-gray-60 text-md-200">{children}</span>
      </div>
      {setPageDetail && (
        <span>
          <IconChevronRight className="text-gray-20" />
        </span>
      )}
    </div>
  );
}
