import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../../api/axios';
import { MemberValue } from '../../types/member.type';
import FloatingBottomButton from '../floating-button/schedule-create/FloatingBottomButton';
import ScheduleInputLabel from '../form-control/input-label/ScheduleInputLabel';
import Input from '../form-control/input/Input';
import PinPasswordInput from '../form-control/pin-password/PinPasswordInput';
import { useMutation } from '@tanstack/react-query';

interface MemberLoginProps {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setMemberId: React.Dispatch<React.SetStateAction<string>>;
  memberValue: MemberValue;
  setMemberValue: React.Dispatch<React.SetStateAction<MemberValue>>;
  setIsNewMember: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MemberLogin({
  setPageIndex,
  setMemberId,
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
    setDisabled(
      memberValue.name === '' ||
        memberValue.pin.length !== 4 ||
        memberValue.pin.includes('-'),
    );
  }, [memberValue]);

  return (
    <>
      <div className="flex flex-col gap-12">
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
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <ScheduleInputLabel htmlFor="pin" required>
              비밀번호
            </ScheduleInputLabel>
            <PinPasswordInput
              inputId="pin"
              pin={memberValue.pin}
              setPin={handleInputChange('pin')}
            />
          </div>
          <p className="text-primary-40">
            비밀번호를 설정하면, 같은 이름과 비밀번호를 입력했을 때 스케줄을
            수정할 수 있어요.
          </p>
        </div>
      </div>
      <FloatingBottomButton onClick={handleSubmit} disabled={disabled}>
        다음
      </FloatingBottomButton>
    </>
  );
}
