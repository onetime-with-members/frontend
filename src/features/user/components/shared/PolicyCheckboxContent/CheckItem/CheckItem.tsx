import Checkbox from '../Checkbox';
import { PolicySchema } from '@/features/user/types';
import cn from '@/lib/cn';
import { IconChevronRight } from '@tabler/icons-react';

export default function CheckItem({
  children,
  checkedKey,
  value,
  setValue,
  setPageDetail,
  hasPageDetail,
}: {
  children: React.ReactNode;
  checkedKey: keyof PolicySchema;
  value: PolicySchema;
  setValue: (newValue: PolicySchema) => void;
  setPageDetail: React.Dispatch<
    React.SetStateAction<keyof PolicySchema | null>
  >;
  hasPageDetail?: boolean;
}) {
  function handleCheckboxClick(event: React.MouseEvent) {
    event.stopPropagation();
    setValue({
      ...value,
      [checkedKey]: !value[checkedKey],
    });
  }

  function handlePageDetailOpen() {
    if (checkedKey === 'servicePolicy' || checkedKey === 'privacyPolicy') {
      setPageDetail(checkedKey);
    } else {
      setPageDetail(null);
    }
  }

  return (
    <div
      className={cn('flex items-center justify-between', {
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
