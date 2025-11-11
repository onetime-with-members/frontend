import { useTranslations } from 'next-intl';
import { UseFormRegisterReturn } from 'react-hook-form';

import Input from '@/components/Input';

export default function InputContent({
  registerUrl,
  onTouched,
}: {
  registerUrl: UseFormRegisterReturn<'url'>;
  onTouched: () => void;
}) {
  const t = useTranslations('everytimeScheduleEdit');

  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-40 text-md-100">{t('description')}</p>
      <Input
        {...registerUrl}
        onChange={(e) => {
          onTouched();
          registerUrl.onChange(e);
        }}
        placeholder={t('placeholder')}
      />
      <p className="text-gray-40 text-sm-100">* {t('publicWarning')}</p>
    </div>
  );
}
