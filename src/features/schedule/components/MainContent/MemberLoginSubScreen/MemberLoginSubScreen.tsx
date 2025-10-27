import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { ScheduleFormContext } from '../../../contexts/ScheduleFormContext';
import useGuestForm from '../../../hooks/useGuestForm';
import PinPasswordControl from './PinPasswordControl/PinPasswordControl';
import Button from '@/components/button';
import FloatingBottomButton from '@/components/button/floating-bottom-button';
import NicknameFormControl from '@/components/user/nickname-form-control';
import { checkNewGuestAction, loginGuestAction } from '@/lib/api/actions';
import { GuestFormType } from '@/lib/validation/form-types';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function MemberLoginSubScreen() {
  const { setGuestValue, setPageIndex } = useContext(ScheduleFormContext);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    control,
  } = useGuestForm();

  const t = useTranslations('scheduleAdd');
  const params = useParams<{ id: string }>();

  const { mutateAsync: checkNewGuest } = useMutation({
    mutationFn: checkNewGuestAction,
  });
  const { mutateAsync: loginGuest } = useMutation({
    mutationFn: loginGuestAction,
  });

  const onSubmit: SubmitHandler<GuestFormType> = async (data) => {
    const { is_possible: isNewGuestData } = await checkNewGuest({
      eventId: params.id,
      name: data.nickname,
    });
    setGuestValue((prev) => ({
      ...prev,
      name: data.nickname,
      pin: data.pin,
      isNewGuest: isNewGuestData,
    }));
    if (isNewGuestData) return setPageIndex(1);

    const { guestId, pinNotCorrect } = await loginGuest({
      eventId: params.id,
      name: data.nickname,
      pin: data.pin,
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
      <div className="flex flex-col gap-12">
        <NicknameFormControl
          registerNickname={register('nickname')}
          errors={errors}
        />
        <PinPasswordControl control={control} />
      </div>
      <div className="hidden sm:block">
        <Button type="submit" variant="dark" disabled={!isValid} fullWidth>
          {t('next')}
        </Button>
      </div>
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
