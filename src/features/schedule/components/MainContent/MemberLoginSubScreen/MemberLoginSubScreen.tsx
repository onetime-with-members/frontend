import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';

import PinPasswordControl from './PinPasswordControl/PinPasswordControl';
import Button from '@/components/button';
import FloatingBottomButton from '@/components/button/FloatingBottomButton';
import NicknameFormControl from '@/components/user/NicknameFormControl';
import { GuestSchema } from '@/features/event/types';
import {
  useCheckNewGuestMutation,
  useLoginGuestMutation,
} from '@/features/schedule/api/schedule.query';
import { ScheduleFormContext } from '@/features/schedule/contexts/ScheduleFormContext';
import useGuestForm from '@/features/schedule/hooks/useGuestForm';
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

  const { mutateAsync: checkNewGuest } = useCheckNewGuestMutation();
  const { mutateAsync: loginGuest } = useLoginGuestMutation();

  const onSubmit: SubmitHandler<GuestSchema> = async (data) => {
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
