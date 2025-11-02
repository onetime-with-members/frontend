import { useTranslations } from 'next-intl';
import { Control, Controller } from 'react-hook-form';

import PinPasswordInput from './PinPasswordInput';
import { GuestSchema } from '@/features/event/types';

export default function PinPasswordControl({
  control,
}: {
  control: Control<GuestSchema>;
}) {
  const t = useTranslations('scheduleAdd');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="pin" className="text-gray-80 text-lg-200">
          {t('password')}
        </label>
        <Controller
          name="pin"
          control={control}
          render={({ field }) => (
            <PinPasswordInput
              inputId="pin"
              pin={field.value}
              setPin={field.onChange}
            />
          )}
        />
      </div>
      <div
        className="rounded-xl bg-[#e8ebfc80] px-4 py-3 leading-loose text-primary-40 text-sm-100"
        style={{ lineHeight: '150%' }}
      >
        {t('passwordInfo')}
      </div>
    </div>
  );
}
