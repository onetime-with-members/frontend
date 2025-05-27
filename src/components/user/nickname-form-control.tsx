import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import Input from '../input';
import cn from '@/lib/cn';

export default function NicknameFormControl({
  value,
  onChange,
  setSubmitDisabled: setButtonDisabled,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSubmitDisabled: (disabled: boolean) => void;
}) {
  const [invalid, setInvalid] = useState({
    format: false,
    length: false,
    empty: false,
  });

  const t = useTranslations('nickname');

  const isInvalid = invalid.format || invalid.length || invalid.empty;

  useEffect(() => {
    const lettersOnly = /^[\p{L} ]+$/u;

    setInvalid({
      format: !lettersOnly.test(value) && value !== '',
      length: value.length > 50,
      empty: value === '',
    });
  }, [value]);

  useEffect(() => {
    if (isInvalid) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [value, invalid, isInvalid, setButtonDisabled]);

  return (
    <div className="flex flex-col gap-2">
      <label className="pl-1 text-gray-90 text-lg-200">{t('name')}</label>
      <div className="flex flex-col gap-2">
        <Input
          name="nickname"
          value={value}
          onChange={onChange}
          placeholder={t('enterName')}
          className={cn({
            'ring-2 ring-danger-30': invalid.format || invalid.length,
          })}
        />
        <ul className="flex h-4 flex-col gap-1">
          {invalid.format && (
            <li className="text-danger-50 text-sm-200">
              {t('noSpecialCharactersAndNumbers')}
            </li>
          )}
          {invalid.length && (
            <li className="text-danger-50 text-sm-200">
              {t('max50Characters')}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
