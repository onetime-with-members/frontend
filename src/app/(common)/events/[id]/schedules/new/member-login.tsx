import { useTranslations } from 'next-intl';

import PinPasswordInput from './pin-password';
import Button from '@/components/button';
import FloatingBottomButton from '@/components/button/floating-bottom-button';
import NicknameFormControl from '@/components/user/nickname-form-control';
import { GuestValueType } from '@/lib/types';

export default function MemberLoginSubScreen({
  guestValue,
  setGuestValue,
  setNicknameDisabled,
  disabled,
}: {
  guestValue: GuestValueType;
  setGuestValue: React.Dispatch<React.SetStateAction<GuestValueType>>;
  setNicknameDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
}) {
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
    <div className="flex flex-col gap-[60px]">
      {/* Input Content */}
      <div className="flex flex-col gap-12">
        {/* Nickname */}
        <NicknameFormControl
          value={guestValue.name}
          onChange={(e) => handleInputChange('name')(e.target.value)}
          setSubmitDisabled={setNicknameDisabled}
        />
        {/* Pin Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="pin" className="text-gray-80 text-lg-200">
            {t('password')}
          </label>
          <PinPasswordInput
            inputId="pin"
            pin={guestValue.pin}
            setPin={handleInputChange('pin')}
          />
        </div>
      </div>

      {/* Bottom Button for Desktop */}
      <div className="hidden sm:block">
        <Button type="submit" variant="dark" disabled={disabled} fullWidth>
          {t('next')}
        </Button>
      </div>
      {/* Bottom Button for Mobile */}
      <div className="block sm:hidden">
        <FloatingBottomButton
          type="submit"
          variant="black"
          disabled={disabled}
          fullWidth
        >
          {t('next')}
        </FloatingBottomButton>
      </div>
    </div>
  );
}
