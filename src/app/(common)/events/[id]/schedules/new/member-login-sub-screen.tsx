import { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import PinPasswordInput from './pin-password';
import Button from '@/components/button/button';
import FloatingBottomButton from '@/components/button/floating-bottom-button';
import NicknameFormControl from '@/components/user/nickname-form-control';
import axios from '@/lib/axios';
import { GuestValueType } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function MemberLoginSubScreen({
  setPageIndex,
  setGuestId,
  guestValue,
  setGuestValue,
  setIsNewGuest,
}: {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setGuestId: React.Dispatch<React.SetStateAction<string>>;
  guestValue: GuestValueType;
  setGuestValue: React.Dispatch<React.SetStateAction<GuestValueType>>;
  setIsNewGuest: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [disabled, setDisabled] = useState(true);
  const [nicknameDisabled, setNicknameDisabled] = useState(true);

  const params = useParams<{ id: string }>();

  const t = useTranslations('scheduleAdd');

  const { mutate: checkNewGuest } = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/members/name/action-check', {
        event_id: params.id,
        name: guestValue.name.trim(),
      });
      return res.data;
    },
    onSuccess: (data) => {
      setIsNewGuest(data.payload.is_possible);

      if (data.payload.is_possible) {
        setPageIndex(1);
      } else {
        loginGuest();
      }
    },
  });

  const { mutate: loginGuest } = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/members/action-login', {
        event_id: params.id,
        name: guestValue.name,
        pin: guestValue.pin,
      });
      return res.data.payload;
    },
    onSuccess: (data) => {
      setGuestId(data.member_id);
      setPageIndex(1);
    },
    onError: (error) => {
      const errorStatus = (error as AxiosError).response?.status;

      if (errorStatus === 404) {
        alert('PIN 번호가 올바르지 않습니다.');
      }
    },
  });

  function handleInputChange<T>(key: keyof GuestValueType) {
    return function (value: T) {
      setGuestValue((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
  }

  function handleSubmit() {
    if (disabled) return;
    checkNewGuest();
  }

  useEffect(() => {
    setDisabled(
      guestValue.name === '' ||
        guestValue.pin.length !== 4 ||
        guestValue.pin.includes('-') ||
        nicknameDisabled,
    );
  }, [guestValue, nicknameDisabled]);

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
        <Button
          type="button"
          variant="dark"
          onClick={handleSubmit}
          disabled={disabled}
          fullWidth
        >
          {t('next')}
        </Button>
      </div>
      {/* Bottom Button for Mobile */}
      <div className="block sm:hidden">
        <FloatingBottomButton
          type="button"
          variant="black"
          onClick={handleSubmit}
          disabled={disabled}
          fullWidth
        >
          {t('next')}
        </FloatingBottomButton>
      </div>
    </div>
  );
}
