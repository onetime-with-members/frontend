import { useTranslations } from 'next-intl';

import GrayBox from './GrayBox';
import RedCheckbox from './RedCheckbox';

export default function AgreeToWithdraw({
  isChecked,
  onChecked,
}: {
  isChecked: boolean;
  onChecked: () => void;
}) {
  const t = useTranslations('withdraw');

  return (
    <div className="flex w-full flex-col gap-4">
      <GrayBox title={t('title1')} description={t('description1')} />
      <GrayBox title={t('title2')} description={t('description2')} />
      <div
        className="flex cursor-pointer items-center gap-4 rounded-xl bg-danger-10 p-4"
        onClick={onChecked}
      >
        <RedCheckbox isChecked={isChecked} />
        <div className="text-danger-60 text-md-200">{t('agreeText')}</div>
      </div>
    </div>
  );
}
