'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import {
  hasModalSession,
  removeModalSession,
} from '@/features/my-schedule/lib/my-schedule-request-modal-session';
import { useProgressRouter } from '@/navigation';
import Image from 'next/image';

export default function MyScheduleRequestModal() {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations('auth.pages.OnboardingPage');

  const progressRouter = useProgressRouter();

  function handleConfirm() {
    removeModalSession();
    setIsOpen(false);
    progressRouter.push('/mypage/schedule/edit');
  }

  function handleClose() {
    removeModalSession();
    setIsOpen(false);
  }

  useEffect(() => {
    if (hasModalSession()) {
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
              알바, 학교 시간표를 <br />
              원타임에 등록해 보세요!
            </span>
            <span className="text-center text-gray-50 text-md-200">
              일정을 조율할 때 불러올 수 있어요
            </span>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-3 px-3 pb-[10px]">
            <button
              className="w-full rounded-xl bg-primary-40 p-3 text-gray-00 text-md-300"
              onClick={handleConfirm}
            >
              {t('register')}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="text-center text-gray-40 text-sm-200"
            >
              다음에 할래요
            </button>
          </div>
        </div>
      </div>
    )
  );
}
