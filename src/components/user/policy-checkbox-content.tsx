import { useTranslations } from 'next-intl';

import CheckIcon from '@/components/icon/CheckIcon';
import cn from '@/lib/cn';
import { PolicyFormType } from '@/lib/validation/form-types';
import { IconChevronRight } from '@tabler/icons-react';

interface PolicyCheckboxContentProps {
  value: PolicyFormType;
  setValue: React.Dispatch<React.SetStateAction<PolicyFormType>>;
  setPageDetail: React.Dispatch<
    React.SetStateAction<keyof PolicyFormType | null>
  >;
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
          checkedKey="servicePolicy"
          value={value}
          setValue={setValue}
          setPageDetail={setPageDetail}
          hasPageDetail
        >
          {t('termsOfService')}
        </CheckItem>
        <CheckItem
          checkedKey="privacyPolicy"
          value={value}
          setValue={setValue}
          setPageDetail={setPageDetail}
          hasPageDetail
        >
          {t('privacyPolicy')}
        </CheckItem>
        <CheckItem
          checkedKey="marketingPolicy"
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

function CheckItem({
  children,
  checkedKey,
  value,
  setValue,
  setPageDetail,
  hasPageDetail,
}: {
  children: React.ReactNode;
  checkedKey: keyof PolicyFormType;
  value: PolicyFormType;
  setValue: React.Dispatch<React.SetStateAction<PolicyFormType>>;
  setPageDetail: React.Dispatch<
    React.SetStateAction<keyof PolicyFormType | null>
  >;
  hasPageDetail?: boolean;
}) {
  function handleCheckboxClick(event: React.MouseEvent) {
    event.stopPropagation();
    setValue((prevValue) => ({
      ...prevValue,
      [checkedKey]: !prevValue[checkedKey],
    }));
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

function AllCheckItem({
  value,
  setValue,
}: {
  value: PolicyFormType;
  setValue: React.Dispatch<React.SetStateAction<PolicyFormType>>;
}) {
  const t = useTranslations('policyEdit');

  function handleAllCheckboxClick() {
    const isNewAllChecked =
      !value.servicePolicy || !value.privacyPolicy || !value.marketingPolicy;

    setValue((prevValue) => ({
      ...prevValue,
      servicePolicy: isNewAllChecked,
      privacyPolicy: isNewAllChecked,
      marketingPolicy: isNewAllChecked,
    }));
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-xl bg-gray-05 p-4"
      onClick={handleAllCheckboxClick}
    >
      <Checkbox
        checked={
          value.servicePolicy && value.privacyPolicy && value.marketingPolicy
        }
      />
      <span className="text-gray-90 text-md-300">{t('all')}</span>
    </div>
  );
}

function Checkbox({
  checked,
  onCheck,
}: {
  checked: boolean;
  onCheck?: (event: React.MouseEvent) => void;
}) {
  return (
    <div
      className={cn(
        'flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-gray-15 text-xl',
        {
          'bg-primary-40': checked,
        },
      )}
      onClick={onCheck}
    >
      <CheckIcon className="text-white" />
    </div>
  );
}
