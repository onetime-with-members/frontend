'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { MY_SCHEDULE_REQUEST_MODAL_SESSION } from '@/features/my-schedule/constants';
import { useProgressRouter } from '@/navigation';
import Image from 'next/image';

export default function MyScheduleRequestModal() {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations('mySchedule.components.MyScheduleRequestModal');

  const progressRouter = useProgressRouter();

  function handleConfirm() {
    sessionStorage.removeItem(MY_SCHEDULE_REQUEST_MODAL_SESSION);
    setIsOpen(false);
    progressRouter.push('/mypage/schedule/edit');
  }

  function handleClose() {
    sessionStorage.removeItem(MY_SCHEDULE_REQUEST_MODAL_SESSION);
    setIsOpen(false);
  }

  useEffect(() => {
    if (sessionStorage.getItem(MY_SCHEDULE_REQUEST_MODAL_SESSION)) {
      setIsOpen(true);
    }
  }, []);

  return (
    isOpen && (
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
        <div className="relative flex w-full max-w-[328px] flex-col overflow-hidden rounded-xl bg-gray-00">
          <Image
            src="/images/popup-modal.png"
            alt="Signup-Popup-Modal"
            width={328}
            height={328}
            className="h-full w-full object-cover"
          />
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-6">
            <span className="text-center text-gray-80 text-lg-300">
              {t.rich('title', { br: () => <br /> })}
            </span>
            <span className="text-center text-gray-50 text-md-200">
              {t('description')}
            </span>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-3 px-3 pb-[10px]">
            <button
              className="w-full rounded-xl bg-primary-40 p-3 text-gray-00 text-md-300"
              onClick={handleConfirm}
            >
              {t('buttons.register')}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="text-center text-gray-40 text-sm-200"
            >
              {t('buttons.later')}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
