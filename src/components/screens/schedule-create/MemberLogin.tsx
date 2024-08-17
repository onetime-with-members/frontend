import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../../../api/axios';
import { EventValue } from '../../../types/event.type';
import { MemberValue } from '../../../types/member.type';
import Input from '../../Input';
import FloatingBottomButton from '../../floating-button/schedule-create/FloatingBottomButton';
import ScheduleInputLabel from '../../input-label/ScheduleInputLabel';
import PinPasswordInput from '../../pin-password/PinPasswordInput';
import { useMutation } from '@tanstack/react-query';

interface MemberLoginProps {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setMemberId: React.Dispatch<React.SetStateAction<string>>;
  setEventCategory: React.Dispatch<
    React.SetStateAction<EventValue['category']>
  >;
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MemberLogin({
  setPageIndex,
  setMemberId,
  setEventCategory,
  setIsEmpty,
}: MemberLoginProps) {
  const [value, setValue] = useState<MemberValue>({
    name: '',
    pin: '',
  });
  const [disabled, setDisabled] = useState(true);

  const params = useParams();

  const registerMember = useMutation({
    mutationFn: () => {
      return axios.post('/members/action-login', {
        name: value.name,
        pin: value.pin,
        event_id: params.eventId,
      });
    },
    onSuccess: (data) => {
      setMemberId(data.data.payload.member_id);
      setEventCategory(data.data.payload.category);
      setPageIndex(1);
    },
  });

  function handleInputChange<T>(key: keyof MemberValue) {
    return function (value: T) {
      setValue((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
  }

  function handleSubmit() {
    if (disabled) return;
    registerMember.mutate();
  }

  useEffect(() => {
    setIsEmpty(
      value.name === '' && (value.pin.length === 0 || value.pin === '----'),
    );
    setDisabled(
      value.name === '' || value.pin.length !== 4 || value.pin.includes('-'),
    );
  }, [value]);

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
            value={value.name}
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
            pin={value.pin}
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
