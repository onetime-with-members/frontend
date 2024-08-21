import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../../../api/axios';
import { MemberValue } from '../../../types/member.type';
import Input from '../../Input';
import FloatingBottomButton from '../../floating-button/schedule-create/FloatingBottomButton';
import ScheduleInputLabel from '../../input-label/ScheduleInputLabel';
import PinPasswordInput from '../../pin-password/PinPasswordInput';
import { useMutation } from '@tanstack/react-query';

interface MemberLoginProps {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setMemberId: React.Dispatch<React.SetStateAction<string>>;
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  memberValue: MemberValue;
  setMemberValue: React.Dispatch<React.SetStateAction<MemberValue>>;
  setIsNewMember: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MemberLogin({
  setPageIndex,
  setMemberId,
  setIsEmpty,
  memberValue,
  setMemberValue,
  setIsNewMember,
}: MemberLoginProps) {
  const [disabled, setDisabled] = useState(true);

  const params = useParams();

  const checkNewMember = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/members/name/action-check', {
        event_id: params.eventId,
        name: memberValue.name,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setIsNewMember(data.payload.is_possible);
      if (data.payload.is_possible) {
        setPageIndex(1);
      } else {
        loginMember.mutate();
      }
    },
  });

  const loginMember = useMutation({
    mutationFn: () => {
      return axios.post('/members/action-login', {
        event_id: params.eventId,
        name: memberValue.name,
        pin: memberValue.pin,
      });
    },
    onSuccess: (data) => {
      setMemberId(data.data.payload.member_id);
      setPageIndex(1);
    },
    onError: (error) => {
      const errorStatus = (error as AxiosError).response?.status;
      if (errorStatus === 404) {
        alert('PIN 번호가 올바르지 않습니다.');
      }
    },
  });

  function handleInputChange<T>(key: keyof MemberValue) {
    return function (value: T) {
      setMemberValue((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
  }

  function handleSubmit() {
    if (disabled) return;
    setMemberValue((prev) => ({
      ...prev,
      name: prev.name.trim(),
    }));
    checkNewMember.mutate();
  }

  useEffect(() => {
    setIsEmpty(
      memberValue.name === '' &&
        (memberValue.pin.length === 0 || memberValue.pin === '----'),
    );
    setDisabled(
      memberValue.name === '' ||
        memberValue.pin.length !== 4 ||
        memberValue.pin.includes('-'),
    );
  }, [memberValue]);

  return (
    <>
      <div>
        <div>
          <ScheduleInputLabel htmlFor="name" required>
            이름
          </ScheduleInputLabel>
          <Input
            className="mt-2"
            id="name"
            name="name"
            placeholder="이름"
            value={memberValue.name}
            onChange={(e) => handleInputChange('name')(e.target.value)}
          />
        </div>
        <div className="mt-12">
          <ScheduleInputLabel htmlFor="pin" required>
            PIN 번호
          </ScheduleInputLabel>
          <PinPasswordInput
            className="mt-2"
            inputId="pin"
            pin={memberValue.pin}
            setPin={handleInputChange('pin')}
          />
        </div>
      </div>
      <FloatingBottomButton onClick={handleSubmit} disabled={disabled}>
        다음
      </FloatingBottomButton>
    </>
  );
}
