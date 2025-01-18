import clsx from 'clsx';
import { useEffect, useState } from 'react';

import Input from '@/components/form-control/input/Input';

interface NicknameFormControlProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSubmitDisabled: (disabled: boolean) => void;
}

export default function NicknameFormControl({
  value,
  onChange,
  setSubmitDisabled: setButtonDisabled,
}: NicknameFormControlProps) {
  const [invalid, setInvalid] = useState({
    format: false,
    length: false,
    empty: false,
  });

  const isInvalid = invalid.format || invalid.length || invalid.empty;

  useEffect(() => {
    const lettersOnly = /^[\p{L}]+$/u;

    setInvalid({
      format: !lettersOnly.test(value) && value !== '',
      length: value.length > 10,
      empty: value === '',
    });
  }, [value]);

  useEffect(() => {
    if (isInvalid) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [value, invalid]);

  return (
    <div className="flex flex-col gap-2">
      <label className="pl-1 text-gray-90 text-lg-200">이름</label>
      <div className="flex flex-col gap-2">
        <Input
          name="name"
          value={value}
          onChange={onChange}
          placeholder="당신의 이름은 무엇인가요?"
          className={clsx({
            'ring-2 ring-danger-30': invalid.format || invalid.length,
          })}
        />
        <ul className="flex flex-col gap-1">
          {invalid.format && (
            <li className="text-danger-50 text-sm-200">
              특수문자 및 숫자는 사용할 수 없어요
            </li>
          )}
          {invalid.length && (
            <li className="text-danger-50 text-sm-200">
              10자 이내로 입력해주세요
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
