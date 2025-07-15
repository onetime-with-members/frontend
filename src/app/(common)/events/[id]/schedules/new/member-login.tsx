import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';

import PinPasswordInput from './pin-password';
import Button from '@/components/button';
import FloatingBottomButton from '@/components/button/floating-bottom-button';
import NicknameFormControl from '@/components/user/nickname-form-control';
import { checkNewGuestAction, loginGuestAction } from '@/lib/api/actions';
import { GuestValueType } from '@/lib/types';
import { GuestFormType } from '@/lib/validation/form-types';
import { guestSchema } from '@/lib/validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function MemberLoginSubScreen({
  setPageIndex,
  setGuestValue,
}: {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setGuestValue: React.Dispatch<React.SetStateAction<GuestValueType>>;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<GuestFormType>({
    resolver: zodResolver(guestSchema),
  });

  const t = useTranslations('scheduleAdd');
  const params = useParams<{ id: string }>();

  const { mutateAsync: checkNewGuest } = useMutation({
    mutationFn: checkNewGuestAction,
  });
  const { mutateAsync: loginGuest } = useMutation({
    mutationFn: loginGuestAction,
  });

  const onSubmit: SubmitHandler<GuestFormType> = async (value) => {
    const { is_possible: isNewGuestData } = await checkNewGuest({
      eventId: params.id,
      name: value.name,
    });
    setGuestValue((prev) => ({
      ...prev,
      name: value.name,
      pin: value.pin,
      isNewGuest: isNewGuestData,
    }));
    if (isNewGuestData) return setPageIndex(1);

    const { guestId, pinNotCorrect } = await loginGuest({
      eventId: params.id,
      name: value.name,
      pin: value.pin,
    });
    if (pinNotCorrect) {
      return alert('PIN 번호가 올바르지 않습니다.');
    } else if (!guestId) {
      return alert('로그인 도중 에러가 발생했습니다.');
    }
    setGuestValue((prev) => ({ ...prev, guestId: guestId }));
    setPageIndex(1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[60px]"
    >
      {/* Input Content */}
      <div className="flex flex-col gap-12">
        {/* Nickname */}
        <NicknameFormControl
          registerNickname={register('name')}
          errors={errors}
        />
        {/* Pin Password */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="pin" className="text-gray-80 text-lg-200">
              {t('password')}
            </label>
            <PinPasswordInput
              inputId="pin"
              pin={watch('pin')}
              setPin={(pin) => setValue('pin', pin)}
            />
          </div>
          <div
            className="rounded-xl bg-[#e8ebfc80] px-4 py-3 leading-loose text-primary-40 text-sm-100"
            style={{ lineHeight: '150%' }}
          >
            비밀번호를 설정하면, 같은 이름과 비밀번호를 입력했을 때 스케줄을
            수정할 수 있어요.
          </div>
        </div>
      </div>

      {/* Bottom Button for Desktop */}
      <div className="hidden sm:block">
        <Button type="submit" variant="dark" disabled={!isValid} fullWidth>
          {t('next')}
        </Button>
      </div>
      {/* Bottom Button for Mobile */}
      <div className="block sm:hidden">
        <FloatingBottomButton
          type="submit"
          variant="black"
          disabled={!isValid}
          fullWidth
        >
          {t('next')}
        </FloatingBottomButton>
      </div>
    </form>
  );
}
