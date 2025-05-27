import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import BottomButtonForDesktop from './BottomButtonForDesktop/BottomButtonForDesktop';
import BottomButtonForMobile from './BottomButtonForMobile/BottomButtonForMobile';
import InputContent from './InputContent/InputContent';
import { GuestValueType } from '@/lib/types';
import axios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

interface MemberLoginProps {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setGuestId: React.Dispatch<React.SetStateAction<string>>;
  guestValue: GuestValueType;
  setGuestValue: React.Dispatch<React.SetStateAction<GuestValueType>>;
  setIsNewGuest: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MemberLoginScreen({
  setPageIndex,
  setGuestId,
  guestValue,
  setGuestValue,
  setIsNewGuest,
}: MemberLoginProps) {
  const [disabled, setDisabled] = useState(true);
  const [nicknameDisabled, setNicknameDisabled] = useState(true);

  const params = useParams<{ id: string }>();

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
      <InputContent
        guestValue={guestValue}
        setGuestValue={setGuestValue}
        setNicknameDisabled={setNicknameDisabled}
      />

      <BottomButtonForDesktop onClick={handleSubmit} disabled={disabled} />
      <BottomButtonForMobile onClick={handleSubmit} disabled={disabled} />
    </div>
  );
}
