import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Input from '@/components/Input/Input';
import cn from '@/utils/cn';

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

  const { t } = useTranslation();

  const isInvalid = invalid.format || invalid.length || invalid.empty;

  useEffect(() => {
    const lettersOnly = /^[\p{L} ]+$/u;

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
      <label className="pl-1 text-gray-90 text-lg-200">
        {t('nickname.name')}
      </label>
      <div className="flex flex-col gap-2">
        <Input
          name="nickname"
          value={value}
          onChange={onChange}
          placeholder={t('nickname.enterName')}
          className={cn({
            'ring-2 ring-danger-30': invalid.format || invalid.length,
          })}
        />
        <ul className="flex h-4 flex-col gap-1">
          {invalid.format && (
            <li className="text-danger-50 text-sm-200">
              {t('nickname.noSpecialCharactersAndNumbers')}
            </li>
          )}
          {invalid.length && (
            <li className="text-danger-50 text-sm-200">
              {t('nickname.maxCharacters')}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
