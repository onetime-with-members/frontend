import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BottomButtonForDesktop from './BottomButtonForDesktop';
import BottomButtonForMobile from './BottomButtonForMobile';
import InputContent from './InputContent';
import { GuestValue } from '@/types/user.type';
import axios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

interface MemberLoginProps {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setGuestId: React.Dispatch<React.SetStateAction<string>>;
  guestValue: GuestValue;
  setGuestValue: React.Dispatch<React.SetStateAction<GuestValue>>;
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

  const params = useParams();

  const checkNewGuest = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/members/name/action-check', {
        event_id: params.eventId,
        name: guestValue.name.trim(),
      });
      return res.data;
    },
    onSuccess: (data) => {
      setIsNewGuest(data.payload.is_possible);

      if (data.payload.is_possible) {
        setPageIndex(1);
      } else {
        loginGuest.mutate();
      }
    },
  });

  const loginGuest = useMutation({
    mutationFn: () => {
      return axios.post('/members/action-login', {
        event_id: params.eventId,
        name: guestValue.name,
        pin: guestValue.pin,
      });
    },
    onSuccess: (data) => {
      setGuestId(data.data.payload.member_id);
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
    checkNewGuest.mutate();
  }

  useEffect(() => {
    setDisabled(
      guestValue.name === '' ||
        guestValue.pin.length !== 4 ||
        guestValue.pin.includes('-'),
    );
  }, [guestValue]);

  return (
    <div className="flex flex-col gap-14">
      <InputContent guestValue={guestValue} setGuestValue={setGuestValue} />
      <>
        <BottomButtonForDesktop onClick={handleSubmit} disabled={disabled} />
        <BottomButtonForMobile onClick={handleSubmit} disabled={disabled} />
      </>
    </div>
  );
}
