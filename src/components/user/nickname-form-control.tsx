import { useTranslations } from 'next-intl';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

import Input from '../input';
import cn from '@/lib/cn';
import { errorCodes } from '@/lib/utils';
import validationCodes from '@/lib/validation/codes';

export default function NicknameFormControl({
  registerNickname,
  errors,
}: {
  registerNickname: UseFormRegisterReturn;
  errors: FieldErrors;
}) {
  const t = useTranslations('nickname');

  const { MAX, REGEX } = validationCodes.nickname;

  return (
    <div className="flex flex-col gap-2">
      <label className="pl-1 text-gray-90 text-lg-200">{t('name')}</label>
      <div className="flex flex-col gap-2">
        <Input
          {...registerNickname}
          placeholder={t('enterName')}
          className={cn({
            'ring-2 ring-danger-30': ([MAX, REGEX] as string[]).includes(
              errors.nickname?.message as string,
            ),
          })}
        />
        <ul className="flex h-4 flex-col gap-1">
          {errorCodes(errors, 'nickname').includes(REGEX) && (
            <li className="text-danger-50 text-sm-200">
              {t('noSpecialCharactersAndNumbers')}
            </li>
          )}
          {errorCodes(errors, 'nickname').includes(MAX) && (
            <li className="text-danger-50 text-sm-200">
              {t('max50Characters')}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
