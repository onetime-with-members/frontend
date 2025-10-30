import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import SmallButton from '@/components/button/small-button';
import {
  useEditMyScheduleMutation,
  useEditSleepTimeMutation,
} from '@/features/my-schedule/api/my-schedule.query';
import { MyScheduleContext } from '@/features/my-schedule/contexts/MyScheduleContext';
import { SleepTimeContext } from '@/features/my-schedule/contexts/SleepTimeContext';
import { IconChevronLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function TopAppBar({
  onBackButtonAlertOpen,
}: {
  onBackButtonAlertOpen: () => void;
}) {
  const { mySchedule, isMyScheduleEdited } = useContext(MyScheduleContext);
  const { sleepTime } = useContext(SleepTimeContext);

  const router = useRouter();
  const t = useTranslations('myScheduleEdit');

  const { editMySchedule, isPending: isMySchedulePending } =
    useEditMyScheduleMutation();
  const { editSleepTime, isPending: isSleepTimePending } =
    useEditSleepTimeMutation();

  const isPending = isMySchedulePending || isSleepTimePending;

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    await editMySchedule(mySchedule);
    await editSleepTime(sleepTime);
    router.back();
  }

  return (
    <nav className="h-[64px]">
      <div className="fixed z-10 flex h-[4rem] w-full justify-center bg-gray-00 px-4">
        <div className="mx-auto grid w-full max-w-screen-sm grid-cols-3">
          <div className="flex items-center justify-start">
            <button
              onClick={() => {
                if (isMyScheduleEdited) {
                  onBackButtonAlertOpen();
                } else {
                  router.back();
                }
              }}
            >
              <IconChevronLeft size={24} />
            </button>
          </div>
          <div className="flex items-center justify-center whitespace-nowrap text-gray-90 text-lg-300">
            {t('editMySchedule')}
          </div>
          <div className="flex items-center justify-end">
            <SmallButton disabled={isPending} onClick={() => handleSubmit()}>
              {isPending ? t('saving') : t('save')}
            </SmallButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
