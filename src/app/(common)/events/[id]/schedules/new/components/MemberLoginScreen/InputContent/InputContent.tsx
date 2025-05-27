import { useTranslations } from 'next-intl';

import PinPasswordInput from './PinPasswordInput/PinPasswordInput';
import ScheduleInputLabel from './ScheduleInputLabel/ScheduleInputLabel';
import NicknameFormControl from '@/components/form-control/NicknameFormControl/NicknameFormControl';
import { GuestValueType } from '@/lib/types';

interface InputContentProps {
  guestValue: GuestValueType;
  setGuestValue: React.Dispatch<React.SetStateAction<GuestValueType>>;
  setNicknameDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputContent({
  guestValue,
  setGuestValue,
  setNicknameDisabled,
}: InputContentProps) {
  const t = useTranslations('scheduleAdd');

  function handleInputChange<T>(key: keyof GuestValueType) {
    return function (value: T) {
      setGuestValue((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
  }

  return (
    <div className="flex flex-col gap-12">
      <NicknameFormControl
        value={guestValue.name}
        onChange={(e) => handleInputChange('name')(e.target.value)}
        setSubmitDisabled={setNicknameDisabled}
      />
      <div className="flex flex-col gap-2">
        <ScheduleInputLabel htmlFor="pin">{t('password')}</ScheduleInputLabel>
        <PinPasswordInput
          inputId="pin"
          pin={guestValue.pin}
          setPin={handleInputChange('pin')}
        />
      </div>
    </div>
  );
}
